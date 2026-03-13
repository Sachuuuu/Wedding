'use client';

import { useEffect, useMemo, useState } from 'react';
import { siteConfig } from '@/lib/config';
import { formatCountdownUnit } from '@/lib/utils';

function getTimeLeft(targetDate: string) {
  const now = new Date().getTime();
  const target = new Date(targetDate).getTime();
  const diff = Math.max(target - now, 0);

  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / 1000 / 60) % 60),
    seconds: Math.floor((diff / 1000) % 60),
    isExpired: diff <= 0,
  };
}

export function Countdown() {
  const [mounted, setMounted] = useState(false);
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isExpired: false,
  });

  useEffect(() => {
    setMounted(true);
    setTimeLeft(getTimeLeft(siteConfig.weddingDate));

    const interval = setInterval(() => {
      setTimeLeft(getTimeLeft(siteConfig.weddingDate));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const items = useMemo(
    () => [
      { label: 'Days', value: timeLeft.days },
      { label: 'Hours', value: timeLeft.hours },
      { label: 'Minutes', value: timeLeft.minutes },
      { label: 'Seconds', value: timeLeft.seconds },
    ],
    [timeLeft]
  );

  if (!mounted) {
    return (
      <div className="card-luxury gradient-ring mx-auto grid max-w-4xl grid-cols-2 gap-4 p-5 sm:grid-cols-4 sm:p-8">
        {['Days', 'Hours', 'Minutes', 'Seconds'].map((label) => (
          <div
            key={label}
            className="rounded-2xl border border-gold/10 bg-gradient-to-br from-white to-champagne/40 p-5 text-center"
          >
            <div className="text-3xl font-semibold text-ink sm:text-5xl">
              --
            </div>
            <div className="mt-2 text-xs font-semibold uppercase tracking-[0.25em] text-gold">
              {label}
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (timeLeft.isExpired) {
    return (
      <div className="card-luxury mx-auto max-w-3xl p-8 text-center">
        <p className="text-sm uppercase tracking-[0.3em] text-gold">
          The day is here
        </p>
        <h3 className="mt-3 text-3xl">We’re celebrating today</h3>
      </div>
    );
  }

  return (
    <div className="card-luxury gradient-ring mx-auto grid max-w-4xl grid-cols-2 gap-4 p-5 sm:grid-cols-4 sm:p-8">
      {items.map((item) => (
        <div
          key={item.label}
          className="rounded-2xl border border-gold/10 bg-gradient-to-br from-white to-champagne/40 p-5 text-center"
        >
          <div className="text-3xl font-semibold text-ink sm:text-5xl">
            {formatCountdownUnit(item.value)}
          </div>
          <div className="mt-2 text-xs font-semibold uppercase tracking-[0.25em] text-gold">
            {item.label}
          </div>
        </div>
      ))}
    </div>
  );
}
