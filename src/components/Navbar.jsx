// F:\Digital Agency\Embark Digitals\Website\embark-react\src\components\Navbar.jsx
import React, { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'

const links = [
  { to: '/', label: 'Home' },
  { to: '/#services', label: 'Services', hash: true },
  { to: '/projects', label: 'Projects' },
  { to: '/#contact', label: 'Contact', hash: true },
]

export default function Navbar(){
  const [activeHash, setActiveHash] = useState('')

  useEffect(() => {
    const handler = () => {
      const order = ['services','contact']
      let current = ''
      for (const id of order) {
        const el = document.getElementById(id)
        if (!el) continue
        const rect = el.getBoundingClientRect()
        if (rect.top < 140 && rect.bottom > 140) { current = `#${id}`; break }
      }
      setActiveHash(current)
    }
    handler()
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b border-slate-100">
      <div className="container flex items-center justify-between h-16">
        <Link className="flex items-center gap-3" to="/" aria-label="Go to home">
          <img src="/logo.png" alt="" className="w-28 h-auto" />
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          {links.map((l) => (
            l.hash ? (
              <a key={l.label} href={l.to} className={`text-sm font-medium ${activeHash === l.to ? 'text-brand-700' : 'text-slate-700 hover:text-brand-700'}`}>
                {l.label}
              </a>
            ) : (
              <NavLink key={l.label} to={l.to} className={({isActive}) => `text-sm font-medium ${isActive ? 'text-brand-700' : 'text-slate-700 hover:text-brand-700'}`}>
                {l.label}
              </NavLink>
            )
          ))}
          <a
            href="https://wa.me/message/MDL4XKDNZVLHE1"
            target="_blank"
            rel="noreferrer noopener"
            className="btn-primary text-sm"
          >
            Embark Today
          </a>
        </nav>

        {/* Mobile menu */}
        <details className="md:hidden">
          <summary className="list-none cursor-pointer p-2 rounded-xl hover:bg-slate-50" aria-label="Toggle menu">☰</summary>
          <div className="absolute right-4 mt-2 w-56 rounded-2xl border border-slate-200 bg-white shadow-md p-2 flex flex-col">
            {links.map((l) => l.hash ? (
              <a key={l.label} href={l.to} className="px-3 py-2 rounded-xl hover:bg-slate-50">{l.label}</a>
            ) : (
              <NavLink key={l.label} to={l.to} className="px-3 py-2 rounded-xl hover:bg-slate-50">{l.label}</NavLink>
            ))}
            <a
              href="https://wa.me/message/MDL4XKDNZVLHE1"
              target="_blank"
              rel="noreferrer noopener"
              className="btn-primary mt-2 text-center"
            >
              Embark Today
            </a>
          </div>
        </details>
      </div>
    </header>
  )
}
