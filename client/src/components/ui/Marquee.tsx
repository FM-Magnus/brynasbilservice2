import React from 'react';

interface MarqueeProps {
  items: string[];
  speed?: number; // seconds for one loop
  className?: string;
}

export function Marquee({ items, speed = 20, className = '' }: MarqueeProps) {
  const content = items.join(' • ');
  // Repeat enough copies so the track is always wider than any viewport
  const copies = Array.from({ length: 6 }, (_, i) => (
    <span key={i} className="marquee__content">{content} • </span>
  ));

  return (
    <div className={`marquee ${className}`}>
      <div
        className="marquee__track"
        style={{ animationDuration: `${speed}s` }}
      >
        {copies}
      </div>
    </div>
  );
}
