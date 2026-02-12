import { useState, useEffect } from "react";

export const navLinks = [
  { href: "#units", label: "Units" },
  { href: "#features", label: "Why Choose Us" },
  { href: "#reviews", label: "Reviews" },
  { href: "#location", label: "Location" },
  { href: "#contact", label: "Contact" },
];

export default function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);

  const closeNav = () => setIsOpen(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <>
      <button
        type="button"
        className="mobile-nav__toggle"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-controls="mobile-nav-menu"
        aria-label={isOpen ? "Close menu" : "Open menu"}
      >
        <span className="mobile-nav__hamburger" aria-hidden="true">
          {isOpen ? "✕" : "☰"}
        </span>
      </button>
      <div
        id="mobile-nav-menu"
        className={`mobile-nav__overlay ${isOpen ? "mobile-nav__overlay--open" : ""}`}
        aria-hidden={!isOpen}
      >
        <div
          className="mobile-nav__backdrop"
          onClick={closeNav}
          aria-hidden="true"
        />
        <nav className="mobile-nav__menu" aria-label="Mobile navigation">
          <button
            type="button"
            className="mobile-nav__close"
            onClick={closeNav}
            aria-label="Close menu"
          >
            ✕
          </button>
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="mobile-nav__link"
              onClick={closeNav}
            >
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </>
  );
}
