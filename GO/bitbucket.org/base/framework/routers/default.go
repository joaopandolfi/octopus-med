package routers

import (
	"net/http"
	"os"

	"bitbucket.org/base/framework/handlers"
	gorillahandlers "github.com/gorilla/handlers"
	"github.com/gorilla/mux"
)

// Route define a route struct
type Route struct {
	Path    string
	Handler handlers.CustomHandler
	Methods []string
}

// Routes for multiple routes
type Routes []Route

// Router variable used for default routes
var router = mux.NewRouter().StrictSlash(false)

// AddRoute method to register a route
func AddRoute(route Route) {
	for _, method := range route.Methods {
		router.Methods(method).Path(route.Path).Handler(handlers.CustomHandler(route.Handler))
	}
}

// AddRoutes method to register routes
func AddRoutes(routes Routes) {
	for _, route := range routes {
		AddRoute(route)
	}
}

// Map method register all routes and register gorilla to default mux
func Map() {
	//http.Handle("/", router)
	http.Handle("/", gorillahandlers.CombinedLoggingHandler(os.Stderr, router))
}
