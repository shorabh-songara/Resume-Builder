import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../../components/Inputs/Input";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
function CreateResume(){
    const [title , setTitle] = useState("");
    const [error , setError] = useState(null);

    const navigate = useNavigate();
    // handle create resume
    const handleCreateResume = async(e)=>{
        e.preventDefault();
        if(!title){
            setError("Please Resume Title");
            return;
        }
        setError("");
        try {

            const response = await axiosInstance.post(API_PATHS.RESUME.CREATE , {
                title,
            });



            if(response.data.resume?._id){
                navigate(`/resume/${response.data.resume?._id}`)
            }
            
        } catch (error) {
            if(error.response && error.response.data.message){
                setError(error.response.data.message);
            }else{
                setError("Something went wrong please try again.")
            }
        }
    }
    return (
        <div className="w-[90vw] md:w-[70vh] p-7 flex flex-col justify-center">
            <h3 className="text-lg font-semibold text-black">
                Create New Resume
            </h3>
            <p className="text-xs text-slate-700 mt-[5px] mb-3">
                Give your resume a title to get started. You can edit all detais later.
            </p>
            <form onSubmit={handleCreateResume}>
                <Input
                value={title}
                onchange={(e) => setTitle(e.target.value)}
                label="Resume Title"
                placeholder="Eg: Android Developer"
                type = "text"/>
                {error && <p className="text-red-500 italic text-xs pb-2.5 pt-1">{error}</p>}
                <button type="submit" className="w-full bg-black items-center justify-center flex rounded-lg text-white font-semibold px-9 py-2 mt-3 hover:bg-gray-800 transition duration-300 cursor-pointer">
                    Create Resume
                </button>
            </form>
        </div>
    )
}
export default CreateResume;