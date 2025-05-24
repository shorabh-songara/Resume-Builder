import React from "react";
import Input from "../../../components/Inputs/Input";
import { LuPlus, LuTrash2 } from "react-icons/lu";

function ProjectInfoForm({projectInfo,updateArrayItems , addArrayItem , removeArrayItem}){
    return(
        <div className="px-5 pt-5">
            <h2 className="text-lg font-semibold text-gray-900">Projects</h2>
            <div className="mt-4 flex flex-col gap-4 mb-3">
                {projectInfo.map((project , index)=>(
                    <div
                    key={index}
                    className="border border-gray-200/80 p-4 rounded-lg relative">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="col-span-2">
                                <Input
                                label="Project Title"
                                placeholder="Portfolio Website"
                                type = "text"
                                onchange={(e)=>updateArrayItems(index , "title" , e.target.value)}
                                />
                            </div>
                            <div className="col-span-2">
                                <label className="text-xs font-medium text-slate-600 ">
                                    Description
                                </label>
                                <textarea
                                placeholder="Short description about the project"
                                className="w-full mt-1 text-black outline-none bg-white border border-slate-100 px-2.5 py-3 rounded-md mt-2 placeholder:text-gray-500 focus:border-purple-300"
                                rows={3}
                                value={project.description || ""}
                                onChange={
                                    (e)=>updateArrayItems(index , "description" , e.target.value)
                                }/>
                            </div>

                            <Input
                            label="GitHub Link"
                            placeholder="https://github.com/username/project"
                            type="url"
                            value={project.github || ""}
                            onchange={(e)=>updateArrayItems(index , "github" , e.target.value)}/>
                            <Input
                            label="Live Demo Link"
                            placeholder="https://yourproject.live/"
                            type="url"
                            value={project.liveDemo || ""}
                            onchange={(e)=>updateArrayItems(index , "liveDemo" , e.target.value)}/>
                        </div>

                        {projectInfo.length>1 && (
                            <button
                            type="button"
                            className="absolute top-3 right-3 text-sm text-red-600 hover:underline cursor-pointer"
                            onClick={()=>removeArrayItem("projects",index)}>
                                <LuTrash2/>

                            </button>
                        )}

                    </div>
                ))}

                <button
                className="self-start flex items-center gap-2 px-4 py-2 rounded bg-purple-100 text-purple-800 text-sm font-medium hover:bg-purple-200 cursor-pointer"
                type="button"
                onClick={()=> addArrayItem({
                    title: "",
                    description: "",
                    github: "",
                    liveDemo: "",
                })}>

                    <LuPlus/>
                    Add Project

                </button>
            </div>

        </div>
    )
}

export default ProjectInfoForm;