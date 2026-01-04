export default function Footer(){
  return (
    <footer className="bg-brand-900 text-brand-100">
      <div className="container py-10">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div>
            <div className="font-extrabold">Embark Digitals</div>
            <div className="text-sm text-brand-200">Design • Web • Promo</div>
          </div>
          <nav className="flex gap-6 text-sm">
            <a href="/" className="hover:text-white">Home</a>
            <a href="/#services" className="hover:text-white">Services</a>
            <a href="/projects" className="hover:text-white">Projects</a>
            <a href="/#contact" className="hover:text-white">Contact</a>
          </nav>
          <div className="text-sm text-brand-300">© {new Date().getFullYear()} · Designed by Embark Digitals</div>
        </div>
      </div>
    </footer>
  )
}
