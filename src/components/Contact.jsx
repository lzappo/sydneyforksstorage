import { useState } from "react";
import logo from "../assets/optimized/logo.jpeg";

// Formspree: Set VITE_FORMSPREE_ENDPOINT in .env to your Formspree form ID
// Example: VITE_FORMSPREE_ENDPOINT=https://formspree.io/f/YOUR_FORM_ID
const formspreeEndpoint = import.meta.env.VITE_FORMSPREE_ENDPOINT || "";

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formspreeEndpoint) {
      const form = e.target;
      fetch(formspreeEndpoint, {
        method: "POST",
        body: new FormData(form),
        headers: { Accept: "application/json" },
      })
        .then((res) => {
          if (res.ok) setSubmitted(true);
        })
        .catch(() => {});
    } else {
      // mailto fallback when Formspree not configured
      const form = e.target;
      const name = form.name?.value || "";
      const email = form.email?.value || "";
      const message = form.message?.value || "";
      const subject = encodeURIComponent(`Quote Request from ${name}`);
      const body = encodeURIComponent(
        `Name: ${name}\nEmail/Phone: ${email}\n\nMessage:\n${message}`
      );
      window.location.href = `mailto:sfstorage@outlook.com?subject=${subject}&body=${body}`;
      setSubmitted(true);
    }
  };

  return (
    <section id="contact" className="contact">
      <div
        className="contact__bg"
        style={{ backgroundImage: `url(${logo})` }}
        aria-hidden="true"
      />
      <div className="contact__overlay" aria-hidden="true" />
      <div className="container contact__inner">
        <h2 className="section-title">Request a Quote</h2>
        <p className="section-subtitle">
          Fill out the form below or call us directly for a quick quote.
        </p>
        <div className="contact__content">
          <div className="contact__phone-block">
            <p className="contact__phone-label">Prefer to call?</p>
            <a href="tel:9025742282" className="contact__phone-link">
              902-574-2282
            </a>
            <a href="mailto:sfstorage@outlook.com" className="contact__email">
              sfstorage@outlook.com
            </a>
            <a href="https://www.facebook.com/people/Sydney-Forks-Self-Storage/61575293816009/" target="_blank" rel="noopener noreferrer" className="contact__facebook" aria-label="Facebook">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </a>
          </div>
          <form
            className="contact__form"
            onSubmit={handleSubmit}
            action={formspreeEndpoint || "#"}
            method="POST"
          >
            <label htmlFor="contact-name" className="form-label">Name</label>
            <input
              id="contact-name"
              name="name"
              type="text"
              required
              autoComplete="name"
              className="form-input"
              placeholder="Your name"
            />
            <label htmlFor="contact-email" className="form-label">Email or Phone</label>
            <input
              id="contact-email"
              name="email"
              type="text"
              required
              inputMode="email"
              autoComplete="email"
              className="form-input"
              placeholder="your@email.com or 902-XXX-XXXX"
            />
            <label htmlFor="contact-message" className="form-label">Message</label>
            <textarea
              id="contact-message"
              name="message"
              rows={4}
              required
              className="form-input form-textarea"
              placeholder="Tell us about your storage needs (size, duration, etc.)"
            />
            {submitted && (
              <p className="form-success">Thank you! We&apos;ll be in touch soon.</p>
            )}
            <button type="submit" className="button button--primary button--large">
              Request a Quote
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
