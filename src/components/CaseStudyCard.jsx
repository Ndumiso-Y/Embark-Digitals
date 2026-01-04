import React from 'react'

export default function CaseStudyCard({
  title,
  img = '/case-drb.jpg',
  url,
  tags = ['Web Design', 'Mobile-First', 'Performance'],
  summary = 'Clean, credible, and easy to navigate—built to inspire trust and convert visitors.',
}) {
  return (
    <article className="group rounded-3xl overflow-hidden ring-1 ring-slate-200 bg-white hover:shadow-lg transition">
      <a href={url} target="_blank" rel="noreferrer" className="block relative">
        <img
          src={img}
          alt={title}
          className="w-full h-64 object-cover group-hover:scale-[1.02] transition"
          loading="lazy"
          width="1600"
          height="900"
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition" />
      </a>
      <div className="p-6">
        <div className="flex flex-wrap gap-2 mb-3">
          {tags.map(t => (
            <span key={t} className="text-xs font-semibold px-2 py-1 rounded-full bg-brand-500/10 text-brand-700 ring-1 ring-brand-500/20">
              {t}
            </span>
          ))}
        </div>
        <h3 className="text-xl font-semibold text-brand-700">{title}</h3>
        <p className="mt-2 text-slate-600">{summary}</p>
        <a href={url} target="_blank" rel="noreferrer" className="mt-4 inline-block font-semibold text-brand-700 hover:text-brand-600">
          View live site →
        </a>
      </div>
    </article>
  )
}
