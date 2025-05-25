import React from "react";
import Input from "../../../components/Inputs/Input";
import RatingInput from "../../../components/ResumeSection/RatingInput";
import { LuPlus, LuTrash2 } from "react-icons/lu";

function AdditionalInfoForm({
    languagesInfo,
    interestInfo,
    updateArrayItems,
    addArrayItem,
    removeArrayItem
}){
    return(
        <div className="px-5 pt-5">
            <h2 className="text-lg font-semibold text-gray-900">addition info</h2>
            {/* {language selection} */}
            <div className="mt-6">
                <h3 className="text-sm font-semibold text-gray-700 mb-2">Languages</h3>
                <div className="flex flex-col gap-4">
                    {languagesInfo.map((lang , index)=>(
                        <div 
                        key={index}
                        className="border border-gray-200/80 p-4 rounded-lg relative ">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
                                <Input
                                label="Language"
                                placeholder="e.g. English"
                                value={lang.name || ""}
                                onchange={(e)=>updateArrayItems("languages" , index , "name" , e.target.value)}/>
                                <div className="">
                                    <label className="text-xs font-medium text-slate-600 mb-7 block">
                                        Proficiency
                                    </label>
                                    <RatingInput
                                    value={lang.progress || 0}
                                    total={5}
                                    onchange={(value)=>updateArrayItems("languages" , index , "progress" , value)}
                                    activeColor = "#0ea5e9"
                                    inactiveColor="#e0f2fe"/>
                                </div>
                            </div>

                            {languagesInfo.length>1 && (
                                <button
                                className="absolute top-3 right-3 text-sm text-red-600 hover:underline cursor-pointer"
                                onClick={()=> removeArrayItem("languages" , index)}
                                type="button">
                                    <LuTrash2/>

                                </button>
                            )}
                        </div>
                    ))}

                    <button
                    className="self-start flex items-center gap-2 px-4 py-2 rounded bg-purple-100 text-purple-800 text-sm font-medium hover:bg-purple-200 cursor-pointer"
                    type="button"
                    onClick={()=>{
                        addArrayItem("languages",{
                            name:"",
                            progress:0
                        })
                    }}>
                        <LuPlus/>
                        Add Language
                    </button>
                </div>
            </div>

            {console.log(interestInfo)}
            {/* {interest section } */}
            <div className="mt-8 mb-4">
                <h3 className="text-sm font-semibold text-gray-9000">Interests</h3>

                <div className="flex flex-col"
                >
                    {interestInfo.map((interest , index)=>(
                        <div 
                        key={index}
                        className="relative rounded-lg"
                        >
                            <Input
                            placeholder="e.g.Reading"
                            value={interest || ""}
                            onchange={(e)=>updateArrayItems("interests" , index, null , e.target.value)}
                            />

                            {interestInfo.length>1 && (
                                <button 
                                type="button"
                                className="absolute items-center top-6.5 right-3 text-sm text-red-600 hover:underline"
                                onClick={()=>removeArrayItem("interests" , index)}>
                                    <LuTrash2/>

                                </button>
                            )}

                        </div>
                    ))}

                    <button 
                    className="self-start flex items-center mt-4 gap-2 px-4 py-2 rounded bg-purple-100 text-purple-800 text-sm font-medium hover:bg-purple-200 cursor-pointer"
                    type="button" 
                    onClick={()=> addArrayItem("interests" , "")}
                    >
                        <LuPlus/>
                        Add Interest
                    </button>
                </div>
            </div>
        </div>
    )
}
export default AdditionalInfoForm;