package mongo

import (
	"gopkg.in/mgo.v2"
	"gopkg.in/mgo.v2/bson"
)

type exampleModel struct {
	Id       bson.ObjectId `bson:"_id,omitempty"`
	Username string
	Password string
}

func exampleModelIndex() mgo.Index {
	return mgo.Index{
		Key:        []string{"username"},
		Unique:     true,
		DropDups:   true,
		Background: true,
		Sparse:     true,
	}
}

/*
func createUser_should_insert_user_into_mongo(t *testing.T) {
	//Arrange
	session, err := mongo.NewSession(mongoUrl)
	if err != nil {
		log.Fatalf("Unable to connect to mongo: %s", err)
	}
	defer session.Close()
	userService := mongo.NewUserService(session.Copy(), dbName, userCollectionName)

	testUsername := "integration_test_user"
	testPassword := "integration_test_password"
	user := root.User{
		Username: testUsername,
		Password: testPassword}

	//Act
	err = userService.Create(&user)

	//Assert
	if err != nil {
		t.Error("Unable to create user: %s", err)
	}
	var results []map[string]string //[]root.User
	var dbName string
	var userCollectionName string
	session.GetCollection(dbName, userCollectionName).Find(nil).All(&results)

	count := len(results)
	if count != 1 {
		t.Error("Incorrect number of results. Expected `1`, got: `%i`", count)
	}
	if results[0].Username != user.Username {
		t.Error("Incorrect Username. Expected `%s`, Got: `%s`", testUsername, results[0].Username)
	}
}

func Test_UserService(t *testing.T) {
	t.Run("CreateUser", createUser_should_insert_user_into_mongo)
}

func newUserModel(u *root.User) *userModel {
	return &userModel{
		Username: u.Username,
		Password: u.Password}
}

func (u *userModel) toRootUser() *root.User {
	return &root.User{
		Id:       u.Id.Hex(),
		Username: u.Username,
		Password: u.Password}
}
*/
