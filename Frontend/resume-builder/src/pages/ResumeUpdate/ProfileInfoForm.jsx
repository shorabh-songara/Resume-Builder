import React from "react";
import ProfilePhoto from "../../components/Inputs/ProfilePhotoSelecter";
import Input from "../../components/Inputs/Input";
function ProfileInfoForm({profileData , updateSection , onNext}){
    return (
        <div className="px-5 py-5">
            <h2 className="text-lg font-semibold text-gray-900 ">
                Personal information
            </h2>
            <div className="mt-4">
                <ProfilePhoto
                image={profileData?.profileImg || profileData?.profilePriviewUrl}
                setImage={(value)=>updateSection("profileImg" , value)}
                preview={profileData?.profilePriviewUrl}
                setPreview={(value)=> updateSection("profilePriviewUrl" , value)}/>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                    value={profileData.fullname || ""}
                    onchange={(e)=>updateSection("fullname" , e.target.value)}
                    label = "Full Name"
                    placeholder="jhon"
                    type= "text"
                    />

                    <Input
                    value={profileData.designation || ""}
                    onchange={(e)=> updateSection("designation", e.target.value)}
                    label="Designation"
                    placeholder="UI Designer"
                    type="text"/>

                    <div className="col-span-2 mt-3">
                        <label className="text-xs font-medium text-slate-600">
                            Summary
                        </label>
                        <textarea
                        placeholder="Short introduction"
                        className="w-full text-black outline-none bg-white border border-slate-100 px-2.5 py-3 rounded-md mt-2 placeholder:text-gray-500 focus:within:border-purple-300"
                        rows={4}
                        value={profileData.summery || "" }
                        onChange={(e) => updateSection("summery" , e.target.value)}/>



                    </div>
                    
                </div>


            </div>
        </div>
    )
}
export default ProfileInfoForm;