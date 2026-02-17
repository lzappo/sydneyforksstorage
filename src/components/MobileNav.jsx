import { useToggle } from "../hooks/useToggle";
import { useBodyScrollLock } from "../hooks/useBodyScrollLock";

export const navLinks = [
  { href: "#units", label: "Units" },
  { href: "#features", label: "Why Choose Us" },
  { href: "#reviews", label: "Reviews" },
  { href: "#location", label: "Location" },
  { href: "#contact", label: "Contact" },
];

export default function MobileNav() {
  const [isOpen, toggle, setOpen] = useToggle(false);

  useBodyScrollLock(isOpen);

  return (
    <>
      <button
        type="button"
        className="mobile-nav__toggle"
        onClick={toggle}
        aria-expanded={isOpen}
        aria-controls="mobile-nav-menu"
        aria-label={isOpen ? "Close menu" : "Open menu"}
      >
        <span className="mobile-nav__icon" aria-hidden="true">
          {isOpen ? (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <line x1="6" y1="6" x2="18" y2="18" />
              <line x1="18" y1="6" x2="6" y2="18" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <line x1="4" y1="6" x2="20" y2="6" />
              <line x1="4" y1="12" x2="20" y2="12" />
              <line x1="4" y1="18" x2="20" y2="18" />
            </svg>
          )}
        </span>
      </button>
      <div
        id="mobile-nav-menu"
        className={`mobile-nav__overlay ${isOpen ? "mobile-nav__overlay--open" : ""}`}
        aria-hidden={!isOpen}
      >
        <div
          className="mobile-nav__backdrop"
          onClick={() => setOpen(false)}
          aria-hidden="true"
        />
        <nav className="mobile-nav__menu" aria-label="Mobile navigation">
          <button
            type="button"
            className="mobile-nav__close"
            onClick={() => setOpen(false)}
            aria-label="Close menu"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <line x1="6" y1="6" x2="18" y2="18" />
              <line x1="18" y1="6" x2="6" y2="18" />
            </svg>
          </button>
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="mobile-nav__link"
              onClick={() => setOpen(false)}
            >
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </>
  );
}
