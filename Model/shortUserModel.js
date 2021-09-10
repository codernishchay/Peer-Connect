const mongoose = require("mongoose");


const shortUser = new mongoose.Schema({
    name : String ,
    country : String ,
    knownLanguage: String ,
    ratingForThisSkill : Number ,
    isMentor : Boolean ,
    mainUserReference : String,
    skill : String
});
module.exports = mongoose.model("shortUser",shortUser);

/*
Java : While creation of user profile.
Java : [ shortUsers ]
 */
