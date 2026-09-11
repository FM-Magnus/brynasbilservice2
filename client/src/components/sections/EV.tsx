import { PhoneIcon } from '../icons/PhoneIcon'

const steps = [
  {
    num: '01',
    title: 'Berätta om bilen',
    desc: 'Beskriv problemet eller vilken service du behöver.',
  },
  {
    num: '02',
    title: 'Vi undersöker och återkopplar',
    desc: 'Du får veta vad vi har hittat och vad nästa steg är.',
  },
  {
    num: '03',
    title: 'Du godkänner innan vi går vidare',
    desc: 'Om mer arbete behövs kontaktar vi dig först.',
  },
]

export function EV() {
  return (
    <section className="ev-section" id="sa-fungerar-det" aria-labelledby="process-title">
      <div className="container">
        <div className="ev-card">
          <div className="ev-inner">
            <div className="ev-text">
              <div className="section-eyebrow section-eyebrow--dark">
                <span className="eyebrow-line" aria-hidden="true" />
                Så fungerar det
              </div>
              <h2 className="ev-title" id="process-title">
                Från första kontakt <br />
                <span className="title-accent">till färdig bil</span>
              </h2>
              <p className="ev-desc">
                Berätta vad du behöver hjälp med. Vi går tillsammans igenom nästa steg. Behöver något ytterligare göras under arbetet kontaktar vi dig först.
              </p>
              <div className="ev-action">
                <a href="tel:0705533395" className="ev-cta-btn">
                  <PhoneIcon className="ev-cta-icon" />
                  <span>Ring oss: 070-553 33 95</span>
                </a>
              </div>
            </div>

            <div className="ev-steps-panel">
              <div className="ev-steps-list">
                {steps.map(step => (
                  <div className="ev-step" key={step.num}>
                    <div className="ev-step__num" aria-hidden="true">
                      {step.num}
                    </div>
                    <div className="ev-step__content">
                      <h3 className="ev-step__title">{step.title}</h3>
                      <p className="ev-step__desc">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
