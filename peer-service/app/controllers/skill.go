package controllers

import (
	"context"
	"encoding/json"
	"fmt"
	"log"
	"peer/app/models"
	"peer/config"
	"sync"
	"time"

	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

func CreateSkill(c *gin.Context) {
	c.Writer.Header().Set("content-type", "application/json")
	var skill models.Skill
	json.NewDecoder(c.Request.Body).Decode(&skill)
	ctx, _ := context.WithTimeout(context.Background(), 5*time.Second)
	result, _ := config.SKILLDB.InsertOne(ctx, skill)
	json.NewEncoder(c.Writer).Encode(result)
}

// thats all we need to create a skill
type custom struct {
	Id     string `json:"_id" bson:"_id"`
	Skill  string `json:"skill" bson:"skill"`
	IsPeer bool   `json:"ispeer" bson:"ispeer"`
}

func UpdatePeerSkill(c *gin.Context) {
	var m sync.WaitGroup

	c.Writer.Header().Set("content-type", "application/json")
	ctx, _ := context.WithTimeout(context.Background(), 15*time.Second)
	var user custom
	json.NewDecoder(c.Request.Body).Decode(&user)
	m.Add(3)
	go func() {
		fmt.Println("updateing the user")
		var skl models.Skill
		filter := bson.D{primitive.E{Key: "skillname", Value: user.Skill}}
		update := bson.M{"$push": bson.M{"peers": user}}
		err := config.SKILLDB.FindOneAndUpdate(ctx, filter, update).Decode(&skl)
		if err != nil {

			fmt.Println("here ? 1")
			fmt.Println(skl, "here is skl ")
			log.Fatal(err)
		}
		fmt.Println(" still runing, first gorouting is over congrats !!!")
		m.Done()
	}()
	go func() {
		fmt.Println("updateing the user", c.Request.Body, user)
		obj, _ := primitive.ObjectIDFromHex(user.Id)
		fmt.Println(obj)
		var skill models.PeerSkills
		skill.Skill = user.Skill
		skill.Ispeer = user.IsPeer
		skill.Rating = 0
		fmt.Println(skill, "skill is thi9s")
		var peer models.Peer
		filter := bson.M{"_id": obj}
		update := bson.M{"$push": bson.M{"skillset": skill}}
		config.PEERDB.FindOne(ctx, bson.M{"_id": obj}).Decode(&peer)
		fmt.Println(peer, "here is the peer ")
		config.PEERDB.FindOneAndUpdate(ctx, filter, update).Decode(peer)
		fmt.Println(peer, peer.Skillset, "  still where ? awhw t adfsafd")
		m.Done()
	}()

}
