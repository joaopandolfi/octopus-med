package main

import (
	"bitbucket.org/base/framework"
	"medvits.com/backend/configurations"
	"medvits.com/backend/routes"
)

func main() {
	framework.Load()
	configurations.Load() // Load all configurations
	//mysql.Init()
	routes.Register() // Register all routes
	framework.Main()  // Start framework
}
