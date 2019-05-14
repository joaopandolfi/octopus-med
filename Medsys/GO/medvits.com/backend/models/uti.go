package models

import "gopkg.in/mgo.v2/bson"

type UTI struct {
	Uid      string              `json:"id"`
	Id       bson.ObjectId       `bson:"_id,omitempty"`
	Hospital string              `json:"hospital" validate:"required"`
	Name     string              `json:"name" validate:"required"`
	Leitos   []map[string]string `json:"leitos"`
}

func MapToUTI(mUti map[string]string) (uti UTI) {
	return
}

/*
{
	"name": "UTI TESTE POST",
	"leitos": [
		{
			"name": "Leito1",
			"id": "ID FAKE"
		}
		]
}
*/
