package models

import (
	"gopkg.in/mgo.v2/bson"
)

type User struct {
	Uid      string        `json:"id"`
	Id       bson.ObjectId `bson:"_id,omitempty"`
	Name     string        `json:"name"`
	Username string        `json:"username" validate:"required"`
	Password string        `json:"password" validate:"required"`
}

func ResultToUser(user User) User {
	user.Uid = user.Id.Hex()
	return user
}
