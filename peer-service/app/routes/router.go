package routes

import (
	"peer/app/controllers"

	"github.com/gin-gonic/gin"
)

func Router() {
	r := gin.Default()
	r.POST("/register", controllers.CreatePeer)
	r.POST("/createSkill", controllers.CreateSkill)
	r.GET("/search", controllers.FindPeer)
	r.POST("/update", controllers.UpdatePeerSkill)
	r.Run()
}
