package dao

import (
	"bitbucket.org/base/framework/logs"
	"bitbucket.org/base/framework/repositories/mongo"
	"bitbucket.org/base/framework/repositories/mysql"
	"gopkg.in/mgo.v2/bson"
	"medvits.com/backend/models"
)

type InterventionsDAO interface {
	Save(interventions models.Interventions) (err error)
	Update(interventions models.Interventions) (err error)
	GetbyRestId(id string) (interventions []models.Interventions)
	GetById(id string) (intervention models.Interventions)
	PartialUpdate(uid string, structure bson.M) error
}

type Interventions struct {
	Logger logs.Log
}

func (cc Interventions) SQL_Save(interventions models.Interventions) (id int, err error) {
	insertedID, err := mysql.ExecuteAndReturnLastId(cc.Logger, models.SQL.SaveInterventions, interventions.RestId)
	cc.Logger.Debug("RESPONSE [%#v]", insertedID)
	id = int(insertedID)
	return
}

func (cc Interventions) SQL_Update(interventions models.Interventions) (err error) {
	mysql.QueryToMap(cc.Logger, theCase, models.SQL.UpdateInterventions, interventions.RestId)
	return
}

func (cc Interventions) Save(intervention models.Interventions) (err error) {
	session := mongo.GetSession()
	defer session.Close()

	return session.GetCollection("intervention").Insert(&intervention)
}

func (cc Interventions) Update(intervention models.Interventions) (err error) {
	session := mongo.GetSession()
	defer session.Close()

	//return session.GetCollection("rest").Update(map[string]string{"_id": intervention.RestId}, map[string]interface{}{"$push": map[string]interface{}{"interventions": intervention}})
	return session.GetCollection("intervention").Update(bson.M{"_id": bson.ObjectIdHex(intervention.Uid)}, intervention)
}

func (cc Interventions) PartialUpdate(uid string, structure bson.M) error {
	session := mongo.GetSession()
	defer session.Close()

	return session.GetCollection("intervention").Update(bson.M{"_id": bson.ObjectIdHex(uid)}, bson.M{"$set": structure})
}

func (cc Interventions) GetbyRestId(id string) (interventions []models.Interventions) {
	collection := mongo.GetSession().GetCollection("intervention")
	cc.Logger.Debug(id)
	collection.Find(bson.M{"restid": id, "archived": "false"}).All(&interventions)
	//collection.Find(nil).All(&interventions)

	return
}

func (cc Interventions) GetById(id string) (intervention models.Interventions) {
	collection := mongo.GetSession().GetCollection("intervention")
	collection.Find(bson.M{"_id": bson.ObjectIdHex(id)}).One(&intervention)

	return
}
