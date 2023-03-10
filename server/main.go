package main

import (
	"fmt"
	"net/http"
	"os"
	"server/pkg/database"
	"server/routes"

	"github.com/gorilla/handlers"
	"github.com/gorilla/mux"
	"github.com/joho/godotenv"
)

func main() {
	// GET ENVIRONMENT VARIABLES
	errEnv := godotenv.Load()
	if errEnv != nil {
		panic("Failed to load env file")
	}

	// DATABASE INITIALIZATION
	database.DatabaseInit()

	// RUN MIGRATION
	database.RunMigration()

	// DEFINE ROUTE
	r := mux.NewRouter()

	// CREATE PREFIX SUBROUTER
	routes.RouteInit(r.PathPrefix("/api/istidata").Subrouter())

	// DEFINE ALLOWED CORS REQUEST
	var AllowedHeaders = handlers.AllowedHeaders([]string{"X-Requested-With", "Content-Type", "Authorization"})
	var AllowedMethods = handlers.AllowedMethods([]string{"GET", "POST", "PUT", "HEAD", "OPTIONS", "PATCH", "DELETE"})
	var AllowedOrigins = handlers.AllowedOrigins([]string{"*"})

	var port = os.Getenv("PORT")

	fmt.Println("server running localhost:" + port)

	// RUN SERVER
	http.ListenAndServe(":"+port, handlers.CORS(AllowedHeaders, AllowedMethods, AllowedOrigins)(r))
}
