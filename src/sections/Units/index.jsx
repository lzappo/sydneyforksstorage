import Promotion from "../../components/Promotion";
import { units, monthlyWithTax } from "../../config/pricing";

export default function Units() {
  return (
    <section id="units" className="units">
      <div className="container">
        <h2 className="section-title">Unit Options</h2>
        <p className="section-subtitle">
          We offer a range of storage sizes to fit your needs. All units feature <span className="units__ceiling-highlight">9.5 foot ceilings</span> for extra vertical space.
        </p>
        <Promotion variant="inline" />
        <div className="units__grid">
          {units.map((unit) => (
            <article key={unit.id} className="unit-card">
              <h3 className="unit-card__title">{unit.size}</h3>
              <p className="unit-card__price">{monthlyWithTax(unit.id)}</p>
              <p className="unit-card__desc">{unit.description}</p>
            </article>
          ))}
        </div>
        <p className="units__helper">
          Not sure what size? <a href="tel:9025742282">Call us</a> or <a href="#contact">request a quote</a>—we&apos;ll help you find the right fit.
        </p>
      </div>
    </section>
  );
}
