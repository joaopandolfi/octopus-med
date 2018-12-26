package controllers

import (
	"bitbucket.org/base/framework/handlers"
	"bitbucket.org/base/framework/logs"
	"github.com/gorilla/sessions"
	"medvits.com/backend/business"
	"medvits.com/backend/dao"
	"medvits.com/backend/models"
)

type UserController struct{}

func (cc UserController) Login(request handlers.Request, logger logs.Log) (response handlers.Response, err error) {
	var user models.User

	//request.Content(&msg)

	UserBusiness := newUserBusiness(logger)
	bSession := newSessionBusiness(request.Session())

	request.Content(&user)
	result, err := UserBusiness.Login(user.Username, user.Password)

	bSession.Login(result)
	request.SaveSession()

	response.Success(result)

	return
}

func (cc UserController) Test(request handlers.Request, logger logs.Log) (response handlers.Response, err error) {

	//request.Content(&msg)

	//UserBusiness := newUserBusiness(logger)

	//UserBusiness.Test()

	response.BadRequest("404")
	return
}

// --- LOCAL

func newUserBusiness(logger logs.Log) (userBusiness business.UserBusiness) {
	userBusiness = business.User{
		Logger: logger,
		UserDao: dao.User{
			Logger: logger,
		},
	}
	return
}

func newSessionBusiness(s *sessions.Session) (sb business.SessionBusiness) {
	sb = business.Session{
		Session: s,
	}
	return
}
