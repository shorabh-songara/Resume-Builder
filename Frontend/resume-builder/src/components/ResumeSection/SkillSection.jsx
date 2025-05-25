import React from "react";
import Progress from "../resumetemplates/Progress";

const SkillInfo = ({skill , progress , accentColor , bgColor})=>{
    return(
        <div className="flex items-center justify-between">
            <p className={`text-[12px] font-semibold text-gray-900`}>{skill}</p>
            {progress>0 && (
                <Progress
                progress={(progress/100)*5}
                color={accentColor}
                bgColor={bgColor}/>
            )}

        </div>
    )
}
function SkillSection({skills , accentColor , bgColor}){
    return(
        <div className="grid grid-cols-2 gap-x-5 gap-y-1 mb-5">
            {skills?.map((skill ,index)=>(
                <SkillInfo
                key={`skill_${index}`}
                skill={skill.name}
                progress={skill.progress}
                accentColor={accentColor}
                bgColor={bgColor}
                />
            ))}

        </div>
    )
}
export default SkillSection;