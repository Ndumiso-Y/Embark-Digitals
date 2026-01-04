// F:\Digital Agency\Embark Digitals\Website\embark-react\src\pages\Projects.jsx
import React, { useEffect } from 'react'
import CaseStudyCard from '../components/CaseStudyCard.jsx'

export default function Projects(){
  useEffect(() => { document.title = 'Projects — Embark Digitals' }, [])

  return (
    <section className="section">
      <div className="container">
        <h1 className="h2">Projects</h1>
        <p className="lead mt-3">
          A growing selection of our recent work.
        </p>

        <div className="mt-10 grid sm:grid-cols-2 gap-6">
          <CaseStudyCard
            title="Dr BM F Nkabinde — Professional Website"
            img="/screenshotdoc.webp"
            url="https://www.drbmfnkabinde.com/"
            tags={['Web Design', 'Mobile-First', 'Performance']}
            summary="Clean, credible, and easy to navigate—built to inspire trust and convert visitors."
          />
        </div>
      </div>
    </section>
  )
}
