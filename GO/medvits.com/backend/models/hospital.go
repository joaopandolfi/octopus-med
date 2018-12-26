package models

import "gopkg.in/mgo.v2/bson"

type Hospital struct {
	Uid        string        `json:"id"`
	Id         bson.ObjectId `bson:"_id,omitempty"`
	Name       string        `json:"name" validate:"required"`
	Modules    []string      `json:"modules" validate:"required"`
	Tel        string        `json:"tel"`
	Country    string        `json:"country"`
	City       string        `json:"city"`
	District   string        `json:"district"`
	Logradouro string        `json:"logradouro"`
	Number     string        `json:"number"`
	CEP        string        `json:"cep"`
	CNPJ       string        `json:"cnpj"`
	Others     string        `json:"others"`
}

func MapToHospital(hHospital map[string]string) (hospital Hospital) {
	return
}
