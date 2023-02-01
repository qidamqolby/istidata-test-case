package handlers

import (
	"encoding/json"
	"net/http"
	dto "server/dto/result"
	userdto "server/dto/user"
	"server/models"
	"server/repositories"
	"strconv"
	"time"

	"github.com/gorilla/mux"
)

// SETUP HANLDER STRUCT
type handlerUser struct {
	UserRepository repositories.UserRepository
}

// SETUP HANDLER FUNCTION
func HandlerUser(UserRepository repositories.UserRepository) *handlerUser {
	return &handlerUser{UserRepository}
}

// FUNCTION FIND USERS
func (h *handlerUser) FindUsers(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	// RUN REPOSITORY FIND USERS
	users, err := h.UserRepository.FindUsers()
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		response := dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()}
		json.NewEncoder(w).Encode(response)
		return
	}

	// WRITE RESPONSE
	w.WriteHeader(http.StatusOK)
	response := dto.SuccessResult{Code: "success", Data: users}
	json.NewEncoder(w).Encode(response)
}

// FUNCTION CREATE USER
func (h *handlerUser) CreateUser(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	// GET REQUEST AND DECODING JSON
	request := new(userdto.UserRequest)
	if err := json.NewDecoder(r.Body).Decode(&request); err != nil {
		w.WriteHeader(http.StatusBadRequest)
		response := dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()}
		json.NewEncoder(w).Encode(response)
		return
	}

	// CONVERT DATE
	date, _ := time.Parse("2006-01-02", request.DOB)

	// SETUP FOR QUERY
	user := models.User{
		NIK:       request.NIK,
		Name:      request.Name,
		Gender:    request.Gender,
		DOB:       date,
		Address:   request.Address,
		Country:   request.Country,
		CreatedAt: time.Now(),
	}

	// RUN REPOSITORY CREATE USER
	data, err := h.UserRepository.CreateUser(user)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		response := dto.ErrorResult{Code: http.StatusInternalServerError, Message: err.Error()}
		json.NewEncoder(w).Encode(response)
		return
	}

	// CREATE RESPONSE
	UserResponse := userdto.UserResponse{
		NIK:  data.NIK,
		Name: data.Name,
	}

	// WRITE RESPONSE
	w.WriteHeader(http.StatusOK)
	response := dto.SuccessResult{Code: "success", Data: UserResponse}
	json.NewEncoder(w).Encode(response)
}

// FUNCTION UPDATE USER
func (h *handlerUser) UpdateUser(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	// GET REQUEST AND DECODING JSON
	request := new(userdto.UserRequest)
	if err := json.NewDecoder(r.Body).Decode(&request); err != nil {
		w.WriteHeader(http.StatusBadRequest)
		response := dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()}
		json.NewEncoder(w).Encode(response)
		return
	}

	// RUN REPOSITORY GET USER
	user, err := h.UserRepository.GetUser(request.NIK)
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		response := dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()}
		json.NewEncoder(w).Encode(response)
		return
	}

	// CONVERT DATE
	date, _ := time.Parse("2006-01-02", request.DOB)

	// CHECK UPDATED VALUE
	if request.Name != "" {
		user.Name = request.Name
	}

	if request.Gender != "" {
		user.Gender = request.Gender
	}

	if request.DOB != "" {
		user.DOB = date
	}

	if request.Address != "" {
		user.Address = request.Address
	}

	if request.Country != "" {
		user.Country = request.Country
	}

	// CHANGE VALUE UPDATE TIME
	user.UpdatedAt = time.Now()

	// RUN REPOSITORY UPDATE USER
	data, err := h.UserRepository.UpdateUser(user)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		response := dto.ErrorResult{Code: http.StatusInternalServerError, Message: err.Error()}
		json.NewEncoder(w).Encode(response)
		return
	}

	// CREATE RESPONSE
	UserResponse := userdto.UserResponse{
		NIK:  data.NIK,
		Name: data.Name,
	}

	// WRITE RESPONSE
	w.WriteHeader(http.StatusOK)
	response := dto.SuccessResult{Code: "success", Data: UserResponse}
	json.NewEncoder(w).Encode(response)
}

// FUNCTION DELETE USER
func (h *handlerUser) DeleteUser(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	// GET NIK FROM URL
	NIK, _ := strconv.Atoi(mux.Vars(r)["id"])

	// RUN REPOSITORY GET USER
	user, err := h.UserRepository.GetUser(int64(NIK))
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		response := dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()}
		json.NewEncoder(w).Encode(response)
		return
	}

	// RUN REPOSITORY DELETE USER
	data, err := h.UserRepository.DeleteUser(user)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		response := dto.ErrorResult{Code: http.StatusInternalServerError, Message: err.Error()}
		json.NewEncoder(w).Encode(response)
		return
	}

	// CREATE RESPONSE
	UserResponse := userdto.UserResponse{
		NIK:  data.NIK,
		Name: data.Name,
	}

	// WRITE RESPONSE
	w.WriteHeader(http.StatusOK)
	response := dto.SuccessResult{Code: "success", Data: UserResponse}
	json.NewEncoder(w).Encode(response)
}
