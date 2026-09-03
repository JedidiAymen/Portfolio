export type NowSnapshot = {
  building: { label: string; href: string }
  learning: { label: string; href: string }
  reading: { bookSlug: string }
  updatedAt: string
}

export const now: NowSnapshot = {
  building: { label: "AnsibleGuard", href: "/work/ansibleguard" },
  learning: {
    label: "System design, model evaluation, and LLM foundations",
    href: "/#capabilities",
  },
  reading: { bookSlug: "designing-data-intensive-applications" },
  updatedAt: "September 2026",
}
