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
            <div className="flex items-center gap-3">
            {/* Profile Image */}
            <img
              src={user.profileImageUrl || "https://via.placeholder.com/150"}
              alt="Profile"
              className="w-10 h-10 rounded-full object-cover"
            />
    
            {/* Name and Logout */}
            <div className="flex flex-col">
              <span className="text-sm font-semibold text-gray-800">
                {user.name || "User"}
              </span>
              <button
                onClick={handleLogout}
                className="text-xs text-purple-500 font-medium hover:underline"
              >
                Logout
              </button>
            </div>
          </div>
    
    )
)
}

export default ProfileInfoCard;