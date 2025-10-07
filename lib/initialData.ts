// Define a type for a single project or experience entry for consistency
export type Entry = {
  title: string;
  points: string[];
  link?: string;
  stack?: string;
  company?: string;
  duration?: string;
  location?: string;
};

// This object holds the default data for the resume.
export const initialData = {
  name: "John Doe",
  contact: {
    phone: "(555) 555-5555",
    email: "john.doe@example.com",
    linkedin: "https://linkedin.com/in/johndoe",
    github: "https://github.com/johndoe",
    website: "https://example.com",
    leetcode: "https://leetcode.com/johndoe",
  },
  // Headings are fully renamable in the editor
  headings: {
    personal: "Personal Details",
    education: "Education",
    experience: "Experience",
    projects: "Projects",
    research: "Research",
    skills: "Technical Skills",
    certifications: "Certifications",
    positions: "Positions of Responsibility",
  },
  education: [
    {
      degree: "B.S. in Computer Science",
      university: "Example University",
      details: "Expected Graduation: 2026 • GPA: 3.5/4.0",
    },
  ],
  experience: [
    {
      title: "Software Engineering Intern",
      company: "Example Tech Co.",
      duration: "Jun 2024 – Aug 2024",
      location: "Remote",
      points: [
        "Worked on feature development for web applications using React and TypeScript.",
        "Collaborated with cross-functional teams to ship improvements and fixes.",
      ],
    },
  ] as Entry[],
  projects: [
    {
      title: "Example Project",
      link: "https://github.com/johndoe/example-project",
      stack: "React, TypeScript, Node.js",
      points: [
        "Implemented core features and UI for a sample project.",
        "Wrote unit tests and documentation.",
      ],
    },
  ] as Entry[],
  research: [
    {
      title: "Example Research",
      subtitle: "A short placeholder description of research work",
      journal: "Presented at Example Conference",
      points: [
        "Summary point 1 about the research.",
        "Summary point 2 about methods or findings.",
      ],
    },
  ],
  skills: [
    { category: "Languages", list: "JavaScript, TypeScript, Python" },
    { category: "Frameworks", list: "React, Next.js, Node.js" },
  ],
  certifications: [
    "Example Certification (2024)",
  ],
  positions: [
    "Student, Example University (2023 – Present)",
  ],
};

// Define a type for the whole data structure, inferred from the initialData object
export type ResumeData = typeof initialData;