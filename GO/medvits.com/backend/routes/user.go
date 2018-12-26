package routes

import (
	"bitbucket.org/base/framework/routers"
	"medvits.com/backend/controllers"
)

func user() {
	routers.AddRoutes(routers.Routes{
		routers.Route{
			Path:    "/login",
			Handler: controllers.UserController{}.Login,
			Methods: []string{"POST"},
		},
	})

	routers.AddRoutes(routers.Routes{
		routers.Route{
			Path:    "/config",
			Handler: controllers.UserController{}.Test,
			Methods: []string{"GET"},
		},
	})
}
