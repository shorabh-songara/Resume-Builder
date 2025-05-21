import React from "react";  

function Model({
    children , 
    isOpen,
    onClose,
    title,
    hideHeader,
    showActionBtn,
    actionBtnIcon = null,
    actionBtnText,
    onActionCLick,
}){
    if(!isOpen) return null;
    return(
        
        <div className="fixed inset-0 z-50 flex justify-center item-center w-full h-full bg-black/40 ">
            {/* model content */}
            <div className={`relative flex flex-col bg-white shadow-lg rounded-lg overflow-hidden`} >

                {/* model header */}
                { !hideHeader && (
                    <div className="flex justify-between p-4 items-center border-b border-gray-200">
                        <h3 className="md:text-lg font-medium text-gray-900">{title}</h3>
                        {showActionBtn && (
                            <button
                            className="btn-small-light mr-12"
                            onClick={()=>onActionCLick()}>
                                {actionBtnIcon}
                                {actionBtnText}

                            </button>
                        )}
                    </div>
                )} 
                 <button
                 type="button"
                 className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 flex justify-center items-center absolute top-3.5 right-3.5 "
                 onClick={onClose}>

                    <svg 
                    className="w-3 h-3"
                    aria-hidden= "true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 14">
                        <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d = "M1 1l6 6m0  0l6 6M7 7l6-6M7 7l-6 6"
                        />
                    </svg>
                    
                 </button>
                 <div children="flex-1 overflow-auto custom-scrollbar">
                    {children}
                 </div>
            </div>
        </div>
    )
}

export default Model;