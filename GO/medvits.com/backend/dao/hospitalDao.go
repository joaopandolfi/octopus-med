package dao

import (
	"bitbucket.org/base/framework/logs"
	"bitbucket.org/base/framework/repositories/mongo"
	"bitbucket.org/base/framework/repositories/mysql"
	"gopkg.in/mgo.v2/bson"
	"medvits.com/backend/models"
)

type HospitalDAO interface {
	Save(hospital models.Hospital) (err error)
	Del(hospital models.Hospital) (err error)
	List() (hospitals []models.Hospital)
	Update(hospital models.Hospital) (err error)
}

type Hospital struct {
	Logger logs.Log
}

//const theCase = "lower"

func (cc Hospital) SQL_Save(hospital models.Hospital) (id int, err error) {
	insertId, err := mysql.ExecuteAndReturnLastId(cc.Logger, models.SQL.SaveHospital, hospital.Name)
	cc.Logger.Debug("RESPONSE [%#v]", insertId)
	id = int(insertId)
	return
}

func (cc Hospital) SQL_Del(hospital models.Hospital) (err error) {
	mysql.QueryToMap(cc.Logger, theCase, models.SQL.DelHospital, hospital.Id)
	return
}

func (cc Hospital) SQL_List() (hospitals []models.Hospital) {
	result := mysql.QueryToMap(cc.Logger, theCase, models.SQL.ListHospitals)

	for _, mHospital := range result {
		hospitals = append(hospitals, models.MapToHospital(mHospital))
	}
	return
}

func (cc Hospital) Save(hosp models.Hospital) error {
	session := mongo.GetSession()
	defer session.Close()

	return session.GetCollection("hospital").Insert(&hosp)
}

func (cc Hospital) List() (hospitals []models.Hospital) {
	collection := mongo.GetSession().GetCollection("hospital")
	collection.Find(nil).All(&hospitals)
	return
}

func (cc Hospital) Del(hosp models.Hospital) (err error) {
	session := mongo.GetSession()
	defer session.Close()

	return session.GetCollection("hospital").Remove(bson.M{"_id": bson.ObjectIdHex(hosp.Uid)})
}

func (cc Hospital) Update(hosp models.Hospital) (err error) {
	session := mongo.GetSession()
	defer session.Close()

	return session.GetCollection("hospital").Update(bson.M{"_id": bson.ObjectIdHex(hosp.Uid)}, hosp)
}
