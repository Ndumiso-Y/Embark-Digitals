// F:\Digital Agency\Embark Digitals\Website\embark-react\src\components\Hero.jsx
import React from 'react'

export default function Hero(){
  return (
    <section className="relative overflow-hidden">
      {/* Subtle animated background accents (remove if you want a flat bg) */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div className="absolute -top-24 -left-24 w-72 h-72 rounded-full bg-brand-500/30 blur-3xl animate-float" />
        <div className="absolute -bottom-24 -right-24 w-96 h-96 rounded-full bg-brand-700/30 blur-3xl animate-slow-spin" />
      </div>

      <div className="section">
        {/* Give the image more room than text */}
        <div className="container grid lg:grid-cols-[1.3fr_1fr] gap-12 items-center">
          {/* LEFT: logo art — larger but contained on big screens */}
          <div className="order-1 lg:order-none flex justify-center lg:justify-start">
            <img
              src="/logo.png"    /* swap to /logo.svg if you prefer */
              alt="Embark Digitals artwork"
              className="
                w-full h-auto object-contain select-none pointer-events-none
                max-w-[560px] sm:max-w-[660px] md:max-w-[780px] lg:max-w-[920px] xl:max-w-[1040px]
              "
              width="1600"
              height="900"
              loading="eager"
            />
          </div>

          {/* RIGHT: headline, copy, CTA */}
          <div className="relative z-10">
            <h1 className="h1">Embark Digitals</h1>
            <p className="lead mt-4">
              Welcome to Embark Digitals, where we craft digital success through partnership and innovation.
              As your dedicated collaborators, we specialize in SEO, Social Media Management,
              Copywriting, Email Marketing, and Web Design. Together, let&apos;s navigate the digital landscape,
              ensuring every step leads to a future of measurable success.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#contact" className="btn-primary bg-accent-500 hover:bg-brand-700">Embark Today</a>
              <a href="#services" className="btn-secondary">See services</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
