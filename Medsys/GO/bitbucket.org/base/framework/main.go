package framework

import "net/http"

// Main function is used to start Appengine
func Main() {
	http.ListenAndServe(":"+Configuration.Args.Port, nil)
	//appengine.Main()
}

func main() {
	Main()
}
