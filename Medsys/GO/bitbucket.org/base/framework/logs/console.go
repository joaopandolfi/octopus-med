package logs

import (
	"context"
	"fmt"
	"log"
)

type consoleLog struct {
}

func (l *consoleLog) Info(message string, args ...interface{}) {
	log.Println("[info    ]", fmt.Sprintf(message, args...))
}
func (l *consoleLog) Debug(message string, args ...interface{}) {
	log.Println("[debug   ]", fmt.Sprintf(message, args...))
}
func (l *consoleLog) Warn(message string, args ...interface{}) {
	log.Println("[warn    ]", fmt.Sprintf(message, args...))
}
func (l *consoleLog) Error(message string, args ...interface{}) {
	log.Panicln("[error   ]", fmt.Sprintf(message, args...))
}
func (l *consoleLog) Critical(message string, args ...interface{}) {
	log.Println("[critical]", fmt.Sprintf(message, args...))
}
func (l *consoleLog) Fatal(err error) {
	log.Println("[fatal   ]", err)
	panic(err)
}
func (l *consoleLog) Flush() {

}
func (l *consoleLog) GetContext() context.Context {
	return context.Background()
}
