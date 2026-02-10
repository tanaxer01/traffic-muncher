package routes

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/tanaxer01/traffic-muncher/api/_internal/events"
)

func CORSMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		c.Writer.Header().Set("Access-Control-Allow-Origin", "http://localhost:3000")
		c.Writer.Header().Set("Access-Control-Allow-Credentials", "true")
		c.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization, accept, origin, Cache-Control, X-Requested-With")
		c.Writer.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS, GET, PUT, DELETE")

		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(http.StatusNoContent)
			return
		}
		c.Next()
	}
}

func NewRouter() *gin.Engine {
	router := gin.Default()
	router.Use(CORSMiddleware())

	router.GET("/ping", func(c *gin.Context) {
		c.String(200, "pong")
	})

	events.RegisterRoutes(router)

	return router
}
