import { useState, useEffect } from "react";
import Reveal from "./Reveal";
import img1 from "../assets/optimized/hero.jpeg";
import img2 from "../assets/optimized/IMG_3846.jpeg";
import img3 from "../assets/optimized/IMG_3848.jpeg";
import img4 from "../assets/optimized/IMG_3865.jpeg";
import img5 from "../assets/optimized/IMG_3866.jpeg";
import img6 from "../assets/optimized/IMG_8273.jpeg";

const images = [
  { src: img1, alt: "Sydney Forks Self Storage facility exterior" },
  { src: img2, alt: "Sydney Forks Self Storage units" },
  { src: img3, alt: "Sydney Forks Self Storage facility" },
  { src: img6, alt: "Sydney Forks Self Storage property" },
  { src: img4, alt: "Sydney Forks Self Storage building" },
  { src: img5, alt: "Sydney Forks Self Storage storage units" },
];

export default function Gallery() {
  const [selectedIndex, setSelectedIndex] = useState(null);

  const closeLightbox = () => setSelectedIndex(null);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") closeLightbox();
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, []);

  useEffect(() => {
    if (selectedIndex !== null) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [selectedIndex]);

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) closeLightbox();
  };

  return (
    <section className="gallery" aria-labelledby="gallery-heading">
      <h2 id="gallery-heading" className="visually-hidden">
        Facility photos
      </h2>
      <div className="container">
        <div className="gallery__grid">
          {images.map((img, index) => (
            <Reveal key={index}>
              <div
                className="gallery__item"
                onClick={() => setSelectedIndex(index)}
              onKeyDown={(e) => e.key === "Enter" && setSelectedIndex(index)}
              role="button"
              tabIndex={0}
              aria-label={`View ${img.alt}`}
            >
              <img
                src={img.src}
                alt={img.alt}
                loading="lazy"
                className="gallery__img"
              />
            </div>
            </Reveal>
          ))}
        </div>
      </div>

      {selectedIndex !== null && (
        <div
          className="gallery__lightbox"
          onClick={handleBackdropClick}
          role="dialog"
          aria-modal="true"
          aria-label="Enlarged facility photo"
        >
          <button
            type="button"
            className="gallery__close"
            onClick={closeLightbox}
            aria-label="Close"
          >
            ×
          </button>
          <img
            src={images[selectedIndex].src}
            alt={images[selectedIndex].alt}
            className="gallery__lightbox-img"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </section>
  );
}
