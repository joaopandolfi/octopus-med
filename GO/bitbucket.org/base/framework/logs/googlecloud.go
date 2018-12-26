package logs

import (
	"context"
	"fmt"
	"net/http"
	"os"

	"bitbucket.org/base/framework/utils"
	"cloud.google.com/go/logging"
	mrpb "google.golang.org/genproto/googleapis/api/monitoredres"
	logpb "google.golang.org/genproto/googleapis/logging/v2"
)

type googlecloudLog struct {
	context       context.Context
	session       string
	request       logging.HTTPRequest
	logger        *logging.Logger
	client        *logging.Client
	resource      mrpb.MonitoredResource
	operation     logpb.LogEntryOperation
	err           error
	project       string
	service       string
	version       string
	deployment    string
	requestPath   string
	requestMethod string
}

func (l *googlecloudLog) Info(message string, args ...interface{}) {
	l.logger.Log(createLogEntry(l, logging.Info, fmt.Sprintf(message, args...)))
}
func (l *googlecloudLog) Debug(message string, args ...interface{}) {
	l.logger.Log(createLogEntry(l, logging.Debug, fmt.Sprintf(message, args...)))
}
func (l *googlecloudLog) Warn(message string, args ...interface{}) {
	l.logger.Log(createLogEntry(l, logging.Warning, fmt.Sprintf(message, args...)))
}
func (l *googlecloudLog) Error(message string, args ...interface{}) {
	l.logger.Log(createLogEntry(l, logging.Error, fmt.Sprintf(message, args...)))
}
func (l *googlecloudLog) Critical(message string, args ...interface{}) {
	l.logger.Log(createLogEntry(l, logging.Critical, fmt.Sprintf(message, args...)))
}
func (l *googlecloudLog) Fatal(err error) {
	l.logger.Log(createLogEntry(l, logging.Critical, err))
}
func (l *googlecloudLog) Flush() {
	err := l.logger.Flush()
	panic(err)
}
func (l *googlecloudLog) GetContext() context.Context {
	return l.context
}

func (l *googlecloudLog) New(r *http.Request) *googlecloudLog {
	var resource mrpb.MonitoredResource
	var operation logpb.LogEntryOperation
	var request logging.HTTPRequest

	fillingAppengineData(l, &resource, &operation, &request, r)

	l.resource = resource
	l.operation = operation
	l.request = request
	l.session = utils.NewRandom(utils.Size32)

	return l
}

func fillingAppengineData(logger *googlecloudLog, resource *mrpb.MonitoredResource, operation *logpb.LogEntryOperation, request *logging.HTTPRequest, r *http.Request) {
	logger.context = context.Background()

	logger.project = os.Getenv("GOOGLE_CLOUD_PROJECT")
	logger.service = os.Getenv("GAE_SERVICE")
	logger.version = os.Getenv("GAE_VERSION")
	logger.deployment = os.Getenv("GAE_DEPLOYMENT_ID")

	logger.client, logger.err = logging.NewClient(logger.context, logger.project)
	logger.logger = logger.client.Logger(logger.service + "/stdout")

	resource.Type = "gae_app"
	resource.Labels = map[string]string{
		"module_id":  logger.service,
		"project_id": logger.project,
		"version_id": logger.version,
	}

	if r != nil {
		logger.requestPath = r.RequestURI
		logger.requestMethod = r.Method

		operation.Id = logger.version + ":" + logger.requestMethod + "|" + logger.requestPath
		operation.Producer = logger.requestMethod + "|" + logger.requestPath
		operation.First = true
		operation.Last = true

		request.Request = r
	}
}

func createLogEntry(logger *googlecloudLog, severity logging.Severity, message interface{}) logging.Entry {
	var entry = logging.Entry{
		InsertID: logger.session,
		Severity: severity,
		Payload:  message,
		Resource: &logger.resource,
		//Trace:    "projects" + "/" + logger.project + "/traces/turbi.com.br/" + logger.deployment + "/" + logger.session,
		Labels: map[string]string{
			//"request_id":   logger.session,
			"execution_id": logger.session,
			//"clone_id":     logger.session,
		},
	}

	if logger.request.Request != nil {
		entry.Operation = &logger.operation
		entry.HTTPRequest = &logger.request
	}

	return entry
}
