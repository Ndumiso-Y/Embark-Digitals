// F:\Digital Agency\Embark Digitals\Website\embark-react\src\pages\Home.jsx
import React, { useEffect } from 'react'
import Hero from '../components/Hero.jsx'
import Ticker from '../components/Ticker.jsx'
import Services from '../components/Services.jsx'
import CTA from '../components/CTA.jsx'
import Contact from '../components/Contact.jsx'
import CaseStudyCard from '../components/CaseStudyCard.jsx'
import GlowDivider from '../components/GlowDivider.jsx'

export default function Home(){
  useEffect(() => {
    document.title = 'Embark Digitals — Websites & Promo Designs'
  }, [])

  return (
    <>
      <a id="top" />
      <Hero />
      <Ticker />

      {/* subtle animated glow to add pop */}
      <div className="container"><GlowDivider /></div>

      <Services />

      {/* Projects on Homepage */}
      <section className="section bg-white reveal">
        <div className="container">
          <div className="flex items-end justify-between gap-4">
            <h2 className="h2">Projects</h2>
            <a href="/projects" className="text-sm font-semibold text-brand-700 hover:text-brand-600" target="_blank" rel="noreferrer noopener">
              See all projects →
            </a>
          </div>
          <p className="lead mt-3">
            Immerse yourself in our array of website designs, where every project exemplifies our dedication to custom
            solutions tailored to diverse client needs and industries.
          </p>

          <div className="mt-8">
            <CaseStudyCard
              title="Dr BM F Nkabinde — Professional Website"
              img="/screenshotdoc.webp"
              url="https://www.drbmfnkabinde.com/"
              tags={['Web Design', 'Mobile-First', 'Performance']}
              summary="A polished, trust-first site with simple information flow, strong headings, and fast loading across devices."
            />
          </div>
        </div>
      </section>

      <CTA />
      <Contact />
    </>
  )
}
