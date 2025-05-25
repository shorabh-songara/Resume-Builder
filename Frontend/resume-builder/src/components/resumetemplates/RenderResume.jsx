import React from "react";
import { FaExpand } from "react-icons/fa";
import TemplateOne from "./TemplateOne";

function RenderResume({templateId,resumeData,colorPalette,containerWidth}){
    switch(templateId){
        case "01":
            return(
                <TemplateOne
                resumeData = {resumeData}
                colorPalette={colorPalette}
                containerWidth={containerWidth}
                />
            );
        default:
            return(
                <TemplateOne
                resumeData = {resumeData}
                colorPalette={colorPalette}
                containerWidth={containerWidth}
                />
            )
    }
}

export default RenderResume;