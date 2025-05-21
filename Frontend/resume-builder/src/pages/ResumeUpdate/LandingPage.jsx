import React, { useContext, useState } from "react";
import landingimg from "/home/shorabh/ResumeBuilder/Frontend/resume-builder/src/assets/landing.png"
import { useNavigate } from "react-router-dom";
import Login from '../Auth/Login'
import SignUp from '../Auth/SignUp'
import Model from "../../components/resumetemplates/Model";
import { UserContext } from "../../context/userContext";
import ProfileInfoCard from "../../components/cards/profileinfocard";
function LandingPage(){
    const {user} = useContext(UserContext);
    const navigate = useNavigate()
    const [openAuthModel , setOpenAuthModel] = useState(false)
    const [currentPage , setCurrentPage] = useState("login")

    const HandleCTA = ()=>{

    }

    return(
        <div className="w-full min-h-full bg-white">
            <div className="container mx-auto px-4 py-4">
                <header className="flex justify-between items-center mb-16">
                    <div className="text-2xl font-bold"> Resume Builder</div>
                    {
                        user ?(
                            <ProfileInfoCard/>
                        ):(
                            <button className="bg-blue-300 rounded-lg px-7 py-2.5 text-black font-semibold hover:bg-gray-600 hover:text-white transition-colors duration-300 cursor-pointer"
                            onClick={()=>{setOpenAuthModel(true)}}>
                                Login/SignUp
                            </button>
                        )
                    }
                </header>   

                <div className="flex flex-col md:flex-row    items-center">
                    <div className="w-full md:w-1/2 pr-4 mb-8 md:mb-0 ">
                        <h1 className="text-5xl font-bold mb-6 leading-tight">
                            Build Your{" "}
                            <span className="text-transparent bg-clip-text bg-[radial-gradient(circle,_#7182ff_0%,_#3cff52_100%)] bg-[length:200%_200%] animate-text-shine">
                            Resume Effortlessly
                            </span>
                        </h1>
                        <p className="text-lg text-gray-600 mb-8">
                            Craft a standout resume in minutes with our smart and intuitive 
                            resume-builder.
                        </p>
                       <button className="bg-black text-sm font-semibold text-white rounded-lg px-8 py-3 hover:bg-gray-600 transition-colors cursor-pointer mb-8"
                       onClick={HandleCTA}>
                        Get started
                       </button>

                    </div>
                    <div className="w-full md:w-1/2">
                        <img
                        src={landingimg}
                        alt="landing image"
                        className="w-full rounded-lg">
                        </img>

                    </div>
                </div>

                <section className="mt-6">
                    <h2 className="text-2xl font-bold text-center mb-12">Feature that make you shine</h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="bg-gray-50 p-6 shadow-sm hover:shadow-md transition rounded-xl">
                            <h3 className="text-lg font-semibold mb-3">
                                Easy Editing
                            </h3>
                            < p className="text-gray-600">
                                Update your resume sections with live preview and instant formatting
                            </p>
                        </div>
                        <div className="bg-gray-50 p-6 shadow-sm hover:shadow-md transition rounded-xl">
                            <h3 className="text-lg font-semibold mb-3">
                                Beautiful Templates
                            </h3>
                            < p className="text-gray-600">
                                Choose from modern , professional templates that are easy to customize.
                            </p>
                        </div>
                        <div className="bg-gray-50 p-6 shadow-sm hover:shadow-md transition rounded-xl">
                            <h3 className="text-lg font-semibold mb-3">
                                One-Click Export
                            </h3>
                            < p className="text-gray-600">
                                Download your resume instantly as a  high quality Pdf with one click.
                            </p>
                        </div>

                    </div>
                </section>

            </div>
            <div className="text-sm bg-gray-200 text-center mt-5 p-5">
                    Made with Happy coding
            </div>

            <Model
            isOpen={openAuthModel}
            onClose={()=>{
                setOpenAuthModel(false)
                setCurrentPage("login")
            }}
            hideHeader
            >
                <div className="min-h-screenmin-h-screen flex items-center justify-center ">
                    {currentPage === "login" && <Login setCurrentPage = {setCurrentPage} />}
                    {currentPage === "signup" && <SignUp setCurrentPage = {setCurrentPage} />}
                </div>
            </Model>

                
        </div>

    )
}
export default LandingPage;