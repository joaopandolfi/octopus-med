package framework

import (
	"fmt"
	"os"

	"bitbucket.org/base/framework/logs"
	"github.com/gorilla/sessions"
)

// FirebaseConfiguration configurations for Firebase
type FirebaseConfiguration struct {
	URL             string
	CredentialsFile string
}

// MySQLConfiguration configurations for MySQL
type MySQLConfiguration struct {
	DatabaseSourceName string
}

type MongoConfiguration struct {
	MongoUrl string
	DbName   string
}

type SessionConfiguration struct {
	Name  string
	Store *sessions.CookieStore
}

type ArgsConfiguration struct {
	Cors string
	Port string
}

// Configurations will load all environment variables
type Configurations struct {
	Firebase FirebaseConfiguration
	MySQL    MySQLConfiguration
	Mongo    MongoConfiguration
	Session  SessionConfiguration
	Args     ArgsConfiguration
	Debug    bool
}

// Configuration used for setup framework
// Use load to load and reload the configuration
var Configuration Configurations

// Load func used for load all framework environment variables
func Load() {
	Configuration = Configurations{
		Firebase: FirebaseConfiguration{
			//URL:             os.Getenv("FIREBASE_URL"),
			//CredentialsFile: os.Getenv("FIREBASE_CREDENTIALS_FILE"),
		},
		MySQL: MySQLConfiguration{
			//DatabaseSourceName: os.Getenv("SQL_DATABASE_SOURCE_NAME"),
		},
		Mongo: MongoConfiguration{
			MongoUrl: "mongodb://teste:teste123@ds263642.mlab.com:63642/medvits-test1",
			//MongoUrl: "mongodb://127.0.0.1:27017", //"mongodb://teste:teste123@ds263642.mlab.com:63642/medvits-test1",
			DbName:   "medvits-test1",
		},
		Session: SessionConfiguration{
			Name:  "Abbx87721",
			Store: sessions.NewCookieStore([]byte("Abbx87721")),
		},
		Args: ArgsConfiguration{
			Cors: "http://31.220.54.251:3024",
			Port: "9091",
		},
		Debug: true,
	}

	var logger = logs.New(nil, Configuration.Debug)

	//Getting params
	if len(os.Args) > 1 {
		Configuration.Args.Port = os.Args[1]
		Configuration.Args.Cors = os.Args[2]
	}

	//for _, e := range os.Environ() {
	//	logger.Info("Environment variable: %s", e)
	//}

	//logger.Info("Configuration.Firebase.URL: " + Configuration.Firebase.URL)
	//logger.Info("Configuration.Firebase.CredentialsFile: " + Configuration.Firebase.CredentialsFile)
	//logger.Info("Configuration.MySQL.DatabaseSourceName: " + Configuration.MySQL.DatabaseSourceName)
	logger.Info("Configuration.Mongo.DbName: " + Configuration.Mongo.DbName)
	logger.Info("Configuration.Session: OK")
	logger.Info("Configuration.Debug: " + fmt.Sprint(Configuration.Debug))
	logger.Info("Configuration.Port: " + fmt.Sprint(Configuration.Args.Port))
	logger.Info("Configuration.Cors: " + fmt.Sprint(Configuration.Args.Cors))
}
