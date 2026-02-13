import { HelmetProvider, Helmet } from "react-helmet-async";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Gallery from "./components/Gallery";
import Reveal from "./components/Reveal";
import Features from "./components/Features";
import Units from "./components/Units";
import WhyChooseUs from "./components/WhyChooseUs";
import Reviews from "./components/Reviews";
import Location from "./components/Location";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import MobileCTA from "./components/MobileCTA";
import "./styles.css";

// TODO: Replace with your production URL for canonical and Open Graph
const SITE_URL = import.meta.env.VITE_SITE_URL || "https://sydneyforksselfstorage.ca";

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "SelfStorage",
  name: "Sydney Forks Self Storage",
  telephone: "+1-902-574-2282",
  areaServed: {
    "@type": "Place",
    name: "Sydney Forks, Nova Scotia",
    containedInPlace: {
      "@type": "Place",
      name: "Nova Scotia, Canada",
    },
  },
  url: SITE_URL,
  email: "sfstorage@outlook.com",
  address: {
    "@type": "PostalAddress",
    streetAddress: "2627 King's Rd",
    addressLocality: "Sydney Forks",
    addressRegion: "NS",
    postalCode: "B1L1A1",
    addressCountry: "CA",
  },
  openingHours: "Mo-Su 00:00-23:59",
  sameAs: ["https://www.facebook.com/people/Sydney-Forks-Self-Storage/61575293816009/"],
};

export default function App() {
  return (
    <HelmetProvider>
      <Helmet>
        <html lang="en" />
        <title>Sydney Forks Self Storage | Storage Units in Sydney Forks, NS</title>
        <meta
          name="description"
          content="Secure, affordable self storage in Sydney Forks, Nova Scotia. Convenient access, flexible rentals. Call 902-574-2282 for a quote."
        />
        <link rel="canonical" href={SITE_URL} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={SITE_URL} />
        <meta property="og:title" content="Sydney Forks Self Storage | Storage Units in Sydney Forks, NS" />
        <meta
          property="og:description"
          content="Secure, affordable self storage in Sydney Forks, Nova Scotia. Convenient access, flexible rentals. Call 902-574-2282 for a quote."
        />
        <meta property="og:locale" content="en_CA" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Sydney Forks Self Storage | Storage Units in Sydney Forks, NS" />
        <meta
          name="twitter:description"
          content="Secure, affordable self storage in Sydney Forks, Nova Scotia. Convenient access, flexible rentals. Call 902-574-2282 for a quote."
        />
      </Helmet>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
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
    </HelmetProvider>
  );
}
