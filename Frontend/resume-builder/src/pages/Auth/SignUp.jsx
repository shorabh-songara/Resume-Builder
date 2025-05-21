import React, { useState } from "react";
import Input from "../../components/Inputs/Input";
import { useNavigate } from "react-router-dom";
import ValidateEmail from "../../utils/helper";
import ProfilePhoto from "../../components/Inputs/ProfilePhotoSelecter";
function SignUp({setCurrentPage}){
    const [profilePic , setProfilePic] = useState(null);
    const [fullName , setFullname] = useState("");
    const [email , setEmail] = useState("");
    const [password , setPassword] = useState("");
    const [ConfirmPassword , setConfirmPassword] = useState("");
    const [error , setError] = useState(null)

    const handleSignUp = async(e)=>{
        e.preventDefault();
        let profileImageUrl = "";
        if(!fullName){
            setError("Please enter full name")
            return;
        }
        if(!email){
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
            
        } catch (error) {
            
        }
    }

    const Navigate = useNavigate();

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