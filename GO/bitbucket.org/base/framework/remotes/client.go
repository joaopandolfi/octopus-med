package remotes

import (
	"bytes"
	"io/ioutil"
	"net/http"

	"bitbucket.org/base/framework/logs"
)

// Post function is used for post over HTTP
func Post(logger logs.Log, url string, body string, header map[string]string) (response []byte, httpResponse *http.Response) {
	logger.Debug("HTTP Client: new request: %s", url)
	logger.Debug("HTTP Client: new request: %s", body)

	req, err := http.NewRequest("POST", url, bytes.NewBuffer([]byte(body)))

	if err != nil {
		logger.Error("HTTP Client: new request: %+v, url: %s, context: %v", err, url, logger.GetContext())
		panic(err)
	}

	for k, v := range header {
		req.Header.Set(k, v)
	}

	client := &http.Client{}
	httpResponse, err = client.Do(req)

	defer func() {
		httpResponse.Body.Close()
	}()

	if err != nil {
		logger.Error("HTTP Client: Doing request: %+v, url: %s, context: %v", err, url, logger.GetContext())
		panic(err)
	}

	response, err = ioutil.ReadAll(httpResponse.Body)

	if err != nil {
		logger.Error("HTTP Client: Reading response body: %+v, url: %s, context: %v", err, url, logger.GetContext())
		panic(err)
	}

	logger.Debug("HTTP Client: response: %s", string(response))

	return
}
