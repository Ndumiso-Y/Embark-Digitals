import React from 'react'
import { FiMonitor, FiEdit3, FiShare2, FiSearch, FiMail, FiImage } from 'react-icons/fi'

const services = [
  {
    title: 'Web Design',
    desc: 'Crafting visually stunning websites that captivate audiences, enhance user experience, and elevate brand presence for lasting impressions',
    Icon: FiMonitor,
  },
  {
    title: 'Copy Writing',
    desc: 'Compelling copy that persuades, engages, and inspires action, driving brand impact, customer engagement, and conversions with powerful storytelling.',
    Icon: FiEdit3,
  },
  {
    title: 'Social Media Management',
    desc: 'Building brand authority through strategic content, fostering engagement, and connecting with audiences for enhanced brand visibility and lasting relationships',
    Icon: FiShare2,
  },
  {
    title: 'SEO',
    desc: 'Strategically optimizing web presence to enhance visibility, attract targeted traffic, and secure top rankings for sustained online success and growth',
    Icon: FiSearch,
  },
  {
    title: 'Email Marketing',
    desc: 'Strategically impactful messages that nurture relationships, drive conversions, and maintain customer engagement, ensuring lasting brand loyalty and sustained business growth.',
    Icon: FiMail,
  },
  {
    title: 'Graphic Design',
    desc: 'Graphic Design for all your digital platforms.',
    Icon: FiImage,
  },
]

export default function Services(){
  return (
    <section id="services" className="section anchor-offset">
      <div className="container">
        <h2 className="h2">Services</h2>
        <p className="lead mt-3">
          Choose a focused service or bundle for launch. We deliver on-brand, scalable, and easy-to-edit assets.
        </p>

        <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map(({ title, desc, Icon }) => (
            <article key={title} className="card card-raise relative overflow-hidden">
              <div className="absolute -top-16 -right-16 w-40 h-40 rounded-full bg-brand-500/10 blur-2xl" />
              <div className="w-12 h-12 rounded-xl bg-brand-500/15 ring-1 ring-brand-500/30 flex items-center justify-center mb-4">
                <Icon className="text-xl text-brand-700" aria-hidden="true" />
              </div>
              <h3 className="text-xl font-semibold text-brand-700">{title}</h3>
              <p className="mt-2 text-slate-600">{desc}</p>
              <a href="#contact" className="mt-4 inline-block font-semibold text-brand-700 hover:text-brand-600">
                Embark Today →
              </a>
            </article>
          ))}
        </div>

        {/* Centered banner with gentle back-and-forth sway */}
        <div className="mt-10 flex justify-center">
          <div className="sway-x inline-flex items-center gap-2 bg-brand-500/10 text-brand-700 px-4 py-2 rounded-xl ring-1 ring-brand-500/20">
            <span className="font-semibold">We also offer</span>
            <span className="text-slate-400">|</span>
            <span>Logo Design</span>
            <span className="text-slate-400">|</span>
            <span>Video Editing</span>
            <span className="text-slate-400">|</span>
            <span>Promotional Graphic Design ( Flyers, Business Cards, Social Media Graphics )</span>
          </div>
        </div>
      </div>
    </section>
  )
}
