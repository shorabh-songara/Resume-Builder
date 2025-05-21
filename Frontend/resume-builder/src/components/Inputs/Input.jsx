import React, { useState } from "react";
import { FaEye  , FaEyeSlash} from "react-icons/fa";

function Input({
    value, 
    onchange,
    placeholder,
    label,
    type
}){
    const [showpassword , setshowpassword] = useState(false);
    const toggelShowPassword = ()=>{
        setshowpassword(!showpassword);
    }
    return (
        <div>
            <label className="text-[13px] text-slate-800">{label}</label>

            <div className="bg-gray-200 py-4 px-3 rounded-lg flex"> 
                <input
                type={type == "password"?(showpassword ? "text" : "password") : type}
                placeholder={placeholder}
                className="w-full bg-transparent outline-none"
                value= {value}
                onChange={(e)=>onchange(e)}/>
                {type === "password" && (
                    <>
                    {showpassword ? (
                        <FaEye
                        size={22}
                        className="text-gray-400 cursor-pointer"
                        onClick={()=> toggelShowPassword()}></FaEye>
                    ):(
                        <FaEyeSlash
                        size={22}
                        className="text-slate-400 cursor-pointer"
                        onClick={()=>toggelShowPassword()}>

                        </FaEyeSlash>
                    )}
                    </>
                )}

            </div>
            
        </div>
    )
}

export default Input;