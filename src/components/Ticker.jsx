import React from 'react'

/**
 * Classic scrolling marquee with duplicated content for seamless loop.
 * Edit the ITEMS array to change the words.
 */
const ITEMS = [
  'WEB DESIGN', 'SEO', 'SOCIAL MEDIA MARKETING', 'COPYWRITING', 'EMAIL MARKETING', 'DIGITAL BUSINESS CARDS'
]

export default function Ticker(){
  // Build one long string with separators, then duplicate it
  const line = ` ${ITEMS.join('  |  ')} `
  const doubled = `${line}   •   ${line}`

  return (
    <section aria-label="Services ticker" className="py-6 bg-white border-y border-slate-100 overflow-hidden">
      <div className="whitespace-nowrap">
        <div className="marquee inline-block will-change-transform text-brand-700 font-semibold tracking-wide">
          {doubled}
        </div>
      </div>
    </section>
  )
}
