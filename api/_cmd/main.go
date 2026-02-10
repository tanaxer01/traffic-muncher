package main

import (
	"os"

	"github.com/tanaxer01/traffic-muncher/api/_internal/routes"
)

func main() {

	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	// scheduler, err := cron.NewScheduler()
	// if err != nil {
	// 	panic(err)
	// }

	// fmt.Println("START")
	// scheduler.Start()
	// block until you are ready to shut down
	// select {
	// case <-time.After(time.Minute):
	// }

	// when you're done, shut it down
	// err = scheduler.Shutdown()
	// if err != nil {
	// 	// handle error
	// }
	// fmt.Println("SHUTDOWN")

	router := routes.NewRouter()
	router.Run(":" + port)
}
