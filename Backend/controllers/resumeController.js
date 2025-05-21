const mongoose = require("mongoose")
const fs = require("node:fs")
const path = require("node:path")
const resumeModel = require("../models/Resume");


// @access private
async function createResume(req, res){
    try {      
        const {title } = req.body;
        const defaultResumeData= {
            ProfileInfo:{
                profilePriviewUrl : "",
                fullname :"",
                designation : "",
                summery : "",
            },

            contactInfo:{
                email : "",
                phone : "",
                location : "",
                linkedin : "",
                github : "",
                website : ""
        
            },
        
            workExperience : [
                {
                    company : "",
                    role : "",
                    startDate : "",
                    endDate : "",
                    description : "",
        
                }
            ],
        
            education : [
                {
                    degree : "",
                    institution : "",
                    startDate : "" , 
                    endDate : ""
                }
            ],
        
            skills : [
                {
                    name : "",
                    progress : 0,
                }
            ],
        
            projects : [
                {
                    title : "",
                    description : "",
                    github : "",
                    liveDemo : "",
                }
            ],
        
            certifications : [
                {
                        title: "" ,
                        issuer : "",
                        year : ""
                }
            ],
        
            languages : [
                {
                    name : "" , 
                    progress : 0,
                }
            ],
        
            interests : [""]
        }

        const newResume = await resumeModel.create({
            userId : req.user._id, // req.user hamare pass protect route se aaa rha hai too usme id hogi hi 
            title : title,
            ...defaultResumeData,

        }
        )

        if(newResume){
            res.status(201).json({
                message : "resume created successfully",
                resume : newResume
            })
        }else{
            res.json({
                message : "resume creation is failed"
            })
        }
        
    } catch (error) {
        res.status(500).json({
            message : "failed to create Resume",
            error : error.message
        })
    }
}

async function getUserResumes(req,res){

    try {
        const resumes= await resumeModel.find({userId : req.user._id}).sort({updatedAt : -1})
        if(resumes.length > 0 ){
            res.status(200).json({
                message : "Resumes retrrived successfully",
                allResumes : resumes
            })
        }else{
            res.json({
                message : "no resume found"
            })
        }
    } catch (error) {
        res.status(500).json({
            message : "failed to create Resume",
            error : error.message
        })
    }

}

async function getResumeById(req , res){
    try {
        const id = req.params.id
        const resume = await resumeModel.findById(id)
        if(resume){
            res.status(200).json({
                message : "resume of a given user",
                userresume : resume
            })
        }

    } catch (error) {
        res.status(500).json({
            message : "failed to create Resume",
            error : error.message
        })
    }

}

async function updateResume(req , res){
    try {
        const id = req.params.id;
        const resume = await resumeModel.findById(id);
        if(!resume){
            return res.status(404).json({
                message : "Resume not found or unauthorized"
            })
        }
        // merge updated from req.body into existing resume 
        Object.assign(resume  , req.body);

        const savedResume = await resume.save();

        res.status(200).json({
            message : "resume updated successfully",
            updatedResume : savedResume
        })


    } catch (error) {
        res.status(500).json({
            message : "failed to create Resume",
            error : error.message
        })
    }

}

async function deleteResume(req , res){
    try {
        const id = req.params.id;

        const resume = await resumeModel.findById(id);
        console.log(id)
        if(!resume){
            return res.status(404).json({
                message : "Resume not found or unauthorised"
            })
        }

        const uploadsFolder =   path.join(__dirname ,'..','uploads')
        const baseUrl = `${req.protocol}://${req.get('host')}`;


        //Delete thumbnailLink and ProfilePreviewUrl images from uploads folder

        if(resume.thumbnaillink){
            const oldthumbnaillink = path.join(uploadsFolder,path.basename(resume.thumbnaillink))
            if(fs.existsSync(oldthumbnaillink)) fs.unlinkSync(oldthumbnaillink);
        }

        if(resume.ProfileInfo?.profilePriviewUrl){
            const oldProfile = path.join(uploadsFolder,path.basename(resume.ProfileInfo.profilePriviewUrl))
            if(fs.existsSync(oldProfile))fs.unlinkSync(oldProfile)

        }
        
        const deletedresume = await resumeModel.findByIdAndDelete(id);
        if(!deletedresume){
            res.status(404).json({
                message : "Resume not found or Unauthorised"
            })
        }
        res.json({
            message : "Resume deleted successfully"
        })
    } catch (error) {
        res.status(500).json({
            message : "failed to create Resume",
            error : error.message
        })
    }

}

module.exports = {createResume , getUserResumes , getResumeById , updateResume , deleteResume}