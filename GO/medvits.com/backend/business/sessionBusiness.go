package business

import "github.com/gorilla/sessions"

type SessionBusiness interface {
	Login(log bool)
	Logout()
	CheckIsLogged() bool
}

type Session struct {
	Session *sessions.Session
}

func (cc Session) Login(log bool) {
	cc.Session.Values["logged"] = log
}

func (cc Session) Logout() {
	cc.Session.Values["logged"] = false
}

func (cc Session) CheckIsLogged() bool {
	l := cc.Session.Values["logged"]
	if logged, ok := l.(bool); ok && logged {
		return true
	}
	return false
}
