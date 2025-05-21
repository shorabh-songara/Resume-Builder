import React, { useRef, useState } from "react";
import { LuUser , LuUpload , LuTrash} from "react-icons/lu";


function ProfilePhoto({image , setImage , preview , setPreview}){
    const InputRef = useRef(null)
    const [previewurl , setPreviewUrl] = useState(null)

    const handleImageChange=(event)=>{
        const file = event.target.files[0];
        if(file){
            //update the image state
            setImage(file);

            const preview = URL.createObjectURL(file);
            if(setPreview){
                setPreview(preview)
            }
            setPreviewUrl(preview);

        }
    }

    const handleRemoveImage = ()=>{
        setImage(null);
        setPreviewUrl(null);
        if(setPreview){
            setPreview(null);
        }
    }

    const onChooseFile = ()=>{
        InputRef.current.click();
    }

    return(
        <div className="flex justify-center mb-6">
            <input 
            type="file"
            accept="image/*"
            ref={InputRef}
            onChange={handleImageChange}
            className="hidden"/>
            {!image ?(
                <div className="w-20 h-20 flex items-center justify-center bg-purple-50 rounded-full relative cursor-pointer">
                    <LuUser className="text-4xl text-purple-500"/>
                    <button 
                    className="w-8 h-8 flex items-center justify-center bg-linear-to-r from-purple-500/85 to-purple-700 text-white rounded-full absolute -bottom-1 -right-1 cursor-pointer "
                    type="button"
                    onClick={onChooseFile}
                    >
                        <LuUpload/>
                    </button>
                </div>

            ):(
                <div className="relative">
                    <img
                    src={preview||previewurl}
                    alt="Profile Photo"
                    className="w-20 h-20 rounded-full object-cover"/>

                    <button
                    type="button"
                    className="w-8 h-8 flex items-center justify-center bg-linear-to-r from-red-500/85 to-red-700 text-white rounded-full absolute -bottom-1 -right-1 cursor-pointer "
                    onClick={handleRemoveImage}>
                        <LuTrash/>
                    </button>

                </div>
            )}
        </div>
    )
}
export default ProfilePhoto;