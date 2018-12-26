package routes

import (
	"bitbucket.org/base/framework/routers"
	"medvits.com/backend/controllers"
)

func patient() {
	routers.AddRoutes(routers.Routes{
		routers.Route{
			Path:    "/patient",
			Handler: controllers.PatientController{}.New,
			Methods: []string{"POST"},
		},
	})

	routers.AddRoutes(routers.Routes{
		routers.Route{
			Path:    "/patient/{patientID}",
			Handler: controllers.PatientController{}.GetById,
			Methods: []string{"GET"},
		},
	})

	routers.AddRoutes(routers.Routes{
		routers.Route{
			Path:    "/patient/{patientID}/del",
			Handler: controllers.PatientController{}.Del,
			Methods: []string{"POST"},
		},
	})

	routers.AddRoutes(routers.Routes{
		routers.Route{
			Path:    "/hospital/{idHospital}/list/patient",
			Handler: controllers.PatientController{}.ListByHospital,
			Methods: []string{"GET"},
		},
	})

	routers.AddRoutes(routers.Routes{
		routers.Route{
			Path:    "/rest/{idRest}/list/patient",
			Handler: controllers.PatientController{}.GetByRestId,
			Methods: []string{"GET"},
		},
	})
}
