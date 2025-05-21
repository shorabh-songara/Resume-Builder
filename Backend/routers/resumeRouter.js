const express = require("express");
const { protectRoute } = require("../middlewares/authmiddleware");
const { createResume, getUserResumes, getResumeById, updateResume, deleteResume } = require("../controllers/resumeController");
const uploadResumeImages = require("../controllers/uploadImages");
const resumeRouter = express.Router();


resumeRouter.use(protectRoute)
resumeRouter.route("/")
.post(createResume)//Create resume
.get(getUserResumes)// get all the resumes

resumeRouter.route("/:id")
.get(getResumeById) // get resume by id
.put(updateResume) // update the resume by id means only resume i have to update 
.delete(deleteResume)// delete the resume

resumeRouter.route("/:id/uploadimg")
.put(uploadResumeImages)

module.exports = resumeRouter;