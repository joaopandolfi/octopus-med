package dao

import (
	"bitbucket.org/base/framework/logs"
	"bitbucket.org/base/framework/repositories/mongo"
	"bitbucket.org/base/framework/repositories/mysql"
	"gopkg.in/mgo.v2/bson"
	"medvits.com/backend/models"
)

type UtiDAO interface {
	ListByHospital(hospitalId string) (utis []models.UTI)
	Save(uti models.UTI) error
	Update(uti models.UTI) error
	Del(uti models.UTI) error
}

type UTI struct {
	Logger logs.Log
}

func (cc UTI) SQL_ListByHospital(hospitalId string) (utis []models.UTI) {

	result := mysql.QueryToMap(cc.Logger, theCase, models.SQL.ListUtiByHospital, hospitalId)
	for _, mUti := range result {
		utis = append(utis, models.MapToUTI(mUti))
	}
	return
}

func (cc UTI) Save(uti models.UTI) error {
	session := mongo.GetSession()
	defer session.Close()

	return session.GetCollection("uti").Insert(&uti)
}

func (cc UTI) Update(uti models.UTI) error {
	session := mongo.GetSession()
	defer session.Close()

	return session.GetCollection("uti").Update(bson.M{"_id": bson.ObjectIdHex(uti.Uid)}, uti)
}

func (cc UTI) Del(uti models.UTI) error {
	session := mongo.GetSession()
	defer session.Close()

	return session.GetCollection("uti").Remove(bson.M{"_id": bson.ObjectIdHex(uti.Uid)})
}

func (cc UTI) ListByHospital(hospitalId string) []models.UTI {
	/*type UtiSearch struct {
		Utis []models.UTI `json:"uti"`
	}*/
	var results []models.UTI
	collection := mongo.GetSession().GetCollection("uti")

	collection.Find(bson.M{"hospital": hospitalId}).All(&results)

	return results
}
