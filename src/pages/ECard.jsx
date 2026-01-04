// F:\Digital Agency\Embark Digitals\Website\embark-react\src\pages\ECard.jsx
import React, { useEffect, useState } from 'react'
import { FiMail, FiGlobe, FiSend } from 'react-icons/fi'
import { FaWhatsapp, FaInstagram, FaLinkedin, FaFacebook, FaXTwitter } from 'react-icons/fa6'

/** ====== CONFIG ====== */
const INFO = {
  name: 'EMBARK DIGITALS',
  role: 'Web & Digital Studio',
  email: 'contact@embarkdigitals.com',
  website: 'https://www.embarkdigitals.com',
  whatsappLink: 'https://wa.me/message/MDL4XKDNZVLHE1',
  phoneIntl: '+27 60 714 7939',
  socials: {
    instagram: 'https://instagram.com/embarkdigitals?utm_source=qr&igshid=ZTM4ZDRiNzUwMw==',
    linkedin: 'https://www.linkedin.com/company/embark-digitals/',
    x: 'https://x.com/EmbarkDigitals?t=do3jV9xUNbQMcIrGY-xglQ&s=08',
    facebook: '' // add FB URL to show the icon
  },
  vcardPath: '/embark-ecard.vcf',
  downloadName: 'Embark-Digitals.vcf',
  logoSrc: '/logo.png',          // PNG/SVG in /public
  bgImage: '/ecardimage.webp'     // background in /public
}

/** ====== Trim + centroid-center a PNG, then return a square dataURL ====== */
function useCenteredLogo(src, centroidBiasY = -0.02 /* move up 2% for visual balance */) {
  const [dataUrl, setDataUrl] = useState(src)

  useEffect(() => {
    const img = new Image()
    img.crossOrigin = 'anonymous' // same-origin in /public, harmless
    img.src = src
    img.onload = () => {
      try {
        const w = img.naturalWidth, h = img.naturalHeight
        const c = document.createElement('canvas')
        c.width = w; c.height = h
        const ctx = c.getContext('2d')
        ctx.drawImage(img, 0, 0)
        const imgData = ctx.getImageData(0, 0, w, h)
        const d = imgData.data

        // 1) Find non-transparent bounds
        let top = h, left = w, right = -1, bottom = -1
        for (let y = 0; y < h; y++) {
          for (let x = 0; x < w; x++) {
            const a = d[(y * w + x) * 4 + 3]
            if (a > 8) { // small threshold
              if (x < left) left = x
              if (x > right) right = x
              if (y < top) top = y
              if (y > bottom) bottom = y
            }
          }
        }
        if (right < left || bottom < top) { setDataUrl(src); return } // fully transparent? fallback

        const cw = right - left + 1
        const ch = bottom - top + 1

        // 2) Copy trimmed image to a small canvas
        const trimmed = document.createElement('canvas')
        trimmed.width = cw; trimmed.height = ch
        const tctx = trimmed.getContext('2d')
        tctx.drawImage(img, left, top, cw, ch, 0, 0, cw, ch)

        // 3) Centroid of opacity (alpha-weighted)
        const tData = tctx.getImageData(0, 0, cw, ch).data
        let sumA = 0, sumX = 0, sumY = 0
        for (let y = 0; y < ch; y++) {
          for (let x = 0; x < cw; x++) {
            const a = tData[(y * cw + x) * 4 + 3] / 255
            if (a > 0.02) { // skip near-transparent
              sumA += a
              sumX += a * (x + 0.5)
              sumY += a * (y + 0.5)
            }
          }
        }
        const cx = sumA ? sumX / sumA : cw / 2
        const cy = sumA ? sumY / sumA : ch / 2

        // 4) Place on a square so centroid sits in the square center (with slight upward bias)
        const side = Math.max(cw, ch)
        const square = document.createElement('canvas')
        square.width = side; square.height = side
        const sctx = square.getContext('2d')

        // desired position so centroid aligns to center (+bias)
        let dx = Math.round(side / 2 - cx)
        let dy = Math.round(side / 2 - cy + side * centroidBiasY)

        // clamp to keep whole image visible
        dx = Math.min(Math.max(dx, side - cw), 0)
        dy = Math.min(Math.max(dy, side - ch), 0)

        sctx.clearRect(0, 0, side, side)
        sctx.drawImage(trimmed, dx, dy)

        setDataUrl(square.toDataURL('image/png'))
      } catch {
        setDataUrl(src) // fallback if any step fails (e.g., SVG)
      }
    }
    img.onerror = () => setDataUrl(src)
  }, [src, centroidBiasY])

  return dataUrl
}

/** ====== COMPONENT ====== */
export default function ECard(){
  const [downloading, setDownloading] = useState(false)
  const centeredLogo = useCenteredLogo(INFO.logoSrc)

  useEffect(() => {
    document.title = 'Embark Digitals — eCard'
    const tag = document.createElement('meta')
    tag.name = 'robots'; tag.content = 'noindex, nofollow'
    document.head.appendChild(tag)
    return () => document.head.removeChild(tag)
  }, [])

  async function handleAddContact(e){
    e.preventDefault()
    setDownloading(true)
    try {
      const res = await fetch(INFO.vcardPath, { cache: 'no-store' })
      if (!res.ok) throw new Error('Fetch failed')
      const blob = await res.blob()
      const url = URL.createObjectURL(new Blob([blob], { type: 'text/vcard' }))
      const a = document.createElement('a')
      a.href = url
      a.download = INFO.downloadName
      document.body.appendChild(a)
      a.click()
      a.remove()
      URL.revokeObjectURL(url)
    } catch {
      window.location.href = INFO.vcardPath
    } finally {
      setDownloading(false)
    }
  }

  return (
    <section
      className="min-h-screen relative flex items-center justify-center px-4 py-10"
      style={{ backgroundImage: `url('${INFO.bgImage}')`, backgroundSize: 'cover', backgroundPosition: 'center' }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-white/20 via-white/10 to-white/20 pointer-events-none" />

      <div className="relative w-full max-w-xl">
        <div className="rounded-[28px] bg-white/80 backdrop-blur-md ring-1 ring-white/50 shadow-xl p-8 md:p-10">
          {/* BIGGER, AUTO-CENTERED LOGO */}
          <div className="mx-auto rounded-full bg-white/88 ring-1 ring-slate-200 shadow flex items-center justify-center overflow-hidden w-56 h-56 md:w-64 md:h-64">
            {/* square image already centered; we just leave comfortable margin */}
            <img src={centeredLogo} alt="Embark Digitals" className="block w-[84%] h-[84%] object-contain" />
          </div>

          {/* Title */}
          <h1 className="mt-6 text-center text-3xl md:text-4xl font-extrabold tracking-wide text-brand-700">{INFO.name}</h1>
          <p className="text-center text-slate-600">{INFO.role}</p>

          {/* Contact rows */}
          <div className="mt-8 grid gap-4">
            <a href={`mailto:${INFO.email}`} className="group flex items-center gap-3 rounded-2xl bg-brand-500/10 ring-1 ring-brand-500/20 px-4 py-3 hover:bg-brand-500/15 transition">
              <span className="w-10 h-10 rounded-xl bg-brand-700 text-white flex items-center justify-center"><FiMail /></span>
              <span className="font-semibold text-slate-800 select-all">{INFO.email}</span>
            </a>

            <a href={INFO.website} target="_blank" rel="noreferrer noopener" className="group flex items-center gap-3 rounded-2xl bg-brand-500/10 ring-1 ring-brand-500/20 px-4 py-3 hover:bg-brand-500/15 transition">
              <span className="w-10 h-10 rounded-xl bg-brand-700 text-white flex items-center justify-center"><FiGlobe /></span>
              <span className="font-semibold text-slate-800">www.embarkdigitals.com</span>
            </a>

            <a href={INFO.whatsappLink} target="_blank" rel="noreferrer noopener" className="group flex items-center gap-3 rounded-2xl bg-brand-500/10 ring-1 ring-brand-500/20 px-4 py-3 hover:bg-brand-500/15 transition">
              <span className="w-10 h-10 rounded-xl bg-brand-700 text-white flex items-center justify-center"><FaWhatsapp /></span>
              <span className="font-semibold text-slate-800">WhatsApp · {INFO.phoneIntl}</span>
            </a>
          </div>

          {/* Social icon pill */}
          <div className="mt-8">
            <div className="mx-auto max-w-sm rounded-full bg-black/85 ring-1 ring-white/10 shadow-inner px-5 py-3 flex items-center justify-center gap-6">
              {INFO.socials.instagram && (
                <a href={INFO.socials.instagram} target="_blank" rel="noreferrer noopener" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition" aria-label="Instagram" title="Instagram">
                  <FaInstagram className="text-[#E1306C] text-xl" />
                </a>
              )}
              {INFO.whatsappLink && (
                <a href={INFO.whatsappLink} target="_blank" rel="noreferrer noopener" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition" aria-label="WhatsApp" title="WhatsApp">
                  <FaWhatsapp className="text-[#25D366] text-xl" />
                </a>
              )}
              {INFO.socials.facebook && (
                <a href={INFO.socials.facebook} target="_blank" rel="noreferrer noopener" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition" aria-label="Facebook" title="Facebook">
                  <FaFacebook className="text-[#1877F2] text-xl" />
                </a>
              )}
              {INFO.socials.linkedin && (
                <a href={INFO.socials.linkedin} target="_blank" rel="noreferrer noopener" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition" aria-label="LinkedIn" title="LinkedIn">
                  <FaLinkedin className="text-[#0A66C2] text-xl" />
                </a>
              )}
              {INFO.socials.x && (
                <a href={INFO.socials.x} target="_blank" rel="noreferrer noopener" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition" aria-label="X" title="X">
                  <FaXTwitter className="text-white text-xl" />
                </a>
              )}
            </div>
          </div>

          {/* Add Contact */}
          <div className="mt-8 flex justify-center">
            <button onClick={handleAddContact} className="btn-primary bg-brand-700 hover:bg-brand-600 inline-flex items-center gap-2">
              <FiSend /> {downloading ? 'Preparing…' : 'Add Contact'}
            </button>
          </div>

          <p className="mt-4 text-center text-xs text-slate-500">
            Tapping “Add Contact” downloads a .vcf file. Your device will ask to import it into Contacts.
          </p>
        </div>
      </div>

      {/* Floating button */}
      <button
        onClick={handleAddContact}
        className="fixed bottom-6 right-6 z-10 inline-flex items-center gap-2 rounded-full px-4 py-3 bg-accent-500 text-white shadow-lg hover:brightness-110"
        aria-label="Add contact to device"
      >
        <FiSend /> {downloading ? 'Preparing…' : 'Add Contact'}
      </button>
    </section>
  )
}
