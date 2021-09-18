package controllers

import (
	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type skill struct {
	Skill string `json:"skill" bson:"skill"`
}

// createSkill will create a colleciton named the skill in database and add the
// peer to that collection
// func CreateSkill(c *gin.Context) {
// 	c.Writer.Header().Set("content-type", "application/json")
// 	var skill skill
// 	json.NewDecoder(c.Request.Body).Decode(&skill)

// 	db := config.DATABASE.Collection(skill.Skill)
// 	fmt.Println(db)
// 	str := "created new collection named " + skill.Skill
// 	json.NewEncoder(c.Writer).Encode(str)
// }

// thats all we need to create a skill
type UpdateSkill struct {
	id        primitive.ObjectID `json:"id" bson:"id"`
	level     int                `json:"level" bson:"level"`
	skillname string             `json:"skillname" bson:"skillname"`
}

//TODO will focus on this later
func AddPeerSkill(c *gin.Context) {
	// c.Writer.Header().Set("content-type", "application/json")
	// ctx, _ := context.WithTimeout(context.Background(), 15*time.Second)
	// var updateSkill UpdateSkill
	// // find peer
	// var peer models.Peer
	// json.NewDecoder(c.Request.Body).Decode(&updateSkill)
	// config.PEERDB.FindOneAndUpdate(ctx, bson.M{"_id": updateSkill.id}, bson.M{"$push": bson.M{"skillset": updateSkill.skillname}})

	// fmt.Println("updateing the user")
	// fmt.Println(peer.Skillset)
	// // we will have to update the peer model first and then

	// fmt.Println("updateing the user")
	// result, err := config.DATABASE.Collection(peer.Skillset[len(peer.Skillset)-1].Skill).InsertOne(ctx, peer) // get the userdata and push here ...  ) ).Decode(&skl)
	// if err != nil {
	// 	fmt.Println("here ? 1")
	// 	fmt.Println(peer, "here is skl ")
	// 	log.Fatal(err)
	// }
	// fmt.Println(result)
	// fmt.Println(" still runing, first gorouting is over congrats !!!")
}
