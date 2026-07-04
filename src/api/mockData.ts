import type { Job, Application, Offer, NotificationItem, Profile } from "@/types";

export const CATEGORIES = [
  { slug: "engineering", name: "Engineering", icon: "Code2" },
  { slug: "design", name: "Design", icon: "Palette" },
  { slug: "product", name: "Product", icon: "Layers" },
  { slug: "data", name: "Data & AI", icon: "Database" },
  { slug: "marketing", name: "Marketing", icon: "Megaphone" },
  { slug: "sales", name: "Sales", icon: "TrendingUp" },
  { slug: "operations", name: "Operations", icon: "Settings2" },
  { slug: "finance", name: "Finance", icon: "Wallet" },
];

const companies = [
  "Northwind Labs",
  "Helix Systems",
  "Lumen AI",
  "Forge Analytics",
  "Pinegrove",
  "Stratus Cloud",
  "Arcus Health",
  "Vela Robotics",
  "Quanta Pay",
  "Orbital Studio",
  "Riverbend",
  "Mosaic OS",
];

const locations = [
  "San Francisco, CA",
  "New York, NY",
  "Austin, TX",
  "Remote — US",
  "London, UK",
  "Berlin, DE",
  "Toronto, CA",
  "Amsterdam, NL",
];

const titles = [
  "Senior Frontend Engineer",
  "Product Designer",
  "Data Scientist",
  "Engineering Manager",
  "Full-stack Engineer",
  "Marketing Lead",
  "Account Executive",
  "DevOps Engineer",
  "Mobile Engineer (iOS)",
  "ML Research Engineer",
  "Operations Analyst",
  "Finance Manager",
];

const skillsPool = [
  "React",
  "TypeScript",
  "Node.js",
  "Python",
  "GraphQL",
  "AWS",
  "Figma",
  "SQL",
  "Kubernetes",
  "Go",
  "Rust",
  "Swift",
];

function pick<T>(arr: T[], n: number): T[] {
  const c = [...arr];
  const out: T[] = [];
  for (let i = 0; i < n && c.length; i++)
    out.push(c.splice(Math.floor(Math.random() * c.length), 1)[0]);
  return out;
}

const types: Job["type"][] = ["Full-time", "Part-time", "Contract", "Internship"];
const remotes: Job["remote"][] = ["Remote", "Hybrid", "On-site"];
const levels: Job["experienceLevel"][] = ["Entry", "Mid", "Senior", "Lead"];

export const MOCK_JOBS: Job[] = Array.from({ length: 28 }).map((_, i) => {
  const cat = CATEGORIES[i % CATEGORIES.length];
  const base = 60 + (i % 8) * 15;
  return {
    id: `job_${1000 + i}`,
    title: titles[i % titles.length],
    company: companies[i % companies.length],
    location: locations[i % locations.length],
    remote: remotes[i % remotes.length],
    type: types[i % types.length],
    category: cat.name,
    salaryMin: base * 1000,
    salaryMax: (base + 40) * 1000,
    currency: "USD",
    postedAt: new Date(Date.now() - i * 86400000 * 1.3).toISOString(),
    experienceLevel: levels[i % levels.length],
    skills: pick(skillsPool, 4 + (i % 3)),
    description:
      "Join a high-leverage team building tools used by millions. You'll own end-to-end product surface area, partner with design and product, and ship continuously to a global audience.",
    responsibilities: [
      "Design, build, and ship features end-to-end",
      "Collaborate with cross-functional partners on roadmap",
      "Mentor teammates and raise the engineering bar",
      "Own quality, accessibility, and performance",
    ],
    requirements: [
      "5+ years of relevant industry experience",
      "Strong fundamentals and pragmatic judgment",
      "Excellent written and verbal communication",
      "Track record of delivering at scale",
    ],
    benefits: [
      "Competitive salary and meaningful equity",
      "Top-tier health, dental, and vision",
      "Flexible time off and parental leave",
      "Learning stipend and home-office budget",
    ],
  };
});

export const MOCK_PROFILE: Profile = {
  id: "u_1",
  firstName: "Alex",
  lastName: "Morgan",
  email: "alex@example.com",
  phone: "+1 (555) 010-1234",
  location: "San Francisco, CA",
  headline: "Senior Software Engineer · 7 yrs",
  bio: "Product-minded engineer who enjoys building polished, reliable interfaces and scaling teams.",
  skills: ["React", "TypeScript", "Node.js", "GraphQL", "AWS"],
  experienceYears: 7,
  avatarUrl: "",
  resume: { name: "Alex_Morgan_Resume.pdf", size: 248_320, uploadedAt: new Date().toISOString() },
  links: { linkedin: "https://linkedin.com/in/alex", portfolio: "https://alex.dev" },
};

export const MOCK_APPLICATIONS: Application[] = MOCK_JOBS.slice(0, 6).map((job, i) => ({
  id: `app_${i}`,
  jobId: job.id,
  job,
  appliedAt: new Date(Date.now() - i * 86400000 * 2).toISOString(),
  status: (
    [
      "Submitted",
      "Under Review",
      "Interview",
      "Offer",
      "Rejected",
      "Under Review",
    ] as Application["status"][]
  )[i],
  nextStep: i === 2 ? "Technical interview" : i === 3 ? "Review offer letter" : undefined,
  interviewAt: i === 2 ? new Date(Date.now() + 86400000 * 3).toISOString() : undefined,
}));

export const MOCK_OFFERS: Offer[] = MOCK_JOBS.slice(3, 5).map((job, i) => ({
  id: `offer_${i}`,
  jobId: job.id,
  job,
  receivedAt: new Date(Date.now() - i * 86400000).toISOString(),
  expiresAt: new Date(Date.now() + 86400000 * 7).toISOString(),
  salary: 180_000 + i * 10_000,
  currency: "USD",
  startDate: new Date(Date.now() + 86400000 * 30).toISOString(),
  status: "Pending",
}));

export const MOCK_NOTIFICATIONS: NotificationItem[] = [
  {
    id: "n1",
    type: "interview",
    title: "Interview scheduled",
    body: "Northwind Labs scheduled a technical interview for Thursday.",
    createdAt: new Date(Date.now() - 3600_000).toISOString(),
    read: false,
  },
  {
    id: "n2",
    type: "application",
    title: "Application viewed",
    body: "Helix Systems reviewed your application for Product Designer.",
    createdAt: new Date(Date.now() - 86400_000).toISOString(),
    read: false,
  },
  {
    id: "n3",
    type: "offer",
    title: "New offer received",
    body: "Forge Analytics extended an offer for Data Scientist.",
    createdAt: new Date(Date.now() - 86400_000 * 2).toISOString(),
    read: true,
  },
  {
    id: "n4",
    type: "system",
    title: "Profile completeness 90%",
    body: "Add a portfolio link to reach 100%.",
    createdAt: new Date(Date.now() - 86400_000 * 3).toISOString(),
    read: true,
  },
];

export const SAVED_JOBS_KEY = "khruta_saved_jobs";
