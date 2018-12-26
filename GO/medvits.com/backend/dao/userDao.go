package dao

import (
	"fmt"
	"log"

	"bitbucket.org/base/framework/logs"
	"bitbucket.org/base/framework/repositories/mongo"
	"bitbucket.org/base/framework/repositories/mysql"
	"gopkg.in/mgo.v2"
	"gopkg.in/mgo.v2/bson"
	"medvits.com/backend/models"
)

type userModel struct {
	Id       bson.ObjectId `bson:"_id,omitempty"`
	Username string
	Password string
}

type UserDAO interface {
	Save(user models.User) (userId int, err error)
	Login(user models.User) (logged bool, err error)
}

type User struct {
	Logger logs.Log
}

func userModelIndex() mgo.Index {
	return mgo.Index{
		Key:        []string{"username"},
		Unique:     true,
		DropDups:   true,
		Background: true,
		Sparse:     true,
	}
}

func (cc User) SQL_Save(user models.User) (userId int, err error) {
	insertId, err := mysql.ExecuteAndReturnLastId(cc.Logger, models.SQL.SavePatient, user.Name)
	cc.Logger.Debug("RESPONSE [%#v]", insertId)
	r := int(insertId)
	userId = r
	return
}

func (cc User) Save(user models.User) (userId int, err error) {
	//Arrange
	session, err := mongo.NewSession()
	hash := models.Hash{}
	if err != nil {
		log.Fatalf("Unable to connect to mongo: %s", err)
	}
	defer session.Close()
	user.Password, err = hash.Generate(user.Password)
	session.GetCollection("user").Insert(&user)
	return
}

func (cc User) Login(user models.User) (logged bool, err error) {
	var results []models.User
	hash := models.Hash{}
	session, err := mongo.NewSession()
	defer session.Close()
	session.GetCollection("user").Find(bson.M{"username": user.Username}).All(&results)

	fmt.Println(results)
	logged = false
	count := len(results)
	if count != 0 {
		r := hash.Compare(results[0].Password, user.Password)
		logged = (r == nil)
	}

	return
}
