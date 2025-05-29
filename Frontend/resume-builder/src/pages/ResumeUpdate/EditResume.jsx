import React, { useEffect, useRef, useState } from "react";
import {redirectDocument, useNavigate, useParams} from "react-router-dom"
import {LuArrowLeft , LuArrowRight, LuCircleAlert , LuDownload , LuPalette , LuSave , LuTrash2} from "react-icons/lu"
import toast from "react-hot-toast"
import DashBoardLayout from "../../components/Layouts/DashBoardLayout";
import TitleInput from "../../components/Inputs/TitleInput";
import {useReactToPrint} from 'react-to-print'
import axiosInstance from "../../utils/axiosInstance";
import Model from "../../components/resumetemplates/Model";
import { API_PATHS } from "../../utils/apiPaths";
import StepProgress from "../../components/resumetemplates/StepProgress";
import ProfileInfoForm from "./ProfileInfoForm";
import ContactInfoForm from "./ContactInfoForm";
import WorkExperienceForm from "./Forms/WorkExperienceForm";
import EducationInfoForm from "./Forms/EducationInfoForm";
import SkillInfoForm from "./Forms/SkillInfoForm";
import ProjectInfoForm from "./Forms/ProjectInfoForm";
import CertificationInfoForm from "./Forms/CertificationInfoForm";
import AdditionalInfoForm from "./Forms/AdditionalInfoForm";
import RenderResume from "../../components/resumetemplates/RenderResume";
import { captureElementAsImage, dataUrlToFile, fixTailwindColors } from "../../utils/helper";
import ThemeSelector from "./Forms/ThemeSelector";

function EditResume(){
    const {resumeId} = useParams();
    const navigate = useNavigate();

    const resumeRef = useRef(null);
    const resumeDownloadRef = useRef(null);
    const [baseWidth , setBaseWidth] = useState(800);
    const [openThemeSelector , setOpenThemSelector] = useState(false);
    const [openpreviewModel , setOpenPreviewModel] = useState(false);
    const [currentPage , setCurrentPage] = useState("profile-info");
    const [progress , setProgress] = useState(0);
    const [resumeData , setResumeData] = useState({
        title :"",
        thumbnaillink:"",

        ProfileInfo:{
            profilePriviewUrl : "",
            fullname :"",
            designation : "",
            summery : ""
        },
        template:{
            theme : "",
            colorPalette : [""]
        },
        contactInfo:{
            email : "",
            phone : "",
            location : "",
            linkedin : "",
            github : "",
            website : ""
        },
        workExperience : [
            {
                company : "",
                role : "",
                startDate : "",
                endDate : "",
                description : "",
    
            }
        ],
        education : [
            {
                degree : "",
                institution : "",
                startDate : "" , 
                endDate : ""
            }
        ],
    
        skills : [
            {
                name : "",
                progress : 0,
            }
        ],
    
        projects : [
            {
                title : "",
                description : "",
                github : "",
                liveDemo : "",
            }
        ],
    
        certifications : [
            {
                    title: "" ,
                    issuer : "",
                    year : ""
            }
        ],
        languages : [
            {
                name : "" , 
                progress : 0,
            }
        ],
    
        interests : [""]

    })

    const [errorMsg , setErrorMsg] = useState("");
    const [isloading , setIsLoading] = useState(false);

    //validate inputs 
    const validateAndNext = (e)=>{
        const errors = [];
        switch(currentPage){
            case "profile-info":
                const {fullname , designation , summery} = resumeData.ProfileInfo;
                if(!fullname.trim()) errors.push("Full name is required");
                if(!designation.trim()) errors.push("Designation is required");
                if(!summery.trim) errors.push("Summary is required")
                break;
            case "contact-info":
                const {email , phone} = resumeData.contactInfo;
                if(!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))  errors.push("Valid email is required")
                if(!phone.trim() || phone.trim().length !== 10 || !/^\d+$/.test(phone))  errors.push("Valid 10 digti phone number is required")
                break;
            case "work-experience":
                resumeData.workExperience.forEach(({company , role , startDate , endDate}, index)=>{
                    if(!company.trim()) errors.push(`Company is required in experience ${index + 1}`)
                    if(!role.trim()) errors.push(`Role is required in experience ${index + 1}`)
                    if(!startDate.trim() || !endDate.trim()) errors.push(`Start Date and end Date is required in experience ${index + 1}`)
                })
                break;
            case "education-info":
                resumeData.education.forEach(({ degree, institution , startDate , endDate}, index)=>{
                    if(!degree.trim()) errors.push(`Degree is required in education ${index + 1}`)
                    if(!institution.trim()) errors.push(`Role is required in education ${index + 1}`)
                    if(!startDate.trim() || !endDate.trim()) errors.push(`Start Date and end Date is required in education ${index + 1}`)
                })
                break;
            case "skill-info":
                resumeData.skills.forEach(({name , progress} , index)=>{
                    if(!name.trim()) errors.push(`Skill name is required in skill${index + 1}`)
                    if(!name.trim()) errors.push(`Skill progress must be between 1 and 100 in skill${index + 1}`)
                })
                break;
            case "project-info":
                resumeData.projects.forEach(({title , description} , index)=>{
                    if(!title.trim()) errors.push(`Project title is required in project${index + 1}`)
                    if(!description.trim()) errors.push(`Project description is required in Project${index + 1}`)
                })
                break;
            case "certification-info":
                resumeData.certifications.forEach(({title , issuer} , index)=>{
                    if(!title.trim()){
                        errors.push(`Certification title is required in certification ${index + 1}`)
                    }

                    if(!issuer.trim())   errors.push(`Certification issuer is required in certification ${index + 1}`)
                    
                })
                break;

            case "additional-info":
                if(resumeData.languages.length === 0 || !resumeData.languages[0].name?.trim()){
                    errors.push("at least one language is rquired")
                }
                if(resumeData.interests.length === 0 || !resumeData.interests[0].name?.trim()){
                    errors.push("at least one interest is rquired")
                }
                break;
            default:
                break;
        }
        if(errors.length>0){
             setErrorMsg(errors.join(","));
             return;
        }
        setErrorMsg("");
        goToNextStep();
        

    }

    //function navigate to the next page;
    const goToNextStep = ()=>{

        const pages = [
            "profile-info",
            "contact-info",
            "work-experience",
            "education-info",
            "skill-info",
            "project-info",
            "certification-info",
            "additional-info"
        ]
        if(currentPage === "additional-info") setOpenPreviewModel(true);
        const currentIndex = pages.indexOf(currentPage); 
        if(currentIndex !== -1 && currentIndex < pages.length - 1){
            const nextIndex = currentIndex + 1;
            setCurrentPage(pages[nextIndex]);

            //set progress bar as percentage
            const percent =  Math.round((nextIndex/(pages.length-1))*100);
            setProgress(percent)
            window.scrollTo({top:0 , behavior:"smooth"})
        }

    }
    //function that navigate to the previous page
    const goBack =()=>{
        const pages = [
            "profile-info",
            "contact-info",
            "work-experience",
            "education-info",
            "skill-info",
            "project-info",
            "certification-info",
            "additional-info"
        ]
        if(currentPage === "profile-info") navigate("/dashboard") 
        const currentIndex = pages.indexOf(currentPage)
        if(currentIndex>0){
            const prevIndex = currentIndex - 1;
            setCurrentPage(pages[prevIndex]);

            //Update progress
            const percent = Math.round((prevIndex/(pages.length -1 ))* 100);
            setProgress(percent)
            window.scrollTo({top:0 , behavior:"smooth"})
        }
    }

    const renderForm = ()=>{
        switch(currentPage){
            case "profile-info":
                return(
                    <ProfileInfoForm
                    profileData = {resumeData?.ProfileInfo}
                    updateSection = {
                        (key , value)=>{
                            updateSection("ProfileInfo" , key , value);
                        }
                    }
                    onNext = {validateAndNext}
                    />
                );
            case "contact-info":
                return(<ContactInfoForm
                contactInfo = {resumeData?.contactInfo}
                updateSection={(key , value)=>{
                    updateSection("contactInfo",key, value)
                }}/>)

            case "work-experience":
                return(
                    <WorkExperienceForm
                    workExperience={resumeData?.workExperience}
                    updateArrayItems ={(index , key , value)=>{
                        updateArrayItems("workExperience" , index , key , value)
                    }}
                    addArrayItem = {(newItem)=>addArrayItem("workExperience" , newItem)}
                    removeArrayItem={(index)=>{
                        removeArrayItem("workExperience" , index);
                    }}/>
                )
            case "education-info":
                return(
                    <EducationInfoForm
                      educationInfo = {resumeData?.education}
                      updateArrayItems= {(index , key , value)=>{
                        updateArrayItems("education" , index , key , value)
                      }}
                      addArrayItem={(newItem)=>addArrayItem("education" , newItem)}
                      removeArrayItem = {(index)=>{
                        removeArrayItem("education" , index)
                      }}
                    />
                )

            case "skill-info":
                return(
                    <SkillInfoForm
                    skillInfo = {resumeData?.skills}
                    updateArrayItems= {(index , key , value)=>{
                        updateArrayItems("skills" , index , key , value)
                      }}
                      addArrayItem={(newItem)=>addArrayItem("skills" , newItem)}
                      removeArrayItem = {(index)=>{
                        removeArrayItem("skills" , index)
                      }}
                    />
                )
            case "project-info":
                return (
                    <ProjectInfoForm
                    projectInfo = {resumeData?.projects}
                    updateArrayItems = {(index , key , value)=>{
                        updateArrayItems("projects" , index , key , value);
                    
                    }}
                    addArrayItem={(newItem)=>addArrayItem("projects" , newItem)}
                    removeArrayItem = {(index)=>{
                        removeArrayItem("projects" , index)
                    }}

                    />
                )
            case "certification-info":
                return(
                    <CertificationInfoForm
                    certificationInfo = {resumeData?.certifications}
                    updateArrayItems = {(index , key , value)=>{
                        updateArrayItems("certifications" , index , key , value);
                    
                    }}
                    addArrayItem={(newItem)=>addArrayItem("certifications" , newItem)}
                    removeArrayItem = {(index)=>{
                        removeArrayItem("certifications",index)
                    }}
                    />
                )
            case "additional-info":
                return(
                    <AdditionalInfoForm
                    languagesInfo = {resumeData?.languages}
                    interestInfo = {resumeData?.interests}
                    updateArrayItems={(section , index , key , value) => updateArrayItems(section , index , key , value)}
                    addArrayItem = {(section , newItem) =>addArrayItem(section , newItem)}
                    removeArrayItem = {(section , index)=>removeArrayItem(section , index)}
                    />
                )
            default:
                return null
        }

    }

    //updlate simple nested object (like profileinfo , contact info .etc)
    const updateSection = (section , key , value)=>{
        setResumeData((prev)=>({
            ...prev,
            [section]:{
                ...prev[section],
                [key]:value,
            }
        }))

    }

    const updateArrayItems = (section , index , key , value)=>{

        setResumeData((prev)=>{
            const updatedArray = [...prev[section]]
            if(key === null){
                updatedArray[index] = value;
            }else{
                updatedArray[index] = {
                    ...updatedArray[index],
                    [key]:value
                }
            }
            return {
                ...prev,
                [section] : updatedArray
            }
        })

    }

    const addArrayItem = (section , newItem )=>{
        setResumeData((prev)=>({
            ...prev,
            [section]:[...prev[section] , newItem]
        }))
    }

    const removeArrayItem = (section , index) =>{
        setResumeData((prev)=>{
            const updateArray = [...prev[section]];
            updateArray.splice(index , 1);
            return {
                ...prev,
                [section] : updateArray
            }
        })


    }

    //fetch resume info from id
    const fetchResumeDetailsById = async()=>{
        try {
            console.log("error")
            const response = await axiosInstance.get(API_PATHS.RESUME.GET_BY_ID(resumeId));
            console.log(response)
            if(response.data && response.data.resume.ProfileInfo){
                const resumeInfo = response.data.resume;
                setResumeData((prevState)=>({
                    ...prevState,
                    title : resumeInfo?.title || "untitled",
                    template : resumeInfo?.template|| prevState?.template,
                    ProfileInfo : resumeInfo?.ProfileInfo || prevState?.ProfileInfo,
                    contactInfo : resumeInfo?.contactInfo || prevState?.contactInfo,
                    workExperience : resumeInfo?.workExperience ||prevState?.workExperience,
                    education : resumeInfo?.education || prevState?.education,
                    skills : resumeInfo?.skills || prevState.skills,
                    projects : resumeInfo?.projects || prevState.projects,
                    certifications : resumeInfo?.certifications || prevState.certifications,
                    languages : resumeInfo?.languages || prevState?.languages,
                    interests : resumeInfo?.interests || prevState?.interests
                }))
            }

        } catch (error) {

            console.log("error fetching resume" , error);
            
        }

    }

    // upload thumbnaillink and resume profile Image;
    const uploadResumeImages= async()=>{
        try {
            setIsLoading(true);
            fixTailwindColors(resumeRef.current);
            const imageDataurl = await captureElementAsImage(resumeRef.current);
            //convert base64 to file
            const thumbnailFile = dataUrlToFile(
                imageDataurl,
                ` resume-${resumeId}.png`
            );

            const ProfileImageFile = resumeData?.ProfileInfo?.profileImage || null;
            const formData = new FormData();
            if(ProfileImageFile) formData.append("profileImage", ProfileImageFile);
            if(thumbnailFile) formData.append("thumbnail" , thumbnailFile);

            const uploadResponse = await axiosInstance.put(
                API_PATHS.RESUME.UPLOAD_IMAGE(resumeId),
                formData,
                {headers : {"Content-Type" : "multipart/form-data"}}
                
            )
            const {thumbnaillink , profilePriviewUrl } = uploadResponse.data;
            console.log("RESUME_DATA__" , resumeData)

            await updateResumeDetails(thumbnaillink , profilePriviewUrl);
            toast.success("Resume Update Successfully!");
            navigate("/dashboard")

            
        } catch (error) {
            console.error("Error uploading images" , error);
            toast.error("Failed to upload image")
        }finally{
            setIsLoading(false);
        }
    }

    const updateResumeDetails =async(thumbnaillink , profilePriviewUrl)=>{
        try {
            setIsLoading(true);
            const response = await axiosInstance.put(
                API_PATHS.RESUME.UPDATE(resumeId),
                {
                    ...resumeData,
                    thumbnaillink : thumbnaillink || "",
                    ProfileInfo : {
                        ...resumeData.ProfileInfo,
                        profilePriviewUrl : profilePriviewUrl || ""
                    }
                },
            )
            console.log(response)
        } catch (error) {
            console.error("Error Capturing image" , error)
        } finally{
            setIsLoading(false)
        }
    }

    //deleter resume
    const handleDeleteResume = async ()=>{

    }

    //download resume;
    const downloadResume = useReactToPrint({
        contentRef : resumeRef,
        // documentTitle: resumeData?.title || "resume",
        // onAfterPrint: () => console.log("Resume printed successfully"),
        // onPrintError: (error) => console.error("Print error:", error),
      });

    
      
    //function to update base width based on the resume container size
    const updateBaseWidth = ()=>{
        if(resumeRef.current){
            setBaseWidth(resumeRef.current.offsetWidth);
        }
    }

    useEffect(()=>{
        updateBaseWidth();
        window.addEventListener("resize" , updateBaseWidth);
        console.log(resumeId)
        if(resumeId){
            fetchResumeDetailsById();
        }
        
        return ()=>{
            window.removeEventListener("resize" , updateBaseWidth);
        }
    },[])

    useEffect(() => {
        if (openpreviewModel) {
          const timeout = setTimeout(() => {
            if (resumeRef.current) {
              console.log("Resume preview is ready");
            } else {
              console.warn("Resume content is not ready");
            }
          }, 300);
          return () => clearTimeout(timeout);
        }
      }, [openpreviewModel]);

      const handleDownloadResume = () => {
        if (!resumeRef.current) {
          console.warn("Nothing to print yet!");
          return;
        }
    
        requestAnimationFrame(() => {
          setTimeout(() => {
            if (resumeRef.current) {
              downloadResume();
            } else {
              console.warn("Still nothing to print...");
            }
          }, 100);
        });
      };
    return (
        <DashBoardLayout> 
            <div className="container mx-auto" >
                <div className="flex items-center justify-between gap-5 bg-white border border-purple-100 rounded-lg py-3 px-4 mb-4 ">
                    <TitleInput
                    title = {resumeData.title}
                    setTitle = {
                        (value)=>setResumeData((prevState)=>({
                            ...prevState,
                            title : value
                        }))
                    }/>

                <div className="flex items-center gap-4">
                {/* Change Theme Button */}
                <button 
                    className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-gray-100 hover:bg-gray-200 text-sm transition"
                    onClick={() => setOpenThemSelector(true)}
                >
                    <LuPalette className="text-[16px]" />
                    <span className="hidden md:block">Change Theme</span>
                </button>

                {/* Delete Button */}
                <button
                    className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-red-100 hover:bg-red-200 text-sm text-red-700 transition"
                    onClick={handleDeleteResume}
                >
                    <LuTrash2 className="text-[16px]"  />
                    <span className="hidden md:block">Delete</span>
                </button>

                {/* Preview & Download Button */}
                <button
                    className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-blue-100 hover:bg-blue-200 text-sm text-blue-700 transition"
                    onClick={() => setOpenPreviewModel(true)}
                >
                    <LuDownload className="text-[16px]" />
                    <span className="hidden md:block">Preview & Download</span>
                </button>
                </div>


    
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="bg-white rounded-lg border border-purple-100 overflow-hidden">

                        <StepProgress progress = {progress}/>
                        {renderForm()}
                        <div className="mx-5">
                            {errorMsg && (
                                <div className="flex items-center gap-2 text-[11px] font-medium text-amber-600 bg-amber-100 px-2 py-0.5 my-1 rounded">
                                    <LuCircleAlert className="text-md"/>{errorMsg}</div>
                            )}
                            <div className="flex items-end justify-end gap-3 mt-3 mb-5">
                                <button className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-purple-100 hover:bg-gray-200 text-sm transition"
                                disabled={isloading}
                                onClick={goBack}>

                                    <LuArrowLeft className="text-[16px]"/>
                                    Back

                                </button>

                                <button
                                className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-purple-100 hover:bg-gray-200 text-sm transition"
                                onClick={uploadResumeImages}
                                disabled={isloading}>
                                    <LuSave className="text-[16px]"/>
                                    {isloading? "updating..." : "Save & Exit"}
                                </button>

                                <button
                                className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-purple-100 hover:bg-gray-200 text-sm transition"
                                onClick={validateAndNext}
                                disabled={isloading}>
                                    {currentPage === "additional-info" && (
                                        <LuDownload className="text-[16px]"/>
                                    )} 

                                    {currentPage === "additional-info"?"Preview & Download" : "Next"}
                                    {currentPage !== "additional-info" &&(
                                        <LuArrowRight className="text-[16px]"/>
                                    )}

                                </button>
                            </div>
                    
                        </div>
                    </div>
                    <div ref={resumeRef} className="h-[100vh]">
                        {/* {resumme Template} */}
 
                        <RenderResume
                        templateId = {resumeData?.template?.theme || ""}
                        resumeData = {resumeData}
                        colorPalette = {resumeData?.template?.colorPalette || []}
                        containerWidth = {baseWidth}
                        
                        />
                    </div>
                </div>
            </div>
            <Model
            isOpen={openThemeSelector}
            onClose={()=>setOpenThemSelector(false)}
            title="Change Theme"
            >
                <div className="w-[65vw] h-[80vh] overflow-y-auto">
                    <ThemeSelector
                    selectedTheme = {resumeData?.template}
                    setSelectedTheme = {(value)=>{
                        setResumeData((prevState)=>({
                            ...prevState,
                            template : value || prevState.template
                        }))
                    }}
                    resumeData = {resumeData}
                    onClose = {() => setOpenThemSelector(false)}
                    />
                </div>
            </Model>

                <Model
                isOpen={openpreviewModel}
                onClose={()=>setOpenPreviewModel(false)}
                title={resumeData.title}
                showActionBtn
                actionBtnText="Download"
                actionBtnIcon={<LuDownload className="text-[16px]"/>}
                onActionCLick={handleDownloadResume} 
                >
                    <div ref={resumeRef}>
                        <RenderResume
                        templateId={resumeData?.template?.theme || ""}
                        resumeData={resumeData}
                        colorPalette={resumeData?.template?.colorPalette || []}/>
                    </div>



                </Model>

        </DashBoardLayout>    
    )

}
export default EditResume;