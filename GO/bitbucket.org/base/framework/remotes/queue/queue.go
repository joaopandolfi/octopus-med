package queue

import (
	"bitbucket.org/base/framework/logs"
	"golang.org/x/oauth2/google"
	cloudtasks "google.golang.org/api/cloudtasks/v2beta2"
)

type QueueRemote interface {
	Add(queueMessage QueueMessage) error
}

type QueueMessage struct {
	Method      string
	QueueWorker string
	Parent      string
	B64Message  string
}

type Queue struct {
	Logger logs.Log
}

// Add Message on queue
func (queue Queue) Add(queueMessage QueueMessage) (fError error) {

	ctx := queue.Logger.GetContext()

	c, fError := google.DefaultClient(*ctx, cloudtasks.CloudPlatformScope)
	if fError != nil {
		queue.Logger.Fatal(fError)
		return
	}

	cloudtasksService, fError := cloudtasks.New(c)
	if fError != nil {
		queue.Logger.Fatal(fError)
		return
	}

	rb := &cloudtasks.CreateTaskRequest{
		Task: &cloudtasks.Task{
			AppEngineHttpRequest: &cloudtasks.AppEngineHttpRequest{
				HttpMethod:  queueMessage.Method,
				RelativeUrl: queueMessage.QueueWorker,
				Payload:     queueMessage.B64Message,
			},
		},
	}

	resp, fError := cloudtasksService.Projects.Locations.Queues.Tasks.Create(queueMessage.Parent, rb).Context(*ctx).Do()

	if fError != nil {
		queue.Logger.Error("[ERROR]-[ADD-QUEUE] - Error on add message in queue ", fError)
	} else {
		queue.Logger.Debug("[ADD-QUEUE] - Message queued successfully [%s] - resp [%s]\n", queueMessage.B64Message, resp)
	}

	return fError
}
