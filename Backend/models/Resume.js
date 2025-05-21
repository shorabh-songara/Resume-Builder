const mongoose = require("mongoose")

const resumeSchema = mongoose.Schema({
    userId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",   
        required : true
    },

    title : {
        type : String,
        required : true
    },

    thumbnaillink:{
        type : String
    },
    template:{
        theme : String,
        colorPalette : [String]
    },

    ProfileInfo:{
        profilePriviewUrl : String,
        fullname :String,
        designation : String,
        summery : String
    },

    contactInfo:{
        email : String,
        phone : String,
        location : String,
        linkedin : String,
        github : String,
        website : String

    },

    workExperience : [
        {
            company : String,
            role : String,
            startDate : String,
            endDate : String,
            description : String,

        }
    ],

    education : [
        {
            degree : String,
            institution : String,
            startDate : String , 
            endDate : String
        }
    ],

    skills : [
        {
            name : String,
            progress : Number,
        }
    ],

    projects : [
        {
            title : String,
            description : String,
            github : String,
            liveDemo : String,
        }
    ],

    certifications : [
        {
                title: String ,
                issuer : String,
                year : String
        }
    ],

    languages : [
        {
            name : String , 
            progress : Number,
        }
    ],

    interests : [String]



},

{
    timestamps : {
        createdAt : "CreatedAt",
        updatedAt : "UpdatedAt"
    }
}

)


const resumeModel = mongoose.model("Resume" , resumeSchema);

module.exports = resumeModel;

