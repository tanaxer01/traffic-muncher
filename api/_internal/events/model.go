package events

type Event struct {
	Country  string
	City     string
	Location Location
}

type WazeRequest struct {
	Top    float32 `form:"top" binding:"required"`
	Bottom float32 `form:"bottom" binding:"required"`
	Left   float32 `form:"left" binding:"required"`
	Right  float32 `form:"right" binding:"required"`
}

type WazeResponse struct {
	Alerts []Alert `json:"alerts"`
	// Jams      any    `json:"jams"`
	// Users     any    `json:"users"`
	StartTime string `json:"startTime"`
	EndTime   string `json:"endTime"`
}

type Alert struct {
	City       string   `json:"city"`
	Confidence int      `json:"confidence"`
	Country    string   `json:"country"`
	Location   Location `json:"location"`
	ThumbsUp   int      `json:"nThumbsUp"`
	Street     string   `json:"street"`
	Type       string   `json:"type"`
	UUID       string   `json:"uuid"`
}

type Location struct {
	x float32
	y float32
}
