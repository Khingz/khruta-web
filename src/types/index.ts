export type Job = {
  id: string;
  title: string;
  company: string;
  companyLogo?: string;
  location: string;
  type: string;
  salaryMin: number;
  salaryMax: number;
  currency: string;
  postedAt: string;
  description: string;
  responsibilities: string[];
  requirements: string[];
  benefits: string[];
  skills: string[];
};

export type Application = {
  id: string;
  jobId: string;
  job: Job;
  appliedAt: string;
  status: "Submitted" | "Under Review" | "Interview" | "Offer" | "Rejected" | "Withdrawn";
  nextStep?: string;
  interviewAt?: string;
  payload: any;
};

export type Offer = {
  id: string;
  jobId: string;
  job: Job;
  receivedAt: string;
  expiresAt: string;
  salary: number;
  currency: string;
  startDate: string;
  status: "Pending" | "Accepted" | "Declined";
};

export type NotificationItem = {
  id: string;
  title: string;
  body: string;
  createdAt: string;
  read: boolean;
  type: "application" | "interview" | "offer" | "system";
};

export type Profile = {
  id: string;
  fullname: string;
  email: string;
  phone?: string;
  location?: string;
  headline?: string;
  bio?: string;
  skills?: string[];
  resumeLink?: string;
  linkedinURL?: string;
  portfolioLink?: string;
};

export type User = { id: string; email: string; firstName: string; lastName: string };
