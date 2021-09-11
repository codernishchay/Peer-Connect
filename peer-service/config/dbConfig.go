package config

import (
	"context"
	"fmt"
	"log"
	"time"

	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

var DATABASE *mongo.Database
var CLIENT *mongo.Client
var PEERDB *mongo.Collection
var SKILLDB *mongo.Collection

func DBConfig() {

	clientOptions := options.Client().
		ApplyURI("mongodb+srv://nishi:123ewq@cluster0.zjfve.mongodb.net/golang?retryWrites=true&w=majority")
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
	DATABASE = CLIENT.Database("golang")
	fmt.Println(DATABASE)
	PEERDB = DATABASE.Collection("peer")
	SKILLDB = DATABASE.Collection("skill")
}
