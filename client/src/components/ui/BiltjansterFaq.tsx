import { useState } from 'react'
import './BiltjansterFaq.css'

export interface BiltjansterFaqItem {
  question: string
  answer: string
}

interface BiltjansterFaqProps {
  heading: string
  intro?: string
  items: BiltjansterFaqItem[]
  id?: string
}

export function BiltjansterFaq({ heading, intro, items, id = 'biltjanster-faq' }: BiltjansterFaqProps) {
  const [openItems, setOpenItems] = useState<Set<number>>(new Set())

  if (items.length === 0) return null

  const toggleItem = (index: number) => {
    setOpenItems(previous => {
      const next = new Set(previous)
      if (next.has(index)) next.delete(index)
      else next.add(index)
      return next
    })
  }

  return (
    <section className="bb-faq" id={id} aria-labelledby={`${id}-title`}>
      <div className="bb-faq__container">
        <header className="bb-faq__heading">
          <h2 id={`${id}-title`}>{heading}</h2>
          {intro && <p>{intro}</p>}
        </header>

        <div className="bb-faq__list">
          {items.map((item, index) => {
            const isOpen = openItems.has(index)
            const answerId = `${id}-answer-${index}`
            const questionId = `${id}-question-${index}`

            return (
              <article className={`bb-faq__item${isOpen ? ' is-open' : ''}`} key={item.question}>
                <h3>
                  <button
                    type="button"
                    id={questionId}
                    aria-expanded={isOpen}
                    aria-controls={answerId}
                    onClick={() => toggleItem(index)}
                  >
                    <span>{item.question}</span>
                    <span className="bb-faq__symbol" aria-hidden="true">{isOpen ? '−' : '+'}</span>
                  </button>
                </h3>
                <div
                  id={answerId}
                  role="region"
                  aria-labelledby={questionId}
                  hidden={!isOpen}
                >
                  <p>{item.answer}</p>
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
