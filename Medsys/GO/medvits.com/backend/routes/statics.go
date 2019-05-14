package routes

import (
	"bitbucket.org/base/framework/routers"
	"medvits.com/backend/controllers"
)

func statics() {
	routers.AddRoutes(routers.Routes{
		routers.Route{
			Path:    "/conducts/{idCond}/update",
			Handler: controllers.StaticsController{}.UpdateConductById,
			Methods: []string{"POST"},
		},
	})

	routers.AddRoutes(routers.Routes{
		routers.Route{
			Path:    "/conducts",
			Handler: controllers.StaticsController{}.NewConduct,
			Methods: []string{"POST"},
		},
	})

	routers.AddRoutes(routers.Routes{
		routers.Route{
			Path:    "/conducts/{idCond}/del",
			Handler: controllers.StaticsController{}.DelConduct,
			Methods: []string{"POST"},
		},
	})

	routers.AddRoutes(routers.Routes{
		routers.Route{
			Path:    "/conducts/{type}",
			Handler: controllers.StaticsController{}.ListConductByType,
			Methods: []string{"GET"},
		},
	})
}
