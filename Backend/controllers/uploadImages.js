const fs = require("node:fs")
const path = require("node:path")
const resumeModel = require("../models/Resume")
const upload = require("../middlewares/uploadmiddleware")

async function uploadResumeImages(req, res){
    try {

        upload.fields([{name : 'thumbnail'} , {name : 'profileImage'}])(req,res,async(err)=>{
            if(err) {
                return res.status(400).json({
                    message :"File upload failed" , error : err.message
                })
            }
        })
        const id = req.params.id
        const resume = await resumeModel.findById(id);
        if(!resume){
            return res.status(404).json({
                message : "Resume not found or unauthorized"
            });
        }

        const uploadFolder = path.join(__dirname, '..' , 'uploads')
        const baseUrl = `${req.protocol}://${req.get('host')}`;
        const newThumbnail = req.files.thumbnail?.[0];
        const newProfileImage = req.files.profileImage?.[0];

        if(newThumbnail){
            if(resume.thumbnaillink){
                const oldthumbnaillink = path.join(uploadFolder , path.basename(resume.thumbnaillink));
                if(fs.existsSync(oldthumbnaillink)) fs.unlinkSync(oldthumbnaillink)
            }
            resume.thumbnaillink = `${baseUrl}/uploads/${newThumbnail.filename}`;
        }

        if(newProfileImage){
            if(resume.ProfileInfo?.profilePriviewUrl){
                const oldProfile = path.join(uploadFolder,path.basename(resume.ProfileInfo.profilePriviewUrl))
                if(fs.existsSync(oldProfile))fs.unlinkSync(oldProfile)
    
            }          
            resume.ProfileInfo.profilePriviewUrl = `${baseUrl}/uploads/${newProfileImage.filename}`
        }

        await resume.save()
        res.status(200).json({
            message : "Image uploaded successfully",
            thumbnaillink : resume.thumbnaillink,
            profilePriviewUrl : resume.ProfileInfo.profilePriviewUrl
        })
    }catch(error){
        res.status(500).json({
            message : "error uploading images ",
            error : error.message
        })
    }
}

module.exports = uploadResumeImages;