import React from "react";
import ProfileInfoCard from "../cards/profileinfocard";
import { Link } from "react-router-dom";


function Navbar(){
    return (
        <div className="h-16  bg-white   border bordre-b border-gray-200/50 backdrop-blur-[2px] py-2.5 px-4 md:px-0 sticky top-0 z-30">
            <div className="container flex items-center mx-auto justify-between gap-5">

            <Link to='/dashboard'>
            <h2 className="text-lg md:text-xl font-medium text-black leading-5">
                Resume Builder
            </h2>
            </Link>
            <ProfileInfoCard/>
            </div>
        </div>
    )
}

export default Navbar;