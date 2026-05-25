// ─────────────────────────────────────────────────────────────
// Portfolio Data — Single source of truth for all site content
// ─────────────────────────────────────────────────────────────

/* ── Types ─────────────────────────────────────────────────── */

export interface SocialLink {
  label: string;
  href: string;
  icon: "github" | "linkedin" | "twitter" | "email";
}

export interface PersonalInfo {
  name: string;
  firstName: string;
  lastName: string;
  title: string;
  email: string;
  phone: string;
  location: string;
  socials: SocialLink[];
}

export interface NavItem {
  label: string;
  href: string;
}

export interface ExperienceEntry {
  id: string;
  company: string;
  role: string;
  startDate: string;
  endDate: string;
  description: string[];
  techStack: string[];
  location?: string;
}

export interface ProjectFeature {
  title: string;
  description: string;
}

export interface Project {
  id: string;
  name: string;
  tagline: string;
  description: string;
  techStack: string[];
  features: ProjectFeature[];
  liveUrl: string;
  githubUrl: string;
  image?: string;
}

export interface SkillCategory {
  category: string;
  skills: string[];
}

export interface Education {
  degree: string;
  field: string;
  institution: string;
  graduationYear: string;
  location?: string;
}

export interface Stat {
  value: string;
  label: string;
}

/* ── Data ──────────────────────────────────────────────────── */

export const personalInfo: PersonalInfo = {
  name: "Piyush Singh Thakur",
  firstName: "Piyush",
  lastName: "Singh Thakur",
  title: "Frontend Developer",
  email: "piyushsinghthakur128@gmail.com",
  phone: "+91 8305036882",
  location: "Jabalpur, MP",
  socials: [
    {
      label: "GitHub",
      href: "https://github.com/piyushht2003",
      icon: "github",
    },
    {
      label: "LinkedIn",
      href: "https://linkedin.com/in/piyush/",
      icon: "linkedin",
    },
    {
      label: "Email",
      href: "mailto:piyushsinghthakur128@gmail.com",
      icon: "email",
    },
  ],
};

export const navItems: NavItem[] = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
];

export const bio = `Frontend engineer who builds fast, accessible, and visually compelling interfaces. I specialise in React & Next.js ecosystems and obsess over performance, motion design, and pixel-perfect craft. Currently crafting high-end e-commerce experiences as a freelance engineer.`;

export const bioShort = `I build interfaces that feel alive — fast, fluid, and impossibly smooth.`;

export const experience: ExperienceEntry[] = [
  {
    id: "the-rare-store",
    company: "The Rare Store",
    role: "Freelance Frontend Engineer",
    startDate: "May 2025",
    endDate: "Present",
    location: "Remote",
    description: [
      "Architected and built a high-performance e-commerce storefront using Next.js 15 App Router with server components, achieving sub-second LCP on product pages.",
      "Implemented advanced product filtering, search, and cart management with Redux Toolkit, reducing unnecessary re-renders by 35%.",
      "Designed responsive, mobile-first layouts using Tailwind CSS and Framer Motion, reducing layout-related defects by 40% across QA cycles.",
      "Integrated Firebase for real-time inventory updates and user authentication, supporting 99.9% uptime during flash sale events.",
    ],
    techStack: [
      "Next.js",
      "React",
      "TypeScript",
      "Redux Toolkit",
      "Tailwind CSS",
      "Framer Motion",
      "Firebase",
    ],
  },
  {
    id: "nivss-heritage",
    company: "Nivss Heritage",
    role: "Web Developer",
    startDate: "Mar 2024",
    endDate: "Apr 2025",
    location: "Jabalpur, MP",
    description: [
      "Developed and maintained the company's web presence using modern JavaScript frameworks, improving page load performance by 30%.",
      "Built reusable component libraries that accelerated feature delivery across multiple internal projects.",
      "Collaborated with design and marketing teams to translate Figma mockups into responsive, production-ready interfaces.",
      "Implemented SEO best practices and structured data, increasing organic traffic visibility.",
    ],
    techStack: [
      "React",
      "JavaScript",
      "Node.js",
      "Tailwind CSS",
      "Git",
      "Vercel",
    ],
  },
];

export const projects: Project[] = [
  {
    id: "quickstay",
    name: "QuickStay",
    tagline: "Hotel Management SaaS",
    description:
      "A full-stack hotel management platform that streamlines bookings, room management, and guest services. Built with the MERN stack, it features real-time availability updates, a booking engine, and an admin dashboard for hotel operators.",
    techStack: [
      "React",
      "Node.js",
      "Express",
      "MongoDB",
      "Redux Toolkit",
      "Tailwind CSS",
    ],
    features: [
      {
        title: "Real-time Booking Engine",
        description:
          "Instant room availability checks and seamless reservation flow with conflict prevention.",
      },
      {
        title: "Admin Dashboard",
        description:
          "Comprehensive analytics, revenue tracking, and room management interface for hotel operators.",
      },
      {
        title: "Guest Portal",
        description:
          "Self-service portal for guests to manage bookings, request services, and leave reviews.",
      },
      {
        title: "Payment Integration",
        description:
          "Secure payment processing with multiple gateway support and automated invoice generation.",
      },
    ],
    liveUrl: "https://quickstay-rose.vercel.app/",
    githubUrl: "https://github.com/piyushht2003/hotel-management-app",
  },
  {
    id: "worktrack",
    name: "WorkTrack",
    tagline: "Employee Management System",
    description:
      "An employee management application designed to track attendance, manage tasks, and monitor team productivity. Features role-based access control, real-time notifications, and detailed reporting dashboards.",
    techStack: [
      "React",
      "TypeScript",
      "Node.js",
      "MongoDB",
      "Tailwind CSS",
      "Firebase",
    ],
    features: [
      {
        title: "Attendance Tracking",
        description:
          "Automated check-in/check-out with geolocation verification and overtime calculation.",
      },
      {
        title: "Task Management",
        description:
          "Kanban-style task boards with priority levels, deadlines, and team assignment workflows.",
      },
      {
        title: "Role-based Access",
        description:
          "Granular permission system supporting admin, manager, and employee access levels.",
      },
      {
        title: "Analytics & Reports",
        description:
          "Detailed productivity reports, attendance summaries, and exportable CSV/PDF reports.",
      },
    ],
    liveUrl: "https://work-track-employee-management-syst.vercel.app/",
    githubUrl: "https://github.com/piyushht2003/WorkTrack-Employee-Management-System",
  },
];

export const skills: SkillCategory[] = [
  {
    category: "Languages",
    skills: ["TypeScript", "JavaScript", "HTML5", "CSS3"],
  },
  {
    category: "Frameworks & Libraries",
    skills: [
      "Next.js",
      "React.js",
      "Node.js",
      "Redux Toolkit",
      "Tailwind CSS",
      "Framer Motion",
      "Three.js",
    ],
  },
  {
    category: "Tools & Platforms",
    skills: ["Git", "Vercel", "Firebase", "GCP", "VS Code", "Figma"],
  },
  {
    category: "Core Concepts",
    skills: [
      "Responsive Design",
      "Performance Optimisation",
      "SEO",
      "Accessibility",
      "REST APIs",
      "Component Architecture",
    ],
  },
];

export const education: Education = {
  degree: "B.Tech",
  field: "Computer Science & Engineering",
  institution: "St. Aloysius Institute of Technology",
  graduationYear: "2025",
  location: "Jabalpur, MP",
};

export const stats: Stat[] = [
  {
    value: "35%",
    label: "Re-render Reduction",
  },
  {
    value: "40%",
    label: "Layout Defects Reduced",
  },
  {
    value: "30%",
    label: "Page Load Improvement",
  },
  {
    value: "99.9%",
    label: "Uptime Maintained",
  },
];
