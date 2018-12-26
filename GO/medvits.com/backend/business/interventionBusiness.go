package business

import (
	"time"

	"bitbucket.org/base/framework/logs"
	"gopkg.in/mgo.v2/bson"
	"medvits.com/backend/dao"
	"medvits.com/backend/models"
)

type InterventionBusiness interface {
	ListByRestId(restId string) []models.Interventions
	New(interv models.Interventions) error
	Update(interv models.Interventions) error
	SetDone(interv models.ShortIntervention) error
	SetArchived(uid string) error
}

type Intervention struct {
	Logger          logs.Log
	InterventionDAO dao.InterventionsDAO
}

// List Interventions By Rest Id
func (cc Intervention) ListByRestId(restId string) []models.Interventions {
	return cc.InterventionDAO.GetbyRestId(restId)
}

func (cc Intervention) New(interv models.Interventions) error {
	t := time.Now()
	interv.CreateDateTime = t.Format("20060102150405") //t.Format("15:04:05 - 02/01/2006")
	return cc.InterventionDAO.Save(interv)
}

func (cc Intervention) Update(interv models.Interventions) error {
	return cc.InterventionDAO.Update(interv)
}

// Seta como finalizado
func (cc Intervention) SetDone(interv models.ShortIntervention) error {
	t := time.Now()
	interv.DoneDateTime = t.Format("20060102150405")
	bsonData := bson.M{"done": "true", "nameUserDone": interv.NameUserDone}
	return cc.InterventionDAO.PartialUpdate(interv.Uid, bsonData)
}

// Arquiva
func (cc Intervention) SetArchived(uid string) error {
	bsonData := bson.M{"archived": "true"}
	return cc.InterventionDAO.PartialUpdate(uid, bsonData)
}
