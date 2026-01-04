// F:\Digital Agency\Embark Digitals\Website\embark-react\src\components\Contact.jsx
import React, { useState } from 'react'
import { FiMail, FiUser, FiMessageSquare, FiClock } from 'react-icons/fi'
import { FaWhatsapp } from 'react-icons/fa6'

/** Live Formspree endpoint */
const FORMSPREE_ENDPOINT = 'https://formspree.io/f/movlrjlp'

export default function Contact(){
  const [status, setStatus] = useState('idle')   // idle | submitting | success | error
  const [errorMsg, setErrorMsg] = useState('')

  async function handleSubmit(e){
    e.preventDefault()
    setStatus('submitting')
    setErrorMsg('')

    // Honeypot
    const hp = e.currentTarget.querySelector('input[name="bot_field"]')?.value || ''
    if (hp) { setStatus('success'); e.currentTarget.reset(); return }

    const form = e.currentTarget
    const data = Object.fromEntries(new FormData(form).entries())

    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({
          ...data,
          _subject: 'Website contact (Embark Digitals)',
          _gotcha: hp
        })
      })
      if (res.ok) {
        setStatus('success')
        form.reset()
      } else {
        const j = await res.json().catch(() => ({}))
        setErrorMsg(j?.error || 'Something went wrong. Please try again.')
        setStatus('error')
      }
    } catch {
      setErrorMsg('Network error. Check your connection and try again.')
      setStatus('error')
    }
  }

  return (
    <section id="contact" className="section anchor-offset relative overflow-hidden">
      {/* soft background accents */}
      <div className="pointer-events-none absolute -top-24 -left-24 w-96 h-96 rounded-full bg-brand-500/15 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -right-24 w-[28rem] h-[28rem] rounded-full bg-accent-500/20 blur-3xl" />

      <div className="container grid lg:grid-cols-2 gap-12 items-start">
        {/* Left: pitch + quick actions */}
        <div className="reveal">
          <h2 className="h2">Contact</h2>
          <p className="lead mt-3">
            Prefer WhatsApp or email? Choose what’s fastest for you. We usually reply the same day.
          </p>

          <div className="mt-6 grid sm:grid-cols-2 gap-4">
            <a
              href="https://wa.me/message/MDL4XKDNZVLHE1"
              target="_blank" rel="noreferrer noopener"
              className="group card bg-gradient-to-br from-brand-500/10 to-brand-700/10 ring-1 ring-brand-500/20 hover:from-brand-500/15 hover:to-brand-700/15"
            >
              <div className="flex items-center gap-3">
                <span className="w-10 h-10 rounded-xl bg-brand-700 text-white grid place-items-center">
                  <FaWhatsapp />
                </span>
                <div>
                  <div className="font-semibold text-brand-700">WhatsApp us</div>
                  <div className="text-sm text-slate-600">Instant message or call via WhatsApp</div>
                </div>
              </div>
            </a>

            <a
              href="mailto:contact@embarkdigitals.com"
              className="group card bg-white ring-1 ring-slate-200 hover:shadow-md"
            >
              <div className="flex items-center gap-3">
                <span className="w-10 h-10 rounded-xl bg-slate-800 text-white grid place-items-center">
                  <FiMail />
                </span>
                <div>
                  <div className="font-semibold text-slate-900">Email us</div>
                  <div className="text-sm text-slate-600">contact@embarkdigitals.com</div>
                </div>
              </div>
            </a>
          </div>

          <div className="mt-4 text-sm text-slate-500 flex items-center gap-2">
            <FiClock /> we will get back to you
          </div>
        </div>

        {/* Right: glass form with floating labels */}
        <form
          className="reveal relative rounded-3xl bg-white/70 backdrop-blur-md ring-1 ring-white/50 shadow-xl p-6 md:p-8"
          onSubmit={handleSubmit}
          aria-label="Contact form"
          acceptCharset="UTF-8"
        >
          <div className="absolute -top-1 -left-1 -right-1 h-px bg-gradient-to-r from-transparent via-accent-500/60 to-transparent" />

          <h3 className="text-xl font-semibold text-brand-700">Send a message</h3>

          {/* Honeypot */}
          <input type="text" name="bot_field" tabIndex="-1" autoComplete="off" className="hidden" />

          {/* Name */}
          <div className="mt-5 relative">
            <div className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
              <FiUser />
            </div>
            <input
              id="name"
              name="name"
              placeholder=" "
              required
              autoComplete="name"
              className="peer w-full rounded-xl border border-slate-300 bg-white/80 pl-10 pr-3 py-3 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/40"
            />
            <label
              htmlFor="name"
              className="absolute left-10 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none
                        transition-all duration-150 ease-out
                        peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base
                        peer-focus:-top-2 peer-focus:text-xs peer-focus:text-brand-700
                        peer-not-placeholder-shown:-top-2 peer-not-placeholder-shown:text-xs"
            >
              Name
            </label>
          </div>

          {/* Email */}
          <div className="mt-4 relative">
            <div className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
              <FiMail />
            </div>
            <input
              id="email"
              type="email"
              name="email"
              placeholder=" "
              required
              autoComplete="email"
              className="peer w-full rounded-xl border border-slate-300 bg-white/80 pl-10 pr-3 py-3 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/40"
            />
            <label
              htmlFor="email"
              className="absolute left-10 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none
                        transition-all duration-150 ease-out
                        peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base
                        peer-focus:-top-2 peer-focus:text-xs peer-focus:text-brand-700
                        peer-not-placeholder-shown:-top-2 peer-not-placeholder-shown:text-xs"
            >
              Email
            </label>
          </div>

          {/* Message */}
          <div className="mt-4 relative">
            <div className="pointer-events-none absolute left-3 top-3 text-slate-400">
              <FiMessageSquare />
            </div>
            <textarea
              id="message"
              name="message"
              placeholder=" "
              rows="5"
              required
              className="peer w-full rounded-xl border border-slate-300 bg-white/80 pl-10 pr-3 py-3 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/40"
            />
            <label
              htmlFor="message"
              className="absolute left-10 top-3 text-slate-500 pointer-events-none
                        transition-all duration-150 ease-out
                        peer-placeholder-shown:top-3 peer-placeholder-shown:text-base
                        peer-focus:-top-2 peer-focus:text-xs peer-focus:text-brand-700
                        peer-not-placeholder-shown:-top-2 peer-not-placeholder-shown:text-xs"
            >
              Message
            </label>
          </div>

          <button
            className="btn-primary mt-6 disabled:opacity-60 disabled:cursor-not-allowed"
            type="submit"
            disabled={status === 'submitting'}
          >
            {status === 'submitting' ? 'Sending…' : 'Send'}
          </button>

          {/* Status */}
          <div className="mt-3 min-h-[1.25rem]" aria-live="polite">
            {status === 'success' && <p className="text-sm text-green-700">Thanks! Your message has been sent. We’ll get back to you shortly.</p>}
            {status === 'error' && <p className="text-sm text-red-700">{errorMsg}</p>}
          </div>

          <p className="text-xs text-slate-500 mt-3">
            By submitting, you agree to be contacted about your request.
          </p>
        </form>
      </div>
    </section>
  )
}
