import Header from "./components/Header";
import Hero from "./sections/Hero";
import Gallery from "./sections/Gallery";
import Reveal from "./components/Reveal";
import Features from "./sections/Features";
import Units from "./sections/Units";
import WhyChooseUs from "./sections/WhyChooseUs";
import Reviews from "./sections/Reviews";
import Location from "./sections/Location";
import Contact from "./sections/Contact";
import Footer from "./components/Footer";
import MobileCTA from "./components/MobileCTA";
import "./styles.css";

export default function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Reveal>
          <Gallery />
        </Reveal>
        <Reveal>
          <Features />
        </Reveal>
        <Reveal>
          <Units />
        </Reveal>
        <Reveal>
          <WhyChooseUs />
        </Reveal>
        <Reveal>
          <Reviews />
        </Reveal>
        <Reveal>
          <Location />
        </Reveal>
        <Reveal>
          <Contact />
        </Reveal>
      </main>
      <Footer />
      <MobileCTA />
    </>
  );
}
