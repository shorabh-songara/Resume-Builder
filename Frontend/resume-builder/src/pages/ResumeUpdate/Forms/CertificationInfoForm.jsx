import React from "react";
import Input from "../../../components/Inputs/Input";
import { LuPlus, LuTrash2 } from "react-icons/lu";

function CertificationInfoForm({certificationInfo , updateArrayItems , addArrayItem , removeArrayItem}){
    return(
        <div className="px-5 pt-5">

            <h2 className="text-lg font-semibold text-gray-900">Certifications</h2>
            <div className="mt-4 flex flex-col gap-4 mb-3">
                {certificationInfo.map((certificate , index)=>(
                    <div 
                    key={index}
                    className="border border-gray-200/80 p-4 rounded-lg relative">

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <Input 
                            label="Certificate Title"
                            placeholder="Fullstack Web Developer"
                            type="text"
                            value={certificate.title || ""}
                            onchange={(e)=>updateArrayItems(index , "title" , e.target.value)}
                            />
                            <Input 
                            label="Issuer"
                            placeholder="coursera/google/ etc"
                            type="text"
                            value={certificate.issuer || ""}
                            onchange={(e)=>updateArrayItems(index , "issuer" , e.target.value)}
                            />
                            <Input 
                            label="Year"
                            placeholder="2024"
                            type="text"
                            value={certificate.year || ""}
                            onchange={(e)=>updateArrayItems(index , "year" , e.target.value)}
                            />
                        </div>

                        {certificationInfo.length>1 && (
                            <button
                            className="absolute top-3 right-3 text-sm text-red-600 hover:underline cursor-pointer"
                            type="button"
                            onClick={()=>removeArrayItem(index)}>
                                <LuTrash2/>
                            </button>
                        )}


                    </div>
                ))}
                <button
                className="self-start flex items-center gap-2 px-4 py-2 rounded bg-purple-100 text-purple-800 text-sm font-medium hover:bg-purple-200 cursor-pointer "
                type="button"
                onClick={()=>addArrayItem({
                    title:"",
                    issuer:"",
                    year:""
                })}
                >
                    <LuPlus/>
                    Add Certificate


                </button>

            </div>

        </div>
    )
}
export default CertificationInfoForm;