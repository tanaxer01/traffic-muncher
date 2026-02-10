package handler

import (
	"fmt"
	"net/http"

	"github.com/tanaxer01/traffic-muncher/api/_internal/routes"
)

func Hello(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "Hello Kitty")

	router := routes.NewRouter()
	router.ServeHTTP(w, r)
}
