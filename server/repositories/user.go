package repositories

import (
	"server/models"

	"gorm.io/gorm"
)

// USER REPOSITORY INTERFACE
type UserRepository interface {
	FindUsers() ([]models.User, error)
	GetUser(ID int64) (models.User, error)
	CreateUser(user models.User) (models.User, error)
	UpdateUser(user models.User) (models.User, error)
	DeleteUser(user models.User) (models.User, error)
}

// USER REPOSITORY INTERFACE
func RepositoryUser(db *gorm.DB) *repository {
	return &repository{db}
}

// FIND USERS FROM DATABASE
func (r *repository) FindUsers() ([]models.User, error) {
	var users []models.User
	err := r.db.Find(&users).Error
	return users, err
}

// FIND USER FROM DATABASE
func (r *repository) GetUser(ID int64) (models.User, error) {
	var user models.User
	err := r.db.First(&user, ID).Error
	return user, err
}

// CREATE USER TO DATABASE
func (r *repository) CreateUser(user models.User) (models.User, error) {
	err := r.db.Create(&user).Error
	return user, err
}

// UPDATE USER TO DATABASE
func (r *repository) UpdateUser(user models.User) (models.User, error) {
	err := r.db.Save(&user).Error
	return user, err
}

// UPDATE USER TO DATABASE
func (r *repository) DeleteUser(user models.User) (models.User, error) {
	err := r.db.Delete(&user).Error
	return user, err
}
