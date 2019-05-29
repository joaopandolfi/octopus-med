package models

import "gopkg.in/mgo.v2/bson"

type Rest struct {
	Uid      string        `json:"id"`
	Id       bson.ObjectId `bson:"_id,omitempty"`
	Hospital string        `json:"hospital" validate:"required"`
	UTI      string        `json:"uti" validate:"required"`
	Name     string        `json:"name" validate:"required"`
	UserID   string        `json:"userId"`
	Status   string        `json:"status"`
	Patient  string        `json:"patient"`
	Files	 string		   `json:"files"`
	Messages string		   `json:"messages"`
	Tasks	 int		   `json:"tasks"`
	Dones	 int 		   `json:"dones"`
	//Patient  map[string]string `json:"patient"`
	//Intervent []Interventions   `json:"interventions"`
	//Intervents []map[string]string `json:"interventions"` //Generico
	Number string `json:"number"`
}

/*
{
	"name": "LEITO 1",
	"userId": "0",
	"status": "occuped",
	"patient": "0",
	"number": "1"
}
*/
