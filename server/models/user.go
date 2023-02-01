package models

import (
	"time"

	"gorm.io/gorm"
)

type User struct {
	NIK       int64          `json:"nik" gorm:"index;primaryKey"`
	Name      string         `json:"name" gorm:"index;type: varchar(50)"`
	Gender    string         `json:"gender" gorm:"index;type: varchar(50)"`
	DOB       time.Time      `json:"dob"`
	Address   string         `json:"address" gorm:"type: text"`
	Country   string         `json:"country" gorm:"index;type: varchar(50)"`
	CreatedAt time.Time      `json:"-"`
	UpdatedAt time.Time      `json:"-"`
	DeletedAt gorm.DeletedAt `json:"-" gorm:"index"`
}
