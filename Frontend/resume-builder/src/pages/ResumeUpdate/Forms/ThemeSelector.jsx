import React, { useEffect, useRef, useState } from "react";
import { ThemeColorPalette, DUMMY_RESUME_DATA, resumeTemplates } from "../../../utils/data";
import Tab from "../../../components/resumetemplates/Tab";
import { LuCircleCheckBig } from "react-icons/lu";
import TemplateCard from "../../../components/cards/TemplateCard";
import RenderResume from "../../../components/resumetemplates/RenderResume";

const TAB_DATA = [{ label: "Templates" }, { label: "Color Palettes" }];

function ThemeSelector({ selectedTheme, setSelectedTheme, resumeData, onClose }) {
  const resumeRef = useRef(null);
  const [baseWidth, setBaseWidth] = useState(800);
  const [tabValue, setTabValue] = useState("Templates");
  const [selectedColorPalette, setSelectedColorPalette] = useState({
    colors: selectedTheme?.colorPalatte || [],
    index: -1,
  });
  const [selectedTemplate, setSelectedTemplate] = useState({
    theme: selectedTheme?.theme || "",
    index: -1,
  });

  const handlethemeSelections = () => {
    setSelectedTheme({
      colorPalatte: selectedColorPalette.colors,
      theme: selectedTemplate.theme,
    });
    onClose();
  };

  const updateBaseWidth = () => {
    if (resumeRef.current) {
      setBaseWidth(resumeRef.current.offsetWidth);
    }
  };

  useEffect(() => {
    updateBaseWidth();
    window.addEventListener("resize", updateBaseWidth);
    return () => window.removeEventListener("resize", updateBaseWidth);
  }, []);

  return (
    <div className="container max-w-screen-xl mx-auto px-4 py-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <Tab tabs={TAB_DATA} activeTab={tabValue} setActiveTab={setTabValue} />
        <button
          onClick={handlethemeSelections}
          className="flex items-center gap-2 text-white bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-md shadow transition"
        >
          <LuCircleCheckBig className="text-xl" />
          Done
        </button>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Left Sidebar - Templates or Colors */}
        <div className="md:col-span-4 bg-white rounded-xl shadow-lg p-5 overflow-y-auto max-h-[80vh] custom-scrollbar">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-2 gap-4">
            {tabValue === "Templates" &&
              resumeTemplates.map((template, index) => (
                <TemplateCard
                  key={`template_${index}`}
                  thumbnailImg={template.thumbnailImg}
                  isSelected={selectedTemplate?.index === index}
                  onSelect={() => setSelectedTemplate({ theme: template.id, index })}
                />
              ))}

            {tabValue === "Color Palettes" &&
              ThemeColorPalette.themeOne.map((colors, index) => (
                <ColorPalette
                  key={`palette_${index}`}
                  colors={colors}
                  isSelected={selectedColorPalette?.index === index}
                  onSelect={() => setSelectedColorPalette({ colors, index })}
                />
              ))}
          </div>
        </div>

        {/* Right Resume Preview */}
        <div
          className="md:col-span-8 bg-gray-50 rounded-xl shadow-lg p-4 overflow-auto max-h-[80vh] flex justify-center items-start"
          ref={resumeRef}
        >
          <div className="scale-[0.95] sm:scale-[0.9] md:scale-[0.85] lg:scale-[0.8] origin-top">
            <RenderResume
              templateId={selectedTemplate?.theme || ""}
              resumeData={resumeData || DUMMY_RESUME_DATA}
              containerWidth={baseWidth}
              colorPalette={selectedColorPalette?.colors || null}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ThemeSelector;

// ColorPalette Component
const ColorPalette = ({ colors, isSelected, onSelect }) => {
  if (!Array.isArray(colors)) return null;

  return (
    <div
      onClick={onSelect}
      className={`h-24 cursor-pointer rounded-lg overflow-hidden border-2 transition-all duration-200 flex shadow-sm ${
        isSelected
          ? "border-purple-500 ring-2 ring-purple-400"
          : "border-gray-200 hover:border-purple-300"
      }`}
    >
      {colors.map((color, index) => (
        <div
          key={`color_${index}`}
          style={{ backgroundColor: color }}
          className="flex-1"
        />
      ))}
    </div>
  );
};

