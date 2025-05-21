import React, { useContext } from "react";
import { UserContext } from "../../context/userContext";
import { useNavigate } from "react-router-dom";

function ProfileInfoCard(){
    const {user , clearuser} = useContext(UserContext);
    const navigate = useNavigate();

    const handleLogout=()=>{
        localStorage.clear();
        clearuser();
        navigate('/');
    }


    return(
        user&&(
        <div className="flex items-center">
            <img src={user.profileImageUrl || "https://via.placeholder.com/150"} alt="Profile Image"  className="w-11 h-11 bg-gray-300 rounded-full mr-3"/>
            <div className="text-[15px] font-bold leading-3">{ user.name || "user"}</div>
            <button
            className="text-purple-500  text-sm font-semibold cursor-pointer hover:underline"
            onClick={handleLogout}>
                Logout
            </button>
        </div>
    
    )
)
}

export default ProfileInfoCard;