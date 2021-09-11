package models

type PeerR struct {
	UserID   string        `josn:"userid" bson:"userid"`
	Skillset [3]PeerSkills `json:"skillset" bson:"skillset"`
	Name     string        `json:"name" bson:"name"`
	Country  string        `json:"country" bson:"country"`
	Rating   string        `json:"rating" bson:"rating" `
	Links    []string      `json:"links" bson:"links"`
}
