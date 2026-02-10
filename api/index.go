package handler

import (
	"fmt"
	"net/http"
)

// func Handler(c *gin.Context) {
// 	gin.SetMode(gin.ReleaseMode)

// 	router := routes.NewRouter()

// 	router.ServeHTTP(c.Writer, c.Request)
// }

func Hello(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "Hello Kitty")
}
