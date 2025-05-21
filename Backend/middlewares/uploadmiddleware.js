const multer = require('multer')


const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null , 'uploads/')
    },
    filename : (req,file ,cb)=>{
        cb(null , `${Date.now()}-${file.originalname}`)
    }
})

// filefilter

const filefilter = (req, file , cb )=>{
    const allowedType = ["image/jpeg", "image/png" , "image/jpg"];
    if(allowedType.includes(file.mimetype)){
        cb(null,true)
    }else{
        cb(new Error('Only .jpeg .jpg and .png formates are allowed ') , false);
    }
}

const upload = multer({
    storage ,
    filefilter
})

module.exports = upload