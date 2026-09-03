export type ProjectStatus = "Active development" | "Research prototype"

export type Project = {
  slug: string
  title: string
  eyebrow: string
  purpose: string
  contribution: string
  context: string
  status: ProjectStatus
  stack: string[]
  capabilities: string[]
  repositoryUrl?: string
  evidence: string[]
}

export const projects: Project[] = [
  {
    slug: "smart-capex",
    title: "Smart Capex",
    eyebrow: "Full-stack · Telecom decision systems",
    purpose:
      "A role-governed platform that connects network pressure, candidate sites, forecasts, technical review, financial validation, and investment approval.",
    contribution:
      "Built across the product interface and service boundaries, including role-aware workflows, API contracts, validation, geospatial data, background jobs, and object storage.",
    context: "Orange Digital Center project",
    status: "Active development",
    stack: ["React", "NestJS", "PostGIS", "Redis", "BullMQ"],
    capabilities: ["Product engineering", "Backend and data"],
    repositoryUrl: "https://github.com/JedidiAymen/Smart-Capex",
    evidence: [
      "React interface with tested multi-role workflows",
      "NestJS REST API with validation and access control",
      "PostgreSQL/PostGIS, Redis, BullMQ, and MinIO boundaries",
    ],
  },
  {
    slug: "ansibleguard",
    title: "AnsibleGuard",
    eyebrow: "Infrastructure · Static analysis · Research",
    purpose:
      "A static-analysis CLI that finds maintainability, security, idempotency, and review smells in Ansible configuration code.",
    contribution:
      "Developing the parser and rule engine, repository discovery pipeline, provider integrations, normalized reporting, calibration workflow, and reproducibility controls.",
    context: "Independent engineering research",
    status: "Research prototype",
    stack: ["Python", "Ansible", "Git", "SARIF", "Redis"],
    capabilities: ["Automation and systems", "Backend and data"],
    repositoryUrl: "https://github.com/Narjes-b/AnsibleChecklist",
    evidence: [
      "Versioned catalog of stable and experimental rules",
      "GitLeaks and ansible-lint provider integration",
      "JSON, CSV, text, and GitHub-compatible SARIF output",
    ],
  },
]

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug)
}
