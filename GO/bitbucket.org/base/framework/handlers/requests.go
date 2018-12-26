package handlers

import (
	"encoding/json"
	"io"
	"net/http"
	"net/url"

	"github.com/gorilla/sessions"
	validator "gopkg.in/go-playground/validator.v9"
)

// Request interface to intercept http request
type Request interface {
	// Content to get json content
	// Input Interface is the output typed Object
	Content(interface{})
	Parameters(string) string
	Query(id string) string
	Queries() *url.Values
	Session() *sessions.Session
	SaveSession()
}

type defaultRequest struct {
	w       *http.ResponseWriter
	r       *http.Request
	session *sessions.Session
	vars    *map[string]string
	body    *io.ReadCloser
	query   *url.Values
}

func (d *defaultRequest) Content(output interface{}) {
	json.NewDecoder(*d.body).Decode(output)

	err := validator.New().Struct(output)

	if err != nil {
		panic(err)
	}
}

func (d *defaultRequest) Parameters(id string) string {
	var returns = *d.vars

	return returns[id]
}

func (d *defaultRequest) Query(id string) string {
	return d.query.Get(id)

}

func (d *defaultRequest) Queries() *url.Values {
	return d.query
}

func (d *defaultRequest) Session() *sessions.Session {
	return d.session
}

func (d defaultRequest) SaveSession() {
	d.session.Save(d.r, *d.w)
}
