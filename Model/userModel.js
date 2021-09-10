const mongoose = require("mongoose");
const moment = require("moment");
const date = `${moment().format("DD/MM/YYYY").split("/")[0]}-${moment().format("DD/MM/YYYY").split("/")[1]}-${moment().format("DD/MM/YYYY").split("/")[2]}`

const user = new mongoose.Schema({
    username : {
        type : String ,
        required : true,
        unique : true,
        min : [3],
    },
    email : {
        type : String ,
        required : true,
        unique : true
    },
    password : {
        type : String ,
        required : true
    },
    country:{
      type : String ,
      required : true ,
    },
    languageKnown:{
        type : String ,
        required : true
    },
    name : {
        type : String ,
        required : true
    },
    dateOfJoining:{
        type : String,
        default : date
    },
    importantLinks : {
        type : Object ,
        linkedin : {
            type : String ,
            required : true
        },
        github : {
            type : String ,
            required : true
        },
        other : {
            type : String
        }
    },
    overallRating : {
        type : Number
    },
    skillSet : {
        type : Array,
        max : 3 ,
        skill : {
            skillName : String ,
            isMentor : {
                type : Boolean ,
                default: false
            },
            ratingAssociatedWithSkill : Number
        }
    }
});

module.exports = mongoose.model("user",user);