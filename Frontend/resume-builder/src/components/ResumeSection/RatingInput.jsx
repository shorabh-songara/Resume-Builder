import React from "react";

function RatingInput({
    value=0 ,
    total = 5 , 
    onchange=()=>{},
    color = "#9125E6",
    bgColor = "#E9D4FF"
}){
    const displayvalue = Math.round((value/100)*total);

    const handleClick = (index)=>{
        const newValue = Math.round(((index+1)/total)*100)
        onchange(newValue);
    }
    return(
        <div className="flex gap-3 cursor-pointer ">
            {[...Array(total)].map((_ , index)=>{
                const isActive = index< displayvalue;
                return(
                    <div
                    key={index}
                    onClick={()=>handleClick(index)}
                    className="w-4 h-4 rounded transition-all"
                    style={{backgroundColor:isActive ? color : bgColor}}
                    >
                    </div>   
                )
            })}
        </div>
    )
}
export default RatingInput;