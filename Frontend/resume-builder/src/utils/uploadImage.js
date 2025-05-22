import { API_PATHS } from "./apiPaths";
import axiosInstance from "./axiosInstance";

async function uploadImage(imageFile){
    const formData = new FormData()
    formData.append('image' , imageFile);
    try {
        const response = await axiosInstance.post (API_PATHS.IMAGE.UPLOAD_IMAGE , formData , {
            headers:{
                'Content-Type':"multipart/form-data",
            }
        })
        return response.data;
    } catch (error) {
        console.log("error uploading image " , error)
        throw error;
        
    }
}
export default uploadImage;