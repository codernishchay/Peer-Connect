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
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

func CreatePeer(c *gin.Context) {
	c.Writer.Header().Set("content-type", "configlication/json")
	var peer models.Peer

	json.NewDecoder(c.Request.Body).Decode(&peer)

	ctx, _ := context.WithTimeout(context.Background(), 15*time.Second)

	for i := range peer.Skillset {

		update := bson.M{"$push": bson.M{"peers": peer}}
		var result models.Skill
		err := config.SKILLDB.FindOne(ctx, bson.D{primitive.E{Key: "skillname", Value: peer.Skillset[i].Skill}}).Decode(&result)
		if err != nil {
			fmt.Println(" what the heck is this error")
			if result.SkillName != peer.Skillset[i].Skill {
				result.SkillName = peer.Skillset[i].Skill
				result.Mentors = []models.Peer{}
				result.Peers = []models.Peer{}
				data, err := bson.Marshal(result)
				if err != nil {
					fmt.Println("some error occured")
				}
				config.SKILLDB.InsertOne(ctx, data)
			}
		}

		updateResult, err := config.SKILLDB.UpdateOne(ctx, bson.D{primitive.E{Key: "skillname", Value: peer.Skillset[i].Skill}}, update)
		if err != nil {
			log.Fatal(err)
		}
		fmt.Println(updateResult)
	}
	peer.ID = primitive.NewObjectID()
	r, _ := config.PEERDB.InsertOne(ctx, peer)
	json.NewEncoder(c.Writer).Encode(r)
}

func FindPeer(c *gin.Context) {
	c.Writer.Header().Set("content-type", "configlicaton/json")

	var search string
	search = "java"
	ctx, cancel := context.WithTimeout(context.Background(), 30*time.Second)
	defer cancel()
	json.NewDecoder(c.Request.Body).Decode(&search)
	// var peers []models.Peer
	var skilldb models.Skill
	filter := bson.D{primitive.E{Key: "skillname", Value: search}}
	err := config.SKILLDB.FindOne(ctx, filter).Decode(&skilldb)

	if err != nil {
		fmt.Print(err)
		log.Fatal(err)
	}
	json.NewEncoder(c.Writer).Encode(skilldb.Peers)
}
