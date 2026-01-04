// F:\Digital Agency\Embark Digitals\Website\embark-react\src\components\CTA.jsx
import React from 'react'

export default function CTA(){
  return (
    <section className="section bg-accent-500 text-white">
      <div className="container text-center">
        <h2 className="h2 text-white">Ready to embark?</h2>
        <p className="mt-3 text-white/90 max-w-2xl mx-auto">
          Tell us your goal. We’ll propose the quickest path to a live, effective website.
        </p>

        {/* This button only (CTA section) goes to your Tally form */}
        <a
          href="https://tally.so/r/mKk1QV"
          target="_blank"
          rel="noreferrer noopener"
          className="btn-primary mt-6 bg-brand-700 hover:bg-brand-600"
          aria-label="Open Embark Digitals Tally form in a new tab"
        >
          Embark Today
        </a>
      </div>
    </section>
  )
}
