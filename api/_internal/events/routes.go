package events

import "github.com/gin-gonic/gin"

func RegisterRoutes(router *gin.Engine) {
	events := router.Group("/events")

	events.GET("/poll", HandlePollEvents)
}
