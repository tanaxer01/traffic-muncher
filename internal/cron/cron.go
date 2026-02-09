package cron

import (
	"fmt"
	"time"

	"github.com/go-co-op/gocron/v2"
)

func NewScheduler() (gocron.Scheduler, error) {
	s, err := gocron.NewScheduler()

	if err != nil {
		return nil, err
	}

	_, err = s.NewJob(
		gocron.DurationJob(10*time.Second),
		gocron.NewTask(func(a string, b string) {
			fmt.Println("HOLA")
		}, "hello", "b"),
	)

	if err != nil {
		return nil, err
	}

	return s, nil
}
