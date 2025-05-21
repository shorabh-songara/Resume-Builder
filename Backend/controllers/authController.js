const jwt = require("jsonwebtoken")
const userModel = require("../models/User")
const cookie = require("cookie-parser")
const bcrypt = require("bcrypt")
require("dotenv").config()


let SECRET_KEY = process.env.SECRET_KEY
const generateJWT = (userId)=>{
    let JWT = jwt.sign({id:userId}, SECRET_KEY , {expiresIn:"7d"})
    return JWT;
}


async function registerUser(req,res){

    try {
        const {name , email , password , ConfirmPassword ,profileImageUrl} = req.body;
        const userExist = await userModel.findOne({email});

        if (password !== ConfirmPassword) {
            return res.status(400).json({ message: "Passwords do not match" });
        }

        if(userExist){
            res.status(400).json({
                message : "User already exist with this email"
            })
        }
        const salt = bcrypt.genSaltSync(10);
        const hashedPassword =await bcrypt.hashSync(password , salt);

        const user = await userModel.create({
            name , 
            email,
            password : hashedPassword,
            profileImageUrl 
        });

        const token = generateJWT({id : user._id});
        if(user){
            res.json({
                message : "registration successfull",
                newuser : user,
                token,
            })
        }else{
            res.json({
                message : "registration unsuccessfull"
            })
        }
    } catch (error) {
        res.status(500).json({
            message : "Server Error",
            error : error.message
        })
    }
}

async function loginUser(req,res) {
    try {
        const {email , password } = req.body;
        if (!email || !password) {
            console.log(email , password)
            return res.status(400).json({
                message: "Please enter both email and password"
            });
        }
            const user = await userModel.findOne({email})
            if (!user) {
                return res.status(404).json({
                    message: "Invalid email"
                });
            }
            const isMatch = await bcrypt.compare(password , user.password);
            if(!isMatch){
                return res.status(500).json({
                    message :"Invalid password"
                })
            }
            const token = generateJWT(user._id);
                res.cookie("Login" , token , {htttpOnly : true})
                res.json({
                    message : "Login Successfull",
                    user:{
                        id: user._id,
                        name : user.name,
                        email: user.email,
                        profileImageUrl : user.profileImageUrl,
                    },
                    token
            })        
    } catch (error) {
        res.status(500).json({
            message : "Server Error",
            error : error.message
        })
    }    
}

async function getUserProfile(req, res) {
    try {
        const user = await userModel.findById(req.user.id).select('-password');
        if(!user){
            return res.status(404).json({
                message : "User not found"
            })
        }     
        res.json({
            message : 'user data successfully retrived',
            userProfile : user
        })
    } catch (error) {
        res.status(500).json({
            message : "Server Error",
            error : error.message
        })
    }

    
}

module.exports = {registerUser , loginUser , getUserProfile}