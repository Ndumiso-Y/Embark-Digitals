// F:\Digital Agency\Embark Digitals\Website\embark-react\src\components\GlowDivider.jsx
import React from 'react'

export default function GlowDivider(){
  return (
    <div className="relative my-6">
      <div className="h-1 w-full bg-gradient-to-r from-transparent via-accent-500/60 to-transparent rounded-full" />
      <div className="absolute -inset-x-8 -top-4 h-8 bg-accent-500/20 blur-2xl rounded-full pointer-events-none" />
    </div>
  )
}
