import React from "react";
import Input from "../../../components/Inputs/Input";
import { LuPlus , LuTrash2 } from "react-icons/lu";
function EducationInfoForm({educationInfo , updateArrayItems , addArrayItem , removeArrayItem}){
    return(
        <div className="px-5 pt-5" >
            <h2 className="text-lg font-semibold text-gray-900">Education</h2>

            <div className="mt-4 flex flex-col gap-4 mb-3">
            {educationInfo.map((education , index)=>(
                <div className="border border-gray-200/80 p-4 rounded-lg relative"
                key={index}
                >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Input
                        label="Degree"
                        placeholder="B.tech in Computer Science"
                        type="text"
                        value={education.degree|| ""}
                        onchange={(e)=>updateArrayItems(index , "degree" , e.target.value)}/>
                        <Input
                        label="Institution"
                        placeholder="xyz University"
                        type="text"
                        value={education.institution|| ""}
                        onchange={(e)=>updateArrayItems(index , "institution" , e.target.value)}/>
                        <Input
                        label="Start Date"
                        type="month"
                        value={education.startDate|| ""}
                        onchange={(e)=>updateArrayItems(index , "startDate" , e.target.value)}/>
                        <Input
                        label="End Date"
                        type="month"
                        value={education.endDate|| ""}
                        onchange={(e)=>updateArrayItems(index , "endDate" , e.target.value)}/>

                    </div>


                    {educationInfo.length>1 &&(
                        <button
                        className="absolute top-3 right-3 text-sm text-red-600 hover:underline cursor-pointer"
                        type="button"
                        onClick={()=>removeArrayItem(index)}>

                            <LuTrash2
                            className="text-[16-px]"/>
                        </button>
                    )}
                </div>
            ))}

               <button
               className="self-start flex items-center justify-center gap-2 px-4 py-2 rounded bg-purple-100 text-purple-800 text-sm font-medium hover:bg-purple-200 cursor-pointer"
               type="button"
               onClick={()=>{
                addArrayItem({
                    degree:"",
                    institution:"",
                    startDate:"",
                    endDate:""
                })
               }}>

                <LuPlus/>
                Add Education
               </button>

               </div>
        </div>
    )
}

export default EducationInfoForm;