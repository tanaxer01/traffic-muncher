package events

import (
	"encoding/json"
	"fmt"
	"net/http"
)

const BASE_URL = "https://www.waze.com/live-map/api/georss"

func FetchWazeData(top, bottom, left, right float32) WazeResponse {
	coords := fmt.Sprintf("top=%f&bottom=%f&left=%f&right=%f", top, bottom, left, right)
	// NOTE: LEAVE HARDCODED FOR NOW, CHANGE IF I CAN FIND WHAT THEY DO
	options := "env=row&types=alerts,traffic,users"

	res, err := http.Get(BASE_URL + "?" + coords + "&" + options)
	if err != nil {
		panic(err)
	}

	if res.StatusCode > 299 {
		panic("Request failed")
	}
	defer res.Body.Close()

	var payload WazeResponse
	if err := json.NewDecoder(res.Body).Decode(&payload); err != nil {
		panic(err)
	}

	return payload
}
