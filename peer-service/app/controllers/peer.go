package controllers

import (
	"context"
	"encoding/json"
	"fmt"
	"log"
	"peer/app/models"
	"peer/config"
	"time"

	"github.com/gin-gonic/gin"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

// this will create collection which skill user want to select, if new it will do that too.
// if already existing then user will be  pushed to that collection.

func CreatePeer(c *gin.Context) {
	c.Writer.Header().Set("content-type", "configlication/json")
	var peer models.Peer

	json.NewDecoder(c.Request.Body).Decode(&peer)

	ctx, _ := context.WithTimeout(context.Background(), 15*time.Second)
	peer.ID = primitive.NewObjectID()
	for i := range peer.Skillset {
		result, err := config.DATABASE.Collection(peer.Skillset[i].Skill).InsertOne(ctx, peer)
		if err != nil {
			log.Fatal(err)
		}
		fmt.Println(result)
	}
	r, _ := config.PEERDB.InsertOne(ctx, peer)
	json.NewEncoder(c.Writer).Encode(r)
}

// we want to give users flexibility to search peers on basis of
func FindPeer(c *gin.Context) {

}
