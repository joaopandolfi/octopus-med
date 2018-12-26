package mongo

import (
	"log"
)

func GetSession() *Session {
	session, err := NewSession()
	if err != nil {
		log.Fatalf("Unable to connect to mongo: %s", err)
	}

	return session
}
