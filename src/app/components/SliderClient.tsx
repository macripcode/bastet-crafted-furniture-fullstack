'use client';

import { useState, useEffect, useCallback } from 'react';
import '../styles/Slider/Slider.css';

export interface Banner {
  id: number;
  image_url: string;
  title: string;
  subtitle?: string;
}

interface SliderClientProps {
  banners: Banner[];
  autoPlay?: boolean;
  interval?: number;
}

export default function SliderClient({ banners, autoPlay = true, interval = 4000 }: SliderClientProps) {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % banners.length);
  }, [banners.length]);

  const prev = useCallback(() => {
    setCurrent((prev) => (prev - 1 + banners.length) % banners.length);
  }, [banners.length]);

  useEffect(() => {
    if (!autoPlay || paused) return;
    const timer = setInterval(next, interval);
    return () => clearInterval(timer);
  }, [autoPlay, paused, interval, next]);

  if (banners.length === 0) return null;

  return (
    <div className="slider" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>

      <div className="slider-track" style={{ transform: `translateX(-${current * 100}%)` }}>
        {banners.map((banner) => (
          <div key={banner.id} className="slider-slide">
            <img src={banner.image_url} alt={banner.title} className="slider-image" />
            <div className="slider-overlay">
              <h2 className="slider-title">{banner.title}</h2>
              {banner.subtitle && <p className="slider-subtitle">{banner.subtitle}</p>}
            </div>
          </div>
        ))}
      </div>

      <button className="slider-arrow slider-arrow--prev" onClick={prev} aria-label="Anterior">‹</button>
      <button className="slider-arrow slider-arrow--next" onClick={next} aria-label="Siguiente">›</button>

      <div className="slider-dots">
        {banners.map((_, i) => (
          <button
            key={i}
            className={`slider-dot ${i === current ? 'slider-dot--active' : ''}`}
            onClick={() => setCurrent(i)}
            aria-label={`Ir a slide ${i + 1}`}
          />
        ))}
        <button
          className="slider-pause"
          onClick={() => setPaused((p) => !p)}
          aria-label={paused ? 'Reanudar' : 'Pausar'}
        >
          {paused ? '▶' : '⏸'}
        </button>
      </div>

    </div>
  );
}
