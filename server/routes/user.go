package routes

import (
	"server/handlers"
	"server/pkg/database"
	"server/repositories"

	"github.com/gorilla/mux"
)

func UserRoutes(r *mux.Router) {
	// GET USER REPOSITORY HANDLERS
	userRepository := repositories.RepositoryUser(database.DB)
	h := handlers.HandlerUser(userRepository)

	// DEFINE ROUTES
	r.HandleFunc("/users", h.FindUsers).Methods("GET")
	r.HandleFunc("/user", h.CreateUser).Methods("POST")
	r.HandleFunc("/user", h.UpdateUser).Methods("PATCH")
	r.HandleFunc("/user/{id}", h.DeleteUser).Methods("DELETE")
}
