import React from 'react';
import { PhoneIcon } from '../icons/PhoneIcon'
import { Button } from '../ui/Button'
import { GoogleReviews } from '../GoogleReviews'

type HeroProps = {
  onBookingClick: () => void;
};

export function Hero({ onBookingClick }: HeroProps) {
  return (
    <section className="hero" id="hem">
      <div className="hero__frame">
        <div className="hero__bg" aria-hidden="true" />

        <div className="hero__content">
          <div className="container">
            <div className="hero__inner">
              <div className="hero__text">
                <div className="hero__eyebrow">
                  Din bilverkstad i Brynäs, Gävle
                </div>
                <h1 className="hero__title">
                  <span>Din bil</span>
                  <span className="hero__title-accent">Förtjänar</span>
                  <span>det bästa</span>
                </h1>
                <p className="hero__subtitle">
                  Brynäs Bilservice är din lokala, oberoende verkstad i Gävle. Vi utför all typ av service och reparation — för alla bilmärken, till konkurrenskraftiga priser.
                </p>
                <div className="hero__actions">
                  <Button onClick={onBookingClick} variant="primary">Boka tid</Button>
                  <Button href="tel:+46705533395" variant="outline">
                    <PhoneIcon className="w-4 h-4" />
                    Ring oss nu
                  </Button>
                </div>
              </div>

              <GoogleReviews />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
