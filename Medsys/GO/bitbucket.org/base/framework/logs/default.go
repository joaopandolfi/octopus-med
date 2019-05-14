package logs

import (
	"context"
	"net/http"
)

// Log interface is the contract between log types
type Log interface {
	Info(message string, args ...interface{})
	Debug(message string, args ...interface{})
	Warn(message string, args ...interface{})
	Error(message string, args ...interface{})
	Critical(message string, args ...interface{})
	Fatal(err error)
	Flush()
	GetContext() context.Context
}

// New method is a construct-like
func New(r *http.Request, debug bool) (logger Log) {

	if debug {
		logger = &consoleLog{}
	} else {
		logger = (&googlecloudLog{}).New(r)
	}

	return
}
