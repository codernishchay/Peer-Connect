package models

import "go.mongodb.org/mongo-driver/bson/primitive"

type Peer struct {
	ID       primitive.ObjectID `bson:"_id" json:"_id"`
	Skillset []PeerSkills       `json:"skillset" bson:"skillset"`
	Name     string             `json:"name" bson:"name"`
	Country  string             `json:"country" bson:"country"`
	Rating   string             `json:"rating" bson:"rating" `
	Links    []string           `json:"links" bson:"links"`
}

type PeerSkills struct {
	Skill  string `json:"language" bson:"language" `
	Ispeer bool   `json:"ispeer" bson:"ispeer"`
	Rating int    `json:"rating" bson:"rating"`
}
