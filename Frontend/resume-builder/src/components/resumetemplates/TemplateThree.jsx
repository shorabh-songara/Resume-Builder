import React, { useEffect, useRef, useState } from "react";

import { LuMapPinHouse , LuMail , LuPhone , LuGithub , LuUser, LuRss } from "react-icons/lu";
import { RiLinkedinLine } from "react-icons/ri";
import ContactInfo from "../ResumeSection/ContactInfo";
import EducationInfo from "../ResumeSection/EducationInfo";
import { formateYearMonth } from "../../utils/helper";
import LanguageSection from "../ResumeSection/LanguageSection";
import WorkExperience from "../ResumeSection/WorkExperience";
import ProjectSection from "../ResumeSection/ProjectSection";
import SkillSection from "../ResumeSection/SkillSection";
import CertificateSection from "../ResumeSection/CertificateSection";

const DEFAULT_THEME = ["#F5F5F5", "#C5E4FF", "#EAF6FF", "#4A90E2", "#2C3E50"];

const SectionTitle = ({ text, color }) => (
  <h2 className="text-lg font-semibold border-b-2 pb-1 mb-3" style={{ borderColor: color }}>{text}</h2>
);

function TemplateThree({ resumeData, colorPalette, containerWidth }) {
  const themeColors = colorPalette?.length > 0 ? colorPalette : DEFAULT_THEME;
  const resumeRef = useRef(null);
  const [baseWidth, setBaseWidth] = useState(900);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const actualBaseWidth = resumeRef.current.offsetWidth;
    setBaseWidth(actualBaseWidth);
    setScale(containerWidth / baseWidth);
  }, [containerWidth]);

  return (
    <div
      ref={resumeRef}
      className="bg-white p-6 shadow-md"
      style={{
        transform: containerWidth > 0 ? `scale(${scale})` : "none",
        transformOrigin: "top left",
        width: containerWidth > 0 ? `${baseWidth}px` : "auto",
        height: "auto"
      }}
    >
      <div className="flex flex-col border rounded-lg overflow-hidden">
        <div className="flex items-center p-5 bg-gray-100">
          <div className="w-20 h-20 rounded-full overflow-hidden border-4" style={{ borderColor: themeColors[3] }}>
            {resumeData.ProfileInfo.profilePriviewUrl ? (
              <img src={resumeData.ProfileInfo.profilePriviewUrl} alt="Profile" className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-4xl text-white" style={{ backgroundColor: themeColors[4] }}>
                <LuUser />
              </div>
            )}
          </div>
          <div className="ml-6">
            <h1 className="text-2xl font-bold">{resumeData.ProfileInfo.fullname}</h1>
            <p className="text-sm text-gray-600">{resumeData.ProfileInfo.designation}</p>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-6 p-5">
          <div className="col-span-1">
            <SectionTitle text="Contact" color={themeColors[3]} />
            <div className="flex flex-col gap-3">
              <ContactInfo icon={<LuMapPinHouse />} iconBG={themeColors[1]} value={resumeData.contactInfo.location} />
              <ContactInfo icon={<LuMail />} iconBG={themeColors[1]} value={resumeData.contactInfo.email} />
              <ContactInfo icon={<LuPhone />} iconBG={themeColors[1]} value={resumeData.contactInfo.phone} />
              {resumeData.contactInfo.linkedin && (
                <ContactInfo icon={<RiLinkedinLine />} iconBG={themeColors[1]} value={resumeData.contactInfo.linkedin} />
              )}
              {resumeData.contactInfo.github && (
                <ContactInfo icon={<LuGithub />} iconBG={themeColors[1]} value={resumeData.contactInfo.github} />
              )}
              <ContactInfo icon={<LuRss />} iconBG={themeColors[1]} value={resumeData.contactInfo.website} />
            </div>

            <div className="mt-6">
              <SectionTitle text="Education" color={themeColors[3]} />
              {resumeData.education.map((edu, index) => (
                <EducationInfo
                  key={`edu_${index}`}
                  degree={edu.degree}
                  institution={edu.institution}
                  duration={`${formateYearMonth(edu.startDate)} - ${formateYearMonth(edu.endDate)}`}
                />
              ))}
            </div>

            <div className="mt-6">
              <SectionTitle text="Languages" color={themeColors[3]} />
              <LanguageSection languages={resumeData.languages} accentColor={themeColors[3]} bgColor={themeColors[1]} />
            </div>
          </div>

          <div className="col-span-2">
            <SectionTitle text="Professional Summary" color={themeColors[3]} />
            <p className="text-sm mb-6">{resumeData.ProfileInfo.summery}</p>

            <SectionTitle text="Work Experience" color={themeColors[3]} />
            {resumeData.workExperience.map((exp, index) => (
              <WorkExperience
                key={`work_${index}`}
                company={exp.company}
                role={exp.role}
                duration={`${formateYearMonth(exp.startDate)} - ${formateYearMonth(exp.endDate)}`}
                durationColor={themeColors[4]}
                description={exp.description}
              />
            ))}

            <SectionTitle text="Projects" color={themeColors[3]} />
            {resumeData.projects.map((proj, index) => (
              <ProjectSection
                key={`proj_${index}`}
                title={proj.title}
                description={proj.description}
                githublink={proj.github}
                liveDemoUrl={proj.liveDemo}
                bgColor={themeColors[1]}
              />
            ))}

            <SectionTitle text="Skills" color={themeColors[3]} />
            <SkillSection skills={resumeData.skills} accentColor={themeColors[3]} bgColor={themeColors[1]} />

            <SectionTitle text="Certifications" color={themeColors[3]} />
            <div className="grid grid-cols-2 gap-3">
              {resumeData.certifications.map((cert, index) => (
                <CertificateSection
                  key={`cert_${index}`}
                  title={cert.title}
                  issuer={cert.issuer}
                  year={cert.year}
                  bgColor={themeColors[1]}
                />
              ))}
            </div>

            {resumeData.interests.length > 0 && resumeData.interests[0] !== "" && (
              <div className="mt-6">
                <SectionTitle text="Interests" color={themeColors[3]} />
                <div className="flex flex-wrap gap-2 mt-2">
                  {resumeData.interests.map((int, idx) => (
                    <span key={`int_${idx}`} className="text-xs font-medium py-1 px-2 rounded" style={{ backgroundColor: themeColors[1] }}>{int}</span>
                  ))}
                </div>
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
}

export default TemplateThree;
