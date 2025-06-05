import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import DashBoardLayout from "../../components/Layouts/DashBoardLayout";
import { LuCircle, LuCirclePlus } from "react-icons/lu"; 
import moment from 'moment'
import ResumeSummaryCard from "../../components/cards/ResumeSummaryCard";
import CreateResume from "./CreateResumeForm";
import Model from "../../components/resumetemplates/Model";
function DashBoard(){
    const [openCreateModel , setOpenCreateModel] = useState(false);
    const [allResumes , setAllResumes] = useState([]);
    const navigate = useNavigate();

    const fetchAllResumes = async()=>{
        try {
            const response = await axiosInstance.get(API_PATHS.RESUME.GET_ALL_RESUME);
            setAllResumes(response.data.allResumes)
        } catch (error) {
            console.error("error  fetching resumes" , error );
        }
    }
    
    useEffect (()=>{
        fetchAllResumes()
    },[])
    return (
        <DashBoardLayout> 
            <div className="grid gird-cols-1 md:grid-cols-5 gap-4 md:gap-7 pt-1 pb-6 px-4 md:px-0">
                <div
                className="h-[300px] flex flex-col gap-5 items-center justify-center bg-white rounded-lg border border-purple-100 hover:border-purple-300 hover:bg-purple-50/5 cursor-pointer"
                onClick={()=>setOpenCreateModel(true)}
                >
                    <div className="w-12 h-12 flex items-center justify-center bg-purple-200/60  rounded-2xl">
                    <LuCirclePlus className="text-xl text-purple-500"/>
                    </div>
                    <h3 className="font-medium text-gray-800 "> Add New Resume</h3>
                </div>
                {allResumes.length > 0 ? (
          allResumes.map((resume) => (
            <ResumeSummaryCard
              key={resume._id}
              imgUrl={resume.thumbnaillink || null}
              title={resume.title || "Untitled"}
              lastUpdated={
                resume.UpdatedAt
                  ? moment(resume.UpdatedAt).format("DD MMM YYYY")
                  : ""
              }
                    onSelect={() => navigate(`/resume/${resume._id}`)}
                  />
                ))
              ) : (
                <p className="text-gray-500 col-span-full text-center mt-4">
                  No resumes found.
                </p>
              )}
            </div>

            <Model
            isOpen = {openCreateModel}
            onClose = {()=>{
              setOpenCreateModel(false)
            }}
            // hideHeader
            >
              <div>
                <CreateResume/>
              </div>

            </Model>
        </DashBoardLayout>
    )
}

export default DashBoard;
