export interface Skill {
  id: number
  name: string
  category: string
  proficiency: number // 0-100
  icon?: string
}

export interface Education {
  id: number
  institution: string
  degree: string
  field: string
  start_year: number
  end_year: number | null
  grade?: string
  description?: string
  logo_url?: string
}

export interface Experience {
  id: number
  company: string
  role: string
  employment_type: string // Full-time, Part-time, Freelance, Internship
  start_date: string
  end_date: string | null // null = current
  description: string
  tech_stack: string[] // stored as JSON in DB
  logo_url?: string
}

export interface Certification {
  id: number
  title: string
  issuer: string
  issue_date: string
  expiry_date?: string | null
  credential_id?: string
  credential_url?: string
  badge_url?: string
}

export interface PortfolioData {
  skills: Skill[]
  education: Education[]
  experience: Experience[]
  certifications: Certification[]
}
