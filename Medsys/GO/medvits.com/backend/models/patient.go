package models

import "gopkg.in/mgo.v2/bson"

type Patient struct {
	Name       string `json:"name" validate:"required"`
	Uid        string
	Id         bson.ObjectId `bson:"_id,omitempty"`
	DtEntrance string        `json:"dtEntrance"`
	Rest       string        `json:"rest"` // Leito
	Hospital   string        `json:"hospital"`
	UTI        string        `json:"uti"`
	Sex        string        `json:"sex"`
	DtNasc     string        `json:"dtNasc"`
}

func MapToPatient(mPatient map[string]string) (patient Patient) {
	return
}
