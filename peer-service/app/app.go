package app

import (
	"fmt"
	"peer/app/routes"
	"peer/config"
)

func App() {
	config.DBConfig()
	routes.Router()
	fmt.Println("Hety fro app ")
}
