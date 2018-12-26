package dao

import (
	"bitbucket.org/base/framework/logs"
	"bitbucket.org/base/framework/repositories/mongo"
	"gopkg.in/mgo.v2/bson"
	"medvits.com/backend/models"
)

type RestDAO interface {
	ListByHospital(hospitalId string) (utis []models.Rest)
	ListByHospitalAndUti(hospitalId string, utiId string) []models.Rest
	Save(uti models.Rest) error
	Update(uti models.Rest) error
	Del(uti models.Rest) error
}

type REST struct {
	Logger logs.Log
}

func (cc REST) Save(rest models.Rest) error {
	session := mongo.GetSession()
	defer session.Close()

	return session.GetCollection("rest").Insert(&rest)
}

func (cc REST) Update(rest models.Rest) error {
	session := mongo.GetSession()
	defer session.Close()

	return session.GetCollection("rest").Update(bson.M{"_id": bson.ObjectIdHex(rest.Uid)}, rest)
}

func (cc REST) Del(rest models.Rest) error {
	session := mongo.GetSession()
	defer session.Close()

	return session.GetCollection("rest").Remove(bson.M{"_id": bson.ObjectIdHex(rest.Uid)})
}

func (cc REST) ListByHospital(hospitalId string) []models.Rest {
	var results []models.Rest
	collection := mongo.GetSession().GetCollection("rest")

	collection.Find(bson.M{"hospital": hospitalId}).All(&results)

	return results
}

func (cc REST) ListByHospitalAndUti(hospitalId string, utiId string) []models.Rest {
	var results []models.Rest
	collection := mongo.GetSession().GetCollection("rest")

	collection.Find(bson.M{"hospital": hospitalId, "uti": utiId}).All(&results)

	return results
}
