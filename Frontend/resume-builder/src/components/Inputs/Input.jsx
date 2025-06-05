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
        <div className="flex flex-col gap-1 w-full">
        <label className="text-sm font-medium text-slate-700 mb-1">{label}</label>
      
        <div className="relative">
          <input
            type={type === "password" ? (showpassword ? "text" : "password") : type}
            placeholder={placeholder}
            className="w-full bg-gray-100 text-sm text-slate-800 rounded-md px-4 py-2 pr-10 outline-none focus:ring-2 focus:ring-purple-300 transition-all"
            value={value}
            onChange={(e) => onchange(e)}
          />
      
          {type === "password" && (
            <span
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 cursor-pointer"
              onClick={toggelShowPassword}
            >
              {showpassword ? <FaEye size={18} /> : <FaEyeSlash size={18} />}
            </span>
          )}
        </div>
      </div>
      
    )
}

export default Input;