import { useState } from "react";
import logo from "../assets/optimized/logo.jpeg";
import MobileNav, { navLinks } from "./MobileNav";

export default function Header() {
  const [logoError, setLogoError] = useState(false);

  return (
    <header className="header">
      <a href="/" className="header__logo" aria-label="Sydney Forks Self Storage - Home">
        {!logoError && (
          <img
            src={logo}
            alt="Sydney Forks Self Storage roadside sign and logo"
            width="180"
            height="48"
            loading="eager"
            className="header__logo-img"
            onError={() => setLogoError(true)}
          />
        )}
        <span className={`header__logo-text ${logoError ? "header__logo-text--visible" : ""}`}>
          Sydney Forks Self Storage
        </span>
      </a>
      <nav className="header__nav" aria-label="Main navigation">
        {navLinks.map((link) => (
          <a key={link.href} href={link.href} className="header__nav-link">
            {link.label}
          </a>
        ))}
      </nav>
      <div className="header__right">
        <a href="tel:9025742282" className="header__phone">
          902-574-2282
        </a>
        <a href="#contact" className="header__cta button button--primary">
          Get a Quote
        </a>
        <div className="header__mobile-nav">
          <MobileNav />
        </div>
      </div>
    </header>
  );
}
