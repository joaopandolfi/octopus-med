package mysql

import (
	"database/sql"
	"encoding/json"
	"strings"

	"bitbucket.org/base/framework"
	"bitbucket.org/base/framework/logs"
	"github.com/elgs/gosqljson"
	_ "github.com/go-sql-driver/mysql"
)

var database *sql.DB

// Init function used to initialize mysql database
func Init() {
	var logger = logs.New(nil, framework.Configuration.Debug)

	var err error
	database, err = sql.Open("mysql", framework.Configuration.MySQL.DatabaseSourceName)

	if err != nil {
		logger.Error("MySQL: sql.DB: Open: %+v query: %s", err, framework.Configuration.MySQL.DatabaseSourceName)
		panic(err)
	}
}

// Execute method is used for execute a SQL
func Execute(logger logs.Log, theCase string, output interface{}, sqlStatement string, sqlParams ...interface{}) {
	var newSQL = strings.Replace(sqlStatement, "?", "%v", -1)

	data, err := gosqljson.QueryDbToMapJSON(database, theCase, sqlStatement, sqlParams...)

	logger.Debug("MySQL: Parameters: %#v", sqlParams...)
	logger.Debug("MySQL: SQL Query: "+newSQL, sqlParams...)

	if err != nil {
		logger.Error("MySQL: gosqljson: QueryDbToArray: %#v query: %s", err, sqlStatement)
		panic(err)
	}

	json.Unmarshal([]byte(data), &output)

	if err == nil {
		logger.Debug("MySQL: Response: %#s", output)
	}
}

func ExecuteAndReturnLastId(logger logs.Log, sqlStatement string, sqlParams ...interface{}) (id int64, err error) {
	res, err := database.Exec(sqlStatement, sqlParams...)
	logger.Debug("MySQL: %#v query: %s", res, sqlStatement)

	if err != nil {
		logger.Error("MySQL: ExecError %#v query: %s", err, sqlStatement)
	} else {
		id, err = res.LastInsertId()
		if err != nil {
			logger.Error("MySQL: LastInsertedId %#v query: %s", err, sqlStatement)
		}
	}

	return
}

// ExecuteToArray method is used for execute a SQL
func ExecuteToArray(logger logs.Log, theCase string, sqlStatement string, sqlParams ...interface{}) (header []string, data [][]string) {
	var err error
	header, data, err = gosqljson.QueryDbToArray(database, theCase, sqlStatement, sqlParams...)

	logger.Debug("MySQL: Parameters: %#v", sqlParams...)

	if err != nil {
		var newSQL = strings.Replace(sqlStatement, "?", "%v", -1)

		logger.Error("MySQL: sql: "+newSQL, sqlParams...)

		logger.Error("MySQL: gosqljson: QueryDbToArray: %#v query: %s", err, sqlStatement)
		panic(err)
	}

	logger.Debug("MySQL: Response: Headers: %v", header)
	logger.Debug("MySQL: Response: Data: %v", data)

	return
}

func QueryToMap(logger logs.Log, theCase string, sqlStatement string, sqlParams ...interface{}) (data []map[string]string) {
	var err error
	data, err = gosqljson.QueryDbToMap(database, theCase, sqlStatement, sqlParams...)

	if err != nil {
		logger.Error("MySQL: gosqljson: QueryDbToMap: %+v query: %s", err, sqlStatement)
		panic(err)
	}

	return
}
