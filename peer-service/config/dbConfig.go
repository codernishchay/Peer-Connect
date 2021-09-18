package config

import (
	"context"
	"fmt"
	"log"
	"os"
	"time"

	"github.com/joho/godotenv"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

var DATABASE *mongo.Database
var CLIENT *mongo.Client
var PEERDB *mongo.Collection
var SKILLDB *mongo.Collection

func DBConfig() {
	err := godotenv.Load(".env")
	if err != nil {
		log.Fatal(err)
	}
	setTitle := os.Getenv("DATABASE_URL")
	fmt.Println(setTitle)
	clientOptions := options.Client().ApplyURI(setTitle)
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()
	client, err := mongo.Connect(ctx, clientOptions)
	if err != nil {
		log.Fatal(err)
	}
	CLIENT = client
	if client != nil {
		fmt.Println("connected to mongo")
	}
	DATABASE = CLIENT.Database("peer-connect")
	fmt.Println(DATABASE)
	PEERDB = DATABASE.Collection("peer")
	SKILLDB = DATABASE.Collection("skill")
}

func CreateCollection(name string) *mongo.Collection {
	coll := DATABASE.Collection(name)
	return coll
}
