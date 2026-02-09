package events

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

func HandlePollEvents(c *gin.Context) {
	var params WazeRequest
	if err := c.ShouldBindQuery(&params); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
	}

	PollEvents(params)

	c.String(200, "OK")
}
