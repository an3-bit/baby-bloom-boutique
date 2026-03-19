import { useState, useEffect } from "react";

interface Props {
  images: string[];
  alt: string;
  /** Slide interval in ms (default 4000) */
  interval?: number;
  className?: string;
}

/**
 * Auto-sliding image carousel that slowly transitions left-to-right.
 * Shows dot indicators for the current image.
 */
export default function ImageSlider({ images, alt, interval = 4000, className = "" }: Props) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (images.length <= 1) return;
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, interval);
    return () => clearInterval(timer);
  }, [images.length, interval]);

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <div
        className="flex transition-transform duration-1000 ease-in-out h-full"
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {images.map((src, i) => (
          <img
            key={i}
            src={src}
            alt={`${alt} - image ${i + 1}`}
            className="w-full h-full object-cover flex-shrink-0"
            loading={i === 0 ? "eager" : "lazy"}
          />
        ))}
      </div>
      {/* Dot indicators */}
      {images.length > 1 && (
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                i === current
                  ? "bg-primary w-4"
                  : "bg-primary/40"
              }`}
              aria-label={`Show image ${i + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
