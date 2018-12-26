package mongo

import (
	"bitbucket.org/base/framework"
	"gopkg.in/mgo.v2"
)

type Session struct {
	session *mgo.Session
}

func NewSession() (*Session, error) {
	session, err := mgo.Dial(framework.Configuration.Mongo.MongoUrl)
	if err != nil {
		return nil, err
	}
	return &Session{session}, err
}

func (s *Session) Copy() *Session {
	return &Session{s.session.Copy()}
}

func (s *Session) GetCollection(col string) *mgo.Collection {
	return s.session.DB(framework.Configuration.Mongo.DbName).C(col)
}

func (s *Session) Close() {
	if s.session != nil {
		s.session.Close()
	}
}
