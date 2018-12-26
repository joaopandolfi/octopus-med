package mongo

import (
	"gopkg.in/mgo.v2"
)

type Collection struct {
	collection *mgo.Collection
}

func NewService(session *Session, collectionName string, index mgo.Index) *Collection {
	collection := session.GetCollection(collectionName)
	collection.EnsureIndex(index)
	return &Collection{collection}
}
