const express = require("express");
const { registerUser, loginUser, getUserProfile } = require("../controllers/authController");
const { protectRoute } = require("../middlewares/authmiddleware");
const upload = require("../middlewares/uploadmiddleware");

const authRouter = express.Router();

authRouter.route("/register").post(registerUser);
authRouter.route("/login").post(loginUser)
authRouter.route("/profile").get(protectRoute,getUserProfile);

authRouter.route("/uploadimg").post(upload.single("image") , (req, res)=>{
    if(!req.file){
        return res.status(400).json({
            message : "No file upload"
        })
    }
    const imageUrl = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;
    res.status(200).json({
        imageUrl
    })
})

module.exports = authRouter;