package models

import "gopkg.in/mgo.v2/bson"

type Conductes struct {
	Id   bson.ObjectId `bson:"_id,omitempty"`
	Uid  string
	Name string `json:"name"`
	Code string `json:"code"`
	Type string `json:"type"`
}
