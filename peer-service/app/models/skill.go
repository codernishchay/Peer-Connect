package models

type Skill struct {
	SkillName string
	Mentors   []Peer `json:"mentors" bson:"mentors"`
	Peers     []Peer `json:"peers" bson:"peers"`
}
