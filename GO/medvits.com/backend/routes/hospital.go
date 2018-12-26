package routes

import (
	"bitbucket.org/base/framework/routers"
	"medvits.com/backend/controllers"
)

func hospital() {

	routers.AddRoutes(routers.Routes{
		routers.Route{
			Path:    "/hospital",
			Handler: controllers.HospitalController{}.NewHospital,
			Methods: []string{"POST"},
		},
	})

	routers.AddRoutes(routers.Routes{
		routers.Route{
			Path:    "/hospital",
			Handler: controllers.HospitalController{}.ListHospital,
			Methods: []string{"GET"},
		},
	})

	routers.AddRoutes(routers.Routes{
		routers.Route{
			Path:    "/hospital/{idHospital}/del",
			Handler: controllers.HospitalController{}.DeleteHospital,
			Methods: []string{"POST"},
		},
	})

	routers.AddRoutes(routers.Routes{
		routers.Route{
			Path:    "/hospital/{idHospital}/update",
			Handler: controllers.HospitalController{}.UpdateHospital,
			Methods: []string{"POST"},
		},
	})

	// == UTIs
	routers.AddRoutes(routers.Routes{
		routers.Route{
			Path:    "/hospital/{idHospital}/new/uti",
			Handler: controllers.HospitalController{}.NewUti,
			Methods: []string{"POST"},
		},
	})

	routers.AddRoutes(routers.Routes{
		routers.Route{
			Path:    "/hospital/{idHospital}/list/uti",
			Handler: controllers.HospitalController{}.ListUtis,
			Methods: []string{"GET"},
		},
	})

	routers.AddRoutes(routers.Routes{
		routers.Route{
			Path:    "/hospital/{idHospital}/del/uti/{idUti}",
			Handler: controllers.HospitalController{}.DeleteUti,
			Methods: []string{"POST"},
		},
	})

	routers.AddRoutes(routers.Routes{
		routers.Route{
			Path:    "/hospital/{idHospital}/update/uti/{idUti}",
			Handler: controllers.HospitalController{}.UpdateUti,
			Methods: []string{"POST"},
		},
	})

	// == LEITOS
	routers.AddRoutes(routers.Routes{
		routers.Route{
			Path:    "/hospital/{idHospital}/list/rest",
			Handler: controllers.HospitalController{}.ListRestByHospital,
			Methods: []string{"GET"},
		},
	})

	routers.AddRoutes(routers.Routes{
		routers.Route{
			Path:    "/hospital/{idHospital}/list/uti/{idUti}/rest",
			Handler: controllers.HospitalController{}.ListRestByHospitalAndUti,
			Methods: []string{"GET"},
		},
	})

	routers.AddRoutes(routers.Routes{
		routers.Route{
			Path:    "/hospital/{idHospital}/new/uti/{idUti}/rest",
			Handler: controllers.HospitalController{}.NewRest,
			Methods: []string{"POST"},
		},
	})

	routers.AddRoutes(routers.Routes{
		routers.Route{
			Path:    "/hospital/{idHospital}/update/rest/{idRest}",
			Handler: controllers.HospitalController{}.UpdateRest,
			Methods: []string{"POST"},
		},
	})

	routers.AddRoutes(routers.Routes{
		routers.Route{
			Path:    "/hospital/{idHospital}/del/rest/{idRest}",
			Handler: controllers.HospitalController{}.DeleteRest,
			Methods: []string{"POST"},
		},
	})
}
