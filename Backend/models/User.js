const mongoose = require('mongoose')

const userschema = mongoose.Schema({
    name : {
        type: String,
        required: true

    },

    email:{
        type: String,
        required : true,
        unique : true
    },

    password : {
        type : String ,
        required : true,
        minLength : 8,

    },

    ConfirmPassword :{
        type : String,
        minLength:8,
    },
    
    profileImageUrl : {
        type : String,
        default : null
    }

},
{
    timestamps : true
}

)


const userModel = mongoose.model("User", userschema)

module.exports = userModel;