import React, { useEffect, useRef, useState } from "react";

import { LuMail, LuPhone, LuUser, LuGithub, LuMapPin } from "react-icons/lu";
import { RiLinkedinLine, RiGlobeLine } from "react-icons/ri";

import ContactInfo from "../ResumeSection/ContactInfo";
import EducationInfo from "../ResumeSection/EducationInfo";
import { formateYearMonth } from "../../utils/helper";
import LanguageSection from "../ResumeSection/LanguageSection";
import WorkExperience from "../ResumeSection/WorkExperience";
import ProjectSection from "../ResumeSection/ProjectSection";
import SkillSection from "../ResumeSection/SkillSection";
import CertificateSection from "../ResumeSection/CertificateSection";

const DEFAULT_THEME = ["#F5F5F5", "#E0E0E0", "#BDBDBD", "#424242", "#212121"];

const SectionTitle = ({ text, color }) => (
  <h2
    className="uppercase text-xs font-bold tracking-widest border-b pb-1 mb-2"
    style={{ borderColor: color }}>
    {text}
  </h2>
);

function TemplateTwo({ resumeData, colorPalette, containerWidth }) {
  const themeColors = colorPalette?.length > 0 ? colorPalette : DEFAULT_THEME;
  const resumeRef = useRef(null);
  const [baseWidth, setBaseWidth] = useState(800);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const actualBaseWidth = resumeRef.current.offsetWidth;
    setBaseWidth(actualBaseWidth);
    setScale(containerWidth / actualBaseWidth);
  }, [containerWidth]);

  return (
    <div
      ref={resumeRef}
      className="p-6 bg-white"
      style={{
        transform: containerWidth > 0 ? `scale(${scale})` : "none",
        transformOrigin: "top left",
        width: containerWidth > 0 ? `${baseWidth}px` : "auto",
        height: "auto",
      }}>
      <div className="grid grid-cols-12 gap-6">
        {/* Left Column */}
        <div className="col-span-3 bg-gray-100 p-4 text-sm" style={{ backgroundColor: themeColors[0] }}>
          {/* Profile Picture */}
          <div className="flex flex-col items-center">
            <div
              className="w-24 h-24 rounded-full bg-gray-300 overflow-hidden flex items-center justify-center"
              style={{ backgroundColor: themeColors[1] }}>
              {resumeData.ProfileInfo.profilePriviewUrl ? (
                <img
                  src={resumeData.ProfileInfo.profilePriviewUrl}
                  className="w-full h-full object-cover"
                />
              ) : (
                <LuUser size={40} style={{ color: themeColors[4] }} />
              )}
            </div>
            <h2 className="mt-3 font-semibold text-base text-center">
              {resumeData.ProfileInfo.fullname}
            </h2>
            <p className="text-xs text-center">
              {resumeData.ProfileInfo.designation}
            </p>
          </div>

          {/* Contact Info */}
          <div className="mt-6">
            <SectionTitle text="Contact" color={themeColors[3]} />
            <ContactInfo icon={<LuMail />} value={resumeData.contactInfo.email} />
            <ContactInfo icon={<LuPhone />} value={resumeData.contactInfo.phone} />
            <ContactInfo icon={<LuMapPin />} value={resumeData.contactInfo.location} />
            <ContactInfo icon={<RiLinkedinLine />} value={resumeData.contactInfo.linkedin} />
            <ContactInfo icon={<LuGithub />} value={resumeData.contactInfo.github} />
            <ContactInfo icon={<RiGlobeLine />} value={resumeData.contactInfo.website} />
          </div>

          {/* Skills */}
          <div className="mt-6">
            <SectionTitle text="Skills" color={themeColors[3]} />
            <SkillSection
              skills={resumeData.skills}
              accentColor={themeColors[3]}
              bgColor={themeColors[2]}
            />
          </div>

          {/* Languages */}
          <div className="mt-6">
            <SectionTitle text="Languages" color={themeColors[3]} />
            <LanguageSection
              languages={resumeData.languages}
              accentColor={themeColors[3]}
              bgColor={themeColors[2]}
            />
          </div>
        </div>

        {/* Right Column */}
        <div className="col-span-9 text-sm">
          {/* Summary */}
          <div>
            <SectionTitle text="Summary" color={themeColors[3]} />
            <p className="text-xs font-medium">
              {resumeData.ProfileInfo.summery}
            </p>
          </div>

          {/* Work Experience */}
          <div className="mt-4">
            <SectionTitle text="Work Experience" color={themeColors[3]} />
            {resumeData.workExperience.map((data, index) => (
              <WorkExperience
                key={`work_${index}`}
                company={data.company}
                role={data.role}
                duration={`${formateYearMonth(data.startDate)} - ${formateYearMonth(data.endDate)}`}
                durationColor={themeColors[4]}
                description={data.description}
              />
            ))}
          </div>

          {/* Education */}
          <div className="mt-4">
            <SectionTitle text="Education" color={themeColors[3]} />
            {resumeData.education.map((data, index) => (
              <EducationInfo
                key={`edu_${index}`}
                degree={data.degree}
                institution={data.institution}
                duration={`${formateYearMonth(data.startDate)} - ${formateYearMonth(data.endDate)}`}
              />
            ))}
          </div>

          {/* Projects */}
          <div className="mt-4">
            <SectionTitle text="Projects" color={themeColors[3]} />
            {resumeData.projects.map((project, index) => (
              <ProjectSection
                key={`proj_${index}`}
                title={project.title}
                description={project.description}
                githublink={project.github}
                liveDemoUrl={project.liveDemo}
                bgColor={themeColors[2]}
              />
            ))}
          </div>

          {/* Certifications */}
          <div className="mt-4">
            <SectionTitle text="Certifications" color={themeColors[3]} />
            <div className="grid grid-cols-2 gap-2">
              {resumeData.certifications.map((cert, index) => (
                <CertificateSection
                  key={`cert_${index}`}
                  title={cert.title}
                  issuer={cert.issuer}
                  year={cert.year}
                  bgColor={themeColors[2]}
                />
              ))}
            </div>
          </div>

          {/* Interests */}
          {resumeData.interests.length > 0 && resumeData.interests[0] !== "" && (
            <div className="mt-4">
              <SectionTitle text="Interests" color={themeColors[3]} />
              <div className="flex flex-wrap gap-2">
                {resumeData.interests.map((interest, index) => (
                  <span
                    key={`interest_${index}`}
                    className="px-3 py-1 text-xs rounded-full"
                    style={{ backgroundColor: themeColors[2] }}>
                    {interest}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default TemplateTwo;
