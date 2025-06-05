import React, { useContext, useState } from "react";
import Input from "../../components/Inputs/Input";
import { replace, useNavigate } from "react-router-dom";
import ValidateEmail from "../../utils/helper";
import ProfilePhoto from "../../components/Inputs/ProfilePhotoSelecter";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import { UserContext } from "../../context/userContext";
import uploadImage from "../../utils/uploadImage";
function SignUp({setCurrentPage}){
    const [profilePic , setProfilePic] = useState(null);
    const [fullName , setFullname] = useState("");
    const [email , setEmail] = useState("");
    const [password , setPassword] = useState("");
    const [ConfirmPassword , setConfirmPassword] = useState("");
    const [error , setError] = useState(null)
    const {updateuser} = useContext(UserContext);
    const navigate = useNavigate();
    const handleSignUp = async(e)=>{
        e.preventDefault();
        let profileImageUrl = "";
        if(!fullName){
            setError("Please enter full name")
            return;
        }
        if(!ValidateEmail(email)){
            setError("Please enter email")
            return;
        }
        if(!ValidateEmail(email)){
            setError("Please enter a valid email")
            return;
        }

        if(!password){
            setError("Please enter the password")
            return;
        }
        if(!ConfirmPassword){
            setError("Please enter the Confirm password")
            return;

        }
        if(password != ConfirmPassword){
            setError("Confirm Password is not matching with password ")
            return;
        }
        setError("");
        //Signup api call

        try {
            //upload image if present
            console.log(profilePic)
            if(profilePic){
                const ImgUploadRes = await uploadImage(profilePic);
                profileImageUrl = ImgUploadRes.imageUrl || "";
            }
            console.log("error")
            const response = await axiosInstance.post(API_PATHS.AUTH.REGISTER , {
                name:fullName,
                email,
                password,
                ConfirmPassword,
                profileImageUrl,
            })
            console.log(response);
            const {token} = response.data;
            if(token){
                localStorage.setItem("token" , token);
                updateuser(response.data);
                navigate("/dashboard", {replace:true})
            }
            
        } catch (error) {
            if(error.response && error.response.data.message){
                setError(error.response.data.message);
            }else{
                setError("something went wrong please try again later.")
            }
            
        }
    }


    return (
        <div className="w-[90vw] md:w-[33vw] p-7 flex flex-col justify-center">
            <h3 className="text-lg font-semibold text-black">
                Create an Account
            </h3>
            <p className="text-xs text-slate-700 mt-2 mb-6">
                Join us today by entering your detail below.
            </p>
            <form onSubmit={handleSignUp}>
                <ProfilePhoto image={profilePic} setImage={setProfilePic} />
                <div className="grid grid-cols-1 md:grid-cols-1 gap-2">
                    <Input 
                    value={fullName}
                    onchange={(e) => setFullname(e.target.value)}
                    label="Full Name"
                    placeholder="Full Name"
                    type="text"/>
                    <Input
                    value={email}
                    onchange={(e) => setEmail(e.target.value)}
                    label="Email"
                    placeholder="Email"
                    type="email"/>
                    <Input
                    value={password}
                    onchange={(e) => setPassword(e.target.value)}
                    label="Password"
                    placeholder="password"
                    type="password"/>
                    <Input
                    value={ConfirmPassword}
                    onchange={(e) => setConfirmPassword(e.target.value)}
                    label="Confirm Password"
                    placeholder="Confirm password"
                    type="password"/>

                </div>
                {error && <p className="text-red-500 text-xs pb-2.5">{error}</p>}
                <button type="submit" className="w-full bg-black items-center justify-center flex rounded-lg text-white font-semibold px-9 py-2 mt-3 hover:bg-gray-800 transition duration-300 cursor-pointer">
                    Sign Up
                </button>
                <p className="text-[13px] text-slate-800 mt-3">
                    Already an account?{" "}
                    <button
                    className="font-medium text-purple-500 underline cursor-pointer"
                    onClick={()=>{setCurrentPage("login")}}>
                        login

                    </button>
                </p>

            </form>
        </div>   
    )
}

export default SignUp;