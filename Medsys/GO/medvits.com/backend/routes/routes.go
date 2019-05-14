package routes

import (
	"bitbucket.org/base/framework/routers"
)

// Register routes for push service
func Register() {
	user()
	hospital()
	patient()
	interventions()
	statics()
	routers.Map()
}
