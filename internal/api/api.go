package api

import (
	"github.com/gin-gonic/gin"
	"github.com/tanaxer01/traffic-muncher/internal/events"
)

func NewRouter() *gin.Engine {
	router := gin.Default()

	router.GET("/ping", func(c *gin.Context) {
		c.String(200, "pong")
	})

	events.RegisterRoutes(router)

	return router
}
