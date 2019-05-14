package dao

import (
	"bitbucket.org/base/framework/logs"
	"bitbucket.org/base/framework/repositories/mongo"
	"bitbucket.org/base/framework/repositories/mysql"
	"gopkg.in/mgo.v2/bson"
	"medvits.com/backend/models"
)

type PatientDAO interface {
	Save(patient models.Patient) (patientId int, err error)
	Del(patient models.Patient) (err error)
	ListByHospital(hospitalId string) (patients []models.Patient)
	GetPatientByRest(restId string) (patient models.Patient)
	GetPatientById(patientId string) (patient models.Patient)
}

type Patient struct {
	Logger logs.Log
}

const theCase = "lower"

func (cc Patient) SQL_Save(patient models.Patient) (patientId int, err error) {
	insertId, err := mysql.ExecuteAndReturnLastId(cc.Logger, models.SQL.SavePatient, patient.Name)
	cc.Logger.Debug("RESPONSE [%#v]", insertId)
	r := int(insertId)
	patientId = r
	return
}

func (cc Patient) SQL_Del(patient models.Patient) (err error) {
	mysql.QueryToMap(cc.Logger, theCase, models.SQL.DelPatient, patient.Id)
	return
}

func (cc Patient) SQL_ListByHospital(hospitalId string) (patients []models.Patient) {
	result := mysql.QueryToMap(cc.Logger, theCase, models.SQL.ListPatientByHospital, hospitalId)

	for _, mPatient := range result {
		patients = append(patients, models.MapToPatient(mPatient))
	}
	return
}

func (cc Patient) SQL_GetPatientByRest(restId string) (patient models.Patient) {
	result := mysql.QueryToMap(cc.Logger, theCase, models.SQL.GetPatientByRest, restId)

	if len(result) > 0 {
		patient = models.MapToPatient(result[0])
	}
	return
}

// ==== MONGO

func (cc Patient) Save(patient models.Patient) (patientId int, err error) {
	session := mongo.GetSession()
	defer session.Close()

	return 0, session.GetCollection("patient").Insert(&patient)
}

func (cc Patient) ListByHospital(hospitalId string) (patients []models.Patient) {
	collection := mongo.GetSession().GetCollection("patient")
	collection.Find(bson.M{"hospital": hospitalId}).All(&patients)

	return
}

func (cc Patient) GetPatientByRest(restID string) (patient models.Patient) {
	collection := mongo.GetSession().GetCollection("patient")
	collection.Find(bson.M{"rest": restID}).One(&patient)
	return
}

func (cc Patient) GetPatientById(patientId string) (patient models.Patient) {
	collection := mongo.GetSession().GetCollection("patient")
	collection.Find(bson.M{"_id": bson.ObjectIdHex(patientId)}).One(&patient)
	return
}

func (cc Patient) Del(patient models.Patient) (err error) {
	collection := mongo.GetSession().GetCollection("patient")
	return collection.Remove(bson.M{"_id": bson.ObjectIdHex(patient.Uid)})
}
