export type BookEntry = {
  slug: string
  title: string
  author: string
  status: "Ongoing"
  topics: string[]
  connection: string
}

export const books: BookEntry[] = [
  {
    slug: "designing-data-intensive-applications",
    title: "Designing Data-Intensive Applications",
    author: "Martin Kleppmann",
    status: "Ongoing",
    topics: ["Data systems", "Storage", "Distributed systems"],
    connection: "Informing how I reason about data boundaries in Smart Capex.",
  },
  {
    slug: "system-design-interview",
    title: "System Design Interview",
    author: "Alex Xu",
    status: "Ongoing",
    topics: ["Scalability", "Estimation", "Architecture"],
    connection: "Building a clearer vocabulary for communicating system decisions.",
  },
  {
    slug: "system-design-interview-volume-2",
    title: "System Design Interview: Volume 2",
    author: "Alex Xu and Sahn Lam",
    status: "Ongoing",
    topics: ["Bottlenecks", "Trade-offs", "Advanced designs"],
    connection: "A deeper track for studying constraints and failure modes.",
  },
]
