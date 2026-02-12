export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container footer__inner">
        <div className="footer__brand">
          <span className="footer__name">Sydney Forks Self Storage</span>
          <a href="tel:9025742282" className="footer__phone">902-574-2282</a>
          <a href="mailto:sfstorage@outlook.com" className="footer__email">sfstorage@outlook.com</a>
        </div>
        <nav className="footer__nav" aria-label="Footer navigation">
          <a href="#units">Units</a>
          <a href="#features">Why Choose Us</a>
          <a href="#reviews">Reviews</a>
          <a href="#location">Location</a>
          <a href="#contact">Contact</a>
        </nav>
        <div className="footer__bottom">
          <p className="footer__copy">
            &copy; {currentYear} Sydney Forks Self Storage. All rights reserved.
          </p>
          <a
            href="https://luizappitelli.vercel.app"
            target="_blank"
            rel="noopener noreferrer"
            className="footer__built-by"
          >
            Built by Zappisoft
          </a>
        </div>
      </div>
    </footer>
  );
}
