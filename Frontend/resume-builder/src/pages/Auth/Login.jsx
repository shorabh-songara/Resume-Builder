import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Input from '../../components/Inputs/Input';
import ValidateEmail from '../../utils/helper';
import { UserContext } from '../../context/userContext';
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPaths';


function Login({setCurrentPage}){
    const [email , setEmail] = useState("");
    const [password , setPassword] = useState("");
    const [error , setError] = useState(null);

    const {updateuser} = useContext(UserContext)
    const navigate = useNavigate();

    const handleLogin=async(e)=>{
        e.preventDefault();

        console.log("entered email" , email)
        if(!ValidateEmail(email)){
            setError("Please enter a valid email adress.")
            return;
        }

        if(!password){  
            setError("Please enter the password")
            return;
        }
        setError("")


        // Login Api Call
        try {
            const response = await axiosInstance.post(API_PATHS.AUTH.LOGIN , {
                email,
                password
            })
            const {token} = response.data;
            console.log(token)
            if(token){
                localStorage.setItem("token", token)
                console.log(response.data)
                updateuser(response.data);
                navigate("/dashboard") 
            }
        } catch (error) {
            console.log(error)
            if(error.response && error.response.data.message){
                setError(error.response.data.message);

            }else{
                setError("something went wrong please try again.")
            }
        }

    }
    return (
        <div className='w-[90vw] md:w-[33vw] p-7 flex flex-col justify-center'>
            <h3 className='text-lg font-semibold text-black'>Welcome Back</h3>
            <p className='text-xs text-slate-700 mt-[5px] mb-6'>
                Please enter your detail to login.
            </p>
            <form onSubmit={handleLogin}>

                <Input
                value={email}
                onchange={(e)=> setEmail(e.target.value)}
                label="Email Address"
                placeholder="john@gmail.com"
                type="text"/>

                <Input
                value={password}
                onchange={(e)=> setPassword(e.target.value)}
                label="Password"
                placeholder="xxxxxxxxx"
                type="password"/>

                {error && <p className='text-red-600 text-xs pb-2.5 pt-2.5'>{error}</p>}
                <button type='submit' className='w-full  bg-black items-center justify-center flex rounded-lg text-white font-semibold px-9 py-2 mt-3 hover:bg-gray-800 transition duration-300 cursor-pointer'>
                    Login
                </button>
                <p className='text-[13px] text-slate-800 mt-3'>
                    Don't have an account? {" "}
                    <button
                    className='font-medium text-purple-500 underline cursor-pointer'
                    onClick={()=>{
                        setCurrentPage("signup")
                    }}>
                        signup

                    </button>
                </p>
                 
            </form>
        
        </div>
    )
}

export default Login;