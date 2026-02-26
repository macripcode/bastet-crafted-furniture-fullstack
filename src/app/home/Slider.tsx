'use client';

import { useState, useEffect, useCallback } from 'react';
import '../styles/Slider/Slider.css';

interface Slide {
  id: number;
  image_url: string;
  title: string;
  subtitle?: string;
}

interface SliderProps {
  slides: Slide[];
  autoPlay?: boolean;
  interval?: number;
}

function Slider({ slides, autoPlay = true, interval = 4000 }: SliderProps) {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % slides.length);
  }, [slides.length]);

  const prev = useCallback(() => {
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  }, [slides.length]);

  useEffect(() => {
    if (!autoPlay || paused) return;
    const timer = setInterval(next, interval);
    return () => clearInterval(timer);
  }, [autoPlay, paused, interval, next]);

  return (
    <div className="slider" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>

      <div className="slider-track" style={{ transform: `translateX(-${current * 100}%)` }}>
        {slides.map((slide) => (
          <div key={slide.id} className="slider-slide">
            <img src={slide.image_url} alt={slide.title} className="slider-image" />
            <div className="slider-overlay">
              <h2 className="slider-title">{slide.title}</h2>
              {slide.subtitle && <p className="slider-subtitle">{slide.subtitle}</p>}
            </div>
          </div>
        ))}
      </div>

      <button className="slider-arrow slider-arrow--prev" onClick={prev} aria-label="Anterior">‹</button>
      <button className="slider-arrow slider-arrow--next" onClick={next} aria-label="Siguiente">›</button>

      <div className="slider-dots">
        {slides.map((_, i) => (
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

export default Slider;
