const jwt = require("jsonwebtoken");
const userModel = require("../models/User");
require('dotenv').config();
async function protectRoute(req , res , next){
    try {
        let token = req.headers.authorization;
        if(token && token.startsWith("Bearer")){
            token = token.split(' ')[1];
            const decoded =  jwt.verify (token , process.env.SECRET_KEY);
            req.user = await userModel.findById(decoded.id).select('-password');
            next();
        }else{
            res.status(401).json({
                message : "Not Authorized , no Token "
            })
        }
        
    } catch (error) {
        res.json({
            message : "Token Failed error",
            error : error.message
        })
    }

}


module.exports = {protectRoute} ;