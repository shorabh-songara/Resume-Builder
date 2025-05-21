const express = require('express')
const cors = require("cors");
const connectDB = require('./config/db');
require("dotenv").config();
const app  = express();
const authRouter = require("./routers/authRouter")
const resumeRouter = require("./routers/resumeRouter")

const PORT = process.env.PORT || 5000
app.use(
    cors({
        origin : process.env.CLIENT_URL || "*",
        methods : ["GET", "POST" , "PUT" , "PATCH" , "DELETE"],
        allowedHeaders: ["Content-Type", "Authorization"]
    })
)

connectDB();
app.use(express.json());


app.use("/api/auth" , authRouter)
app.use("/uploads" , express.static("uploads"))
app.use("/api/resume" , resumeRouter)
app.listen(PORT , "localhost", ()=>{
    console.log(`server is running on ${PORT}`)
})