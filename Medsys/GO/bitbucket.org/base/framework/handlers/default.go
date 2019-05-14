package handlers

import (
	"encoding/json"
	"fmt"
	"net/http"
	"reflect"

	"bitbucket.org/base/framework"
	"github.com/gorilla/mux"

	"bitbucket.org/base/framework/logs"

	validator "gopkg.in/go-playground/validator.v9"
)

// CustomHandler is the default handler
type CustomHandler func(r Request, logger logs.Log) (Response, error)

func (fn CustomHandler) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	var logger logs.Log
	logger = logs.New(nil, framework.Configuration.Debug)

	var response Response
	var err error

	defer func() {
		recovered := recover()
		if recovered != nil {
			logger.Critical("Recovered: %#v", recovered)

			if reflect.TypeOf(recovered) == reflect.TypeOf(validator.ValidationErrors{}) {
				response.BadRequest(Error{
					Message: fmt.Sprint(recovered),
				})

			} else {
				response.InternalServerError(Error{
					Message: fmt.Sprint(recovered),
				})
			}
		}
		encoding(logger, w, r, response, err)

		logger.Flush()
	}()

	dr := decoding(w, r)
	if dr != nil {
		response, err = fn(dr, logger)
	} else {
		response, err = authError()
	}
}

// base response in login error
func authError() (response Response, err error) {
	response.LoginError()
	return
}

func decoding(w http.ResponseWriter, r *http.Request) (dr *defaultRequest) {

	var vars = mux.Vars(r)
	var queries = r.URL.Query()
	var sess, _ = framework.Configuration.Session.Store.Get(r, "User")
	dr = &defaultRequest{&w, r, sess, &vars, &r.Body, &queries}

	//Check Login
	if r.URL.String() != "/login" {
		l := sess.Values["logged"]
		if logged, ok := l.(bool); !ok || !logged {
			dr = nil
		}
	}

	return
}

func encoding(logger logs.Log, w http.ResponseWriter, r *http.Request, response Response, err error) {

	var responseLogger = logs.New(r, framework.Configuration.Debug)

	w.Header().Add("Access-Control-Allow-Origin", framework.Configuration.Args.Cors)
	w.Header().Add("Access-Control-Allow-Credentials", "true")
	w.Header().Add("Content-Type", "application/json")

	if err != nil {
		response.InternalServerError(Error{
			Message: err.Error(),
		})
	}

	w.WriteHeader(response.code)

	if response.body != nil {
		encoder := json.NewEncoder(w)
		err = encoder.Encode(response.body)
		responseLogger.Debug("Body: %#v", response.body)
	} else {
		responseLogger.Debug("Body: empty")
	}

	// If an error happen at this moment, so probably there's nothing to do
	if err != nil {
		logger.Fatal(err)
	}
}

func errroPrint(response Response, recovered interface{}) {
	var fieldErrors []validator.FieldError = recovered.(validator.ValidationErrors)

	var errors = make([]Error, len(fieldErrors))

	for index := 0; index < len(errors); index++ {
		var param = fieldErrors[index].Param()
		if param != "" {
			param = " (" + fieldErrors[index].Param() + ")"
		}

		errors[index] = Error{
			Message: fieldErrors[index].Field() + ": " + fieldErrors[index].ActualTag() + param,
		}
	}

	response.BadRequest(errors)
}
