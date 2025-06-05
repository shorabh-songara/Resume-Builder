import React from "react";
import Input from "../../components/Inputs/Input";

function ContactInfoForm({contactInfo , updateSection}){
    return(
        <div className="px-5 pt-5">
            <h2 className="text-lg font-semibold text-gray-900 ">
                Contact Information
            </h2>
            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="col-span-2">
                    <Input
                    label="Address"
                    placeholder="Short Address"
                    type="text"
                    value={contactInfo.location || ""}
                    onchange={(e)=>updateSection("location" , e.target.value)}/>
                </div>
                <Input
                label="Email"
                placeholder="jhon@gmail.com"
                type = "email"
                value={contactInfo.email || ""}
                onchange={(e)=>updateSection("email" , e.target.value)}/>
                <Input
                label="Phone Number"
                placeholder="0000000000"
                type = "number"
                value={contactInfo.phone || ""}
                onchange={(e)=>updateSection("phone" , e.target.value)}/>
                <Input
                label="LinkedIn"
                placeholder="https://linkedin.com/in/username"
                type = "text"
                value={contactInfo.linkedin || ""}
                onchange={(e)=>updateSection("linkedin" , e.target.value)}/>
                <Input
                label="GitHub"
                placeholder="https://github.com/username"
                type = "text"
                value={contactInfo.github || ""}
                onchange={(e)=>updateSection("github" , e.target.value)}/>
                <div className="md:col-span-2">
                <Input
                label="portfolio / Website"
                placeholder="https://website.com"
                type = "text"
                value={contactInfo.website || ""}
                onchange={(e)=>updateSection("website" , e.target.value)}/>

                </div>

            </div>

        </div>

    )
}

export default ContactInfoForm;