import React, { useState, useEffect } from 'react';

const reviews = [
  { name: 'Inge', rating: 5, text: 'Fantastisk hjälp när vi hade bilproblem runt jul. Hjälpte till att ordna en hyrbil så att vi kunde fortsätta vår resa. Och på vägen tillbaka var den reparerade bilen klar. Topp service!' },
  { name: 'Olle Blomgren', rating: 5, text: 'Fick problem med bromsok när jag var påväg hem efter semestern. Fick snabbt bromsoket bytt så jag kunde komma hem samma dag. Riktigt schysst och professionellt, rekommenderar!' },
  { name: 'Johnny Pettersson', rating: 5, text: 'Fick en hjulinställningstid direkt så jag slapp slita snett på mina nya däck!' },
  { name: 'J. Niva', rating: 5, text: '+ utmärkt kundbemötande + Bra priser. Har haft min bil på service och andra reparationer hos Shomaher flera gånger och har alltid funkat bra och billigare kostnader än märkes verkstäder.' },
  { name: 'Gunilla Lövgren', rating: 5, text: 'Haft min Toyota på lack reparation hos Shomaher som gjorde ett grymt bra jobb för priset, blev väldigt nöjd! Bra kundbemötande och hjälpsamma med beställning av tillbehör.' },
  { name: 'Calle Norlin', rating: 5, text: 'Hjälpte till med hjulinställning, fick tid bokad snabbt och smidigt. Inget att klaga på.' },
  { name: 'Jason', rating: 5, text: 'Bästa bilverkstaden, alltid fått hjälp snabbt och jobbet utfört har varit toppen! Maher är en legend.' },
  { name: 'Jocke Ersson', rating: 5, text: 'Bra bemötande man får bra servis där och mycke trevlig personal där nice' },
  { name: 'Ewa Ydreborg', rating: 5, text: 'Toppenbra varje gång, jättenöjda.' },
  { name: 'Kjell Lindqvist', rating: 5, text: 'Mycket bra och trevlig personal' },
  { name: 'abbe molle', rating: 5, text: 'Bra bemötande och bra service 👍' },
  { name: 'Yusupha Scattrel', rating: 5, text: 'Lovely' },
  { name: 'Thomas Åslund', rating: 5, text: 'Mycket bra' },
  { name: 'tobias gustaffson', rating: 5, text: 'Grym service' },
  { name: 'Krusbullen', rating: 5, text: 'Suverän service och kunskap. 🙏' },
  { name: 'Axel Dahlberg', rating: 5, text: 'Positiv: Professionalism' },
  { name: 'Göran Bertils', rating: 4, text: 'Positiv: Kvalitet, Värde' },
];

const distribution = [
  { stars: 5, count: 42, pct: 84 },
  { stars: 4, count: 4, pct: 8 },
  { stars: 3, count: 0, pct: 0 },
  { stars: 2, count: 0, pct: 0 },
  { stars: 1, count: 4, pct: 8 },
];

function StarIcon({ filled, half }: { filled?: boolean; half?: boolean }) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill={filled ? 'var(--color-gold)' : 'none'} stroke={filled ? 'var(--color-gold)' : 'var(--color-grey)'} strokeWidth="1.5">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
      {half && <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77V2z" fill="var(--color-gold)" stroke="none" />}
    </svg>
  );
}

function Stars({ rating }: { rating: number }) {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    if (i <= rating) stars.push(<StarIcon key={i} filled />);
    else stars.push(<StarIcon key={i} />);
  }
  return <div className="google-reviews__stars">{stars}</div>;
}

export function GoogleReviews() {
  const [showSummary, setShowSummary] = useState(false);
  const [showReviews, setShowReviews] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);

  useEffect(() => {
    const t1 = setTimeout(() => setShowSummary(true), 600);
    const t2 = setTimeout(() => setShowReviews(true), 1400);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  useEffect(() => {
    if (!showReviews) return;
    let idx = 0;
    setActiveIndex(0);

    const cycle = () => {
      // Fade out current review to full transparency
      setActiveIndex(-1);

      // Wait for fade-out + gap, then fade in next
      setTimeout(() => {
        idx = (idx + 1) % reviews.length;
        setActiveIndex(idx);
      }, 1800);
    };

    const interval = setInterval(cycle, 8000);
    return () => clearInterval(interval);
  }, [showReviews]);

  return (
    <div className={`google-reviews ${showSummary ? 'visible' : ''}`}>
      <div className="google-reviews__header">
        <div className="google-reviews__logo">Google</div>
        <div className="google-reviews__title">Sammanfattning av recensioner</div>
      </div>

      <div className="google-reviews__summary">
        <div className="google-reviews__bars">
          {distribution.map((d) => (
            <div key={d.stars} className="google-reviews__bar-row">
              <span className="google-reviews__bar-label">{d.stars}</span>
              <div className="google-reviews__bar-track">
                <div
                  className="google-reviews__bar-fill"
                  style={{ width: `${d.pct}%`, transitionDelay: `${(5 - d.stars) * 120}ms` }}
                />
              </div>
            </div>
          ))}
        </div>
        <div className="google-reviews__score">
          <div className="google-reviews__score-number">4,3</div>
          <Stars rating={4} />
          <div className="google-reviews__score-count">50 recensioner</div>
        </div>
      </div>

      <div className={`google-reviews__list ${showReviews ? 'visible' : ''}`}>
        {reviews.map((review, i) => (
          <div
            key={i}
            className={`google-reviews__item ${i === activeIndex ? 'active' : ''}`}
          >
            <div className="google-reviews__item-header">
              <div className="google-reviews__avatar">{review.name.charAt(0)}</div>
              <div className="google-reviews__item-meta">
                <div className="google-reviews__item-name">{review.name}</div>
              </div>
            </div>
            <div className="google-reviews__item-rating">
              <Stars rating={review.rating} />
            </div>
            <p className="google-reviews__item-text">{review.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
