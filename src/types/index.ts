export interface Service {
  id: string;
  icon: string;
  title: string;
  description: string;
  benefits: string[];
  problem: string;
  cta: string;
  color: string;
}

export interface Project {
  id: string;
  slug: string;
  title: string;
  industry: string;
  image: string;
  tags: string[];
  problem: string;
  solution: string;
  result: string;
  featured: boolean;
  description?: string;
  techStack?: { name: string; role: string }[];
  pipeline?: string[];
  features?: string[];
  githubUrl?: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  avatar: string;
  quote: string;
  result: string;
  rating: number;
}

export interface Technology {
  name: string;
  icon: string;
  category: 'frontend' | 'backend' | 'marketing' | 'tools';
}

export interface ProcessStep {
  number: string;
  title: string;
  description: string;
  icon: string;
  deliverables: string[];
}

export interface Stat {
  value: string;
  label: string;
  suffix?: string;
}

export interface NavLink {
  label: string;
  href: string;
}
