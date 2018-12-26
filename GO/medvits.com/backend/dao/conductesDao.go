package dao

import (
	"bitbucket.org/base/framework/logs"
	"bitbucket.org/base/framework/repositories/mongo"
	"gopkg.in/mgo.v2/bson"
	"medvits.com/backend/models"
)

type ConductesDAO interface {
	Save(conductes models.Conductes) (err error)
	Del(conductes models.Conductes) (err error)
	ListByType(sType string) (conductes []models.Conductes)
	Update(conductes models.Conductes) (err error)
}

type Conductes struct {
	Logger logs.Log
}

func (cc Conductes) Save(conductes models.Conductes) error {
	session := mongo.GetSession()
	defer session.Close()

	return session.GetCollection("conductes").Insert(&conductes)
}

func (cc Conductes) ListByType(sType string) (conductes []models.Conductes) {
	collection := mongo.GetSession().GetCollection("conductes")
	collection.Find(bson.M{"type": sType}).All(&conductes)
	return
}

func (cc Conductes) Del(conductes models.Conductes) (err error) {
	session := mongo.GetSession()
	defer session.Close()

	return session.GetCollection("conductes").Remove(bson.M{"_id": bson.ObjectIdHex(conductes.Uid)})
}

func (cc Conductes) Update(conductes models.Conductes) (err error) {
	session := mongo.GetSession()
	defer session.Close()

	return session.GetCollection("conductes").Update(bson.M{"_id": bson.ObjectIdHex(conductes.Uid)}, conductes)
}
