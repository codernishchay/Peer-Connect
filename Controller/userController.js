const userDatabase = require("../Model/userModel");
const shortUserDatabase = require("../Model/shortUserModel");

exports.userLogin =async (req,res)=>{

    const savedUser = await userDatabase.create(req.body);

    await asyncForEach(req.body.skillSet,async (data)=>{
        await shortUserDatabase.create({
            name : savedUser.name ,
            country : savedUser.country ,
            knownLanguage: savedUser.knownLanguage ,
            ratingForThisSkill : data.ratingAssociatedWithSkill ,
            isMentor : data.isMentor ,
            mainUserReference : savedUser._id,
            skill : data.skillName
        });
    });

    return res.status(201).json({
        success : true ,
        message : "User Profile Created"
    });
}

async function asyncForEach(array, callback) {
    for (let index = 0; index < array.length; index++) {
        await callback(array[index], index, array);
    }
}