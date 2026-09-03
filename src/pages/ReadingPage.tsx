import { BookOpenIcon } from "lucide-react"

import { Container } from "@/components/foundation/Container"
import { Section } from "@/components/foundation/Section"
import { books } from "@/content/reading"

export function ReadingPage() {
  return (
    <>
      <Section className="pb-12 pt-36 medium:pt-44">
        <Container>
          <p className="text-meta text-ink-muted">/ READING SHELF</p>
          <h1 className="mt-5 max-w-[10ch] text-display-lg font-medium leading-[0.88] tracking-[-0.07em]">
            Ideas under <span className="font-serif font-normal italic">construction.</span>
          </h1>
          <p className="mt-7 max-w-[64ch] text-body-lg leading-relaxed text-ink-muted">
            A deliberately small shelf. These books are in progress, so there are no invented ratings, dates, or takeaways.
          </p>
        </Container>
      </Section>

      <Section className="border-t border-line pt-12">
        <Container>
          <div className="border-t border-line">
            {books.map((book, index) => (
              <article key={book.slug} className="grid gap-6 border-b border-line py-9 medium:grid-cols-[4rem_1fr_auto] medium:items-center">
                <span className="font-mono text-xs text-ink-muted">/0{index + 1}</span>
                <div>
                  <h2 className="text-heading-3 font-medium">{book.title}</h2>
                  <p className="mt-2 text-ink-muted">{book.author}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {book.topics.map((topic) => (
                      <span key={topic} className="rounded-full border border-line bg-surface px-3 py-1 font-mono text-[0.62rem] uppercase tracking-[0.08em] text-ink-muted">
                        {topic}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="max-w-[24rem] medium:text-right">
                  <span className="inline-flex items-center gap-2 rounded-full border border-lime bg-lime-soft px-3 py-1 font-mono text-[0.62rem] uppercase tracking-[0.08em] text-moss">
                    <BookOpenIcon data-icon="inline-start" aria-hidden="true" />
                    {book.status}
                  </span>
                  <p className="mt-4 text-sm leading-relaxed text-ink-muted">{book.connection}</p>
                </div>
              </article>
            ))}
          </div>
        </Container>
      </Section>
    </>
  )
}
