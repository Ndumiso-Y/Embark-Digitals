import { useEffect, useState } from 'react'

export default function BackToTop(){
  const [show, setShow] = useState(false)
  useEffect(()=>{
    const onScroll = () => setShow(window.scrollY > 400)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  },[])
  if(!show) return null
  return (
    <a href="#top" className="fixed bottom-6 right-6 inline-flex items-center justify-center w-12 h-12 rounded-full shadow-lg bg-brand-700 text-white hover:bg-brand-800" aria-label="Back to top">↑</a>
  )
}
