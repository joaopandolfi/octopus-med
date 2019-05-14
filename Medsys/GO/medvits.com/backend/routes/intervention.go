package routes

import (
	"bitbucket.org/base/framework/routers"
	"medvits.com/backend/controllers"
)

func interventions() {
	routers.AddRoutes(routers.Routes{
		routers.Route{
			Path:    "/hospital/{idHospital}/new/intervention",
			Handler: controllers.InterventionController{}.New,
			Methods: []string{"POST"},
		},
	})

	routers.AddRoutes(routers.Routes{
		routers.Route{
			Path:    "/hospital/{idHospital}/list/rest/{idRest}/intervention",
			Handler: controllers.InterventionController{}.ListByRest,
			Methods: []string{"GET"},
		},
	})

	routers.AddRoutes(routers.Routes{
		routers.Route{
			Path:    "/hospital/{idHospital}/update/intervention/{idIntervention}",
			Handler: controllers.InterventionController{}.UpdateById,
			Methods: []string{"POST"},
		},
	})

	routers.AddRoutes(routers.Routes{
		routers.Route{
			Path:    "/hospital/{idHospital}/done/intervention/{idIntervention}",
			Handler: controllers.InterventionController{}.Done,
			Methods: []string{"POST"},
		},
	})
}
