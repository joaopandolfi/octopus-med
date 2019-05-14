package firebase

import (
	firebase "firebase.google.com/go"
	"firebase.google.com/go/db"
	"github.com/mitchellh/mapstructure"
	"golang.org/x/net/context"
	"google.golang.org/api/option"
	"bitbucket.org/base/framework
	"bitbucket.org/base/framework/logs"
)

// Init to initialize firebase context
func Init(logger logs.Log) (client *db.Client) {
	ctx := context.Background()

	conf := &firebase.Config{
		DatabaseURL: framework.Configuration.Firebase.URL,
	}
	/* TODO: Investigar se não precisa dessas credenciais */
	opt := option.WithCredentialsFile(framework.Configuration.Firebase.CredentialsFile)

	app, err := firebase.NewApp(ctx, conf, opt)
	if err != nil {
		logger.Error("Firebase: create app error: %+v, url: %s, credentials file: %s, context: %v", err, framework.Configuration.Firebase.URL, framework.Configuration.Firebase.CredentialsFile, ctx)
		panic(err)
	}

	client, err = app.Database(ctx)
	if err != nil {
		logger.Error("Firebase: database client error: %+v, url: %s, context: %+v", err, framework.Configuration.Firebase.URL, ctx)
		panic(err)
	}

	return
}

// Get object from firebase given a path
func Get(logger logs.Log, client *db.Client, path string, output interface{}) {
	ctx := context.Background()

	reference := client.NewRef(path)
	var data map[string]interface{}

	err := reference.Get(ctx, &data)

	if err != nil {
		logger.Error("Firebase: Getting data error: %+v, path: %s, context: %+v", err, path, ctx)
		panic(data)
	}

	err = mapstructure.Decode(data, &output)
	if err != nil {
		logger.Error("Firebase: Decoding data error: %+v, data: %+v, context: %+v", err, data, ctx)
		panic(data)
	}
}
