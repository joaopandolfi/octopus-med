package business

import (
	"bitbucket.org/base/framework/logs"
	"medvits.com/backend/dao"
	"medvits.com/backend/models"
)

type UserBusiness interface {
	Login(username string, password string) (bool, error)
	Test() error
}

type User struct {
	Logger logs.Log
	//MessageDAO dao.MessageDAO
	//PushDAO    dao.PushDAO
	UserDao dao.UserDAO
}

func (cc User) Login(username string, password string) (bool, error) {
	user := models.User{
		Username: username,
		Password: password,
	}
	return cc.UserDao.Login(user)
}

func (cc User) Test() error {
	var user models.User

	user = models.User{
		Username: "adm@medsys.online",
		Password: "Aqu1N4oTemChule",
	}

	_, err := cc.UserDao.Save(user)
	return err
}
