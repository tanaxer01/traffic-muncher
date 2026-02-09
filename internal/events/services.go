package events

import (
	"log"
)

func PollEvents(r WazeRequest) {
	a := FetchWazeData(r.Top, r.Bottom, r.Left, r.Right)
	log.Println(a.Alerts[0])

}
