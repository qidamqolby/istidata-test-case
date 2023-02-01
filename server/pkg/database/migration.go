package database

import (
	"fmt"
	"server/models"
)

// CREATE DATABASE
func RunMigration() {
	err := DB.AutoMigrate(&models.User{})
	if err != nil {
		fmt.Println(err)
		panic("Migration Failed")
	}

	fmt.Println("Migration Success")
}
