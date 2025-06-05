import template_one_img from "../assets/template1.png"
import template_two_img from "../assets/template2.png"
import template_three_img from "../assets/template3.png"

export const resumeTemplates = [    
    {
        id : '01',
        thumbnailImg : template_one_img,
        colorPaletteCode : 'themeOne'
    },
    {
        id: '02',
        thumbnailImg : template_two_img,
        colorPaletteCode : 'themeOne'
    },
    {
      id : '03',
      thumbnailImg : template_three_img,
      colorPaletteCode : 'themeOne'
    }
]

export const ThemeColorPalette = {
    themeOne :[
        ["#EBFDFF", "#A1F4FD", "#CEFAFE", "#008808", "#4A5565"],

        ["#E9FBF8", "#B4EFE7", "#93E2DA", "#2AC9A0", "#3D4C5A"],
        ["#F5F4FF", "#EBDBFF", "#C9C2F8", "#857901", "#48485C"],
        ["#FOFAFF", "#D6F0FF", "#AFDEFF", "#3399FF", "#445361"],
        ["#FFF5F7", "#FFE0EC", "#FAC6D4", "#F6729C", "#5A5ASA"], 
        ["#F9FAFB", "#E4E7EB", "#CBD5E0", "#7F9CF5S","#203748"],
        ["#F4FFFD", "#D3FDF2", "#B0E9D4", "#34C79D", "#384C48"],
        ["#FFF7F0", "#FFE6D9", "#FFD2BA", "#FF9561", "#4C4743"], 
        ["#F9FCFF", "#E3F0F9", "#CODDEE", "#6CA6CF", "#46545E"],
        ["#FFFDF6", "#FFF407", "#FFE7A0", "#FF0000", "#57534E"],
        ["#EFFCFF", "#CBFØFF", "#99E0FF", "#0078A7", "#283442"],

        ["#F7F7F7", "#E4E4E4", "#CFCFCF", "#4A4A4A", "#222222"], 
        ["#E3F2FD", "#90CAF9", "#a8d2f4", "#1E88E5", "#8047A1"]
]
}

export const DUMMY_RESUME_DATA = {
    ProfileInfo: {
        profilePriviewUrl: "https://example.com/profile-pic.jpg",
        fullname: "Shorabh Songara",
        designation: "Full Stack Developer",
        summery:
          "Enthusiastic full stack developer with experience in building scalable web and mobile applications. Skilled in React, Node.js, Android, and database design.",
      },
      contactInfo: {
        email: "shorabh@example.com",
        phone: "9876543210",
        location: "Roorkee, India",
        linkedin: "https://linkedin.com/in/shorabh-songara",
        github: "https://github.com/shorabh-songara",
        website: "https://shorabh.dev",
      },

      workExperience: [
        {
          company: "VJ Nucleus",
          role: "Full Stack Android Developer Intern",
          startDate: "2024-03",
          endDate: "2024-11",
          description:
            "Built a full Android app with Java and Django REST. Implemented OTP login, real-time answer validation, and Cashfree payment gateway integration.",
        },
      ],
      education: [
        {
          degree: "B.Tech in Chemical Engineering",
          institution: "Indian Institute of Technology Roorkee",
          startDate: "2022-10",
          endDate: "2026-06",
        },
      ],

      skills: [
        { name: "JavaScript", progress: 80 },
        { name: "React", progress: 75 },
        { name: "Node.js", progress: 70 },
        { name: "Android (Java)", progress: 85 },
      ],

      projects: [
        {
          title: "VJ Nucleus",
          description:
            "An Android app for student interaction and learning. Includes secure login, question-answer modules, and in-app payments.",
          github: "https://github.com/shorabh-songara/vjnucleus",
          liveDemo: "https://play.google.com/store/apps/details?id=com.vjnucleus.vj",
        },
        {
          title: "AI Resume Builder",
          description:
            "Built with Next.js, Drizzle ORM, and Gemini AI to help users auto-generate resumes with exportable PDFs.",
          github: "https://github.com/shorabh-songara/ai-resume-builder",
          liveDemo: "https://cvbuild.ai",
        },
      ],

      certifications: [
        {
          title: "Full Stack Web Development",
          issuer: "Coursera / Meta",
          year: "2024",
        },
        {
          title: "Android App Development",
          issuer: "Udemy",
          year: "2023",
        },
      ],
    
      languages: [
        { name: "English", progress: 90 },
        { name: "Hindi", progress: 95 },
      ],

      
      interests: ["Open Source", "Hackathons", "Designing UI", "Problem Solving"],
}