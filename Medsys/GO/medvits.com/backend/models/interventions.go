package models

import "gopkg.in/mgo.v2/bson"

type Interventions struct {
	Id             bson.ObjectId            `bson:"_id,omitempty"`
	Uid            string                   `json:"udi"`
	RestId         string                   `json:"restId" validate:"required"`
	UtiId          string                   `json:"utiId" validate:"required"`
	PatientId      string                   `json:"patientId" validate:"required"`
	HospitalId     string                   `json:"hospitalId" validate:"required"`
	Name           string                   `json:"name" validate:"required"`
	CreateDateTime string                   `json:"CreateDateTime"`
	DoneDateTime   string                   `json:"DoneDateTime"`
	Done           string                   `json:"done"`
	Type           string                   `json:"type"`
	NameUserDone   string                   `json:"nameUserDone"`
	Current        string                   `json:"current"`
	Total          string                   `json:"total"`
	Archived       string                   `json:"archived"`
	Particularity  []map[string]interface{} `json:"particularity"`
}

type ShortIntervention struct {
	Uid          string `json:"udi"`
	NameUserDone string `json:"nameUserDone" validate:"required"`
	DoneDateTime string `json:"DoneDateTime" validate:"required"`
}

func MapToInterventions(mIntervention map[string]string) (interventions Interventions) {
	return
}

/*
{
	"restId": "5ba457dc4cf8a6be65219ac1",
	"utiId": "5ba455f24cf8a6be65218bd4",
	"patientdId": "0",
	"name": "Intervenção TESTE",
	"datetime": "19/09/2018",
	"done": "false",
	"current": "1",
	"total": "10",
	"archived": "false",
	particularity: [{object}] // Array de objetos (genéricos)
}
*/
