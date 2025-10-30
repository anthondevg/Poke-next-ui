import React from 'react'

interface SubtitleProps {
  children: React.ReactNode
  className?: string
}

export default function Subtitle({ children, className = '' }: SubtitleProps) {
  return (
    <h2
      className={`text-3xl text-stroke-3-white text-md font-semibold text-left w-full capitalize my-8 ${className}`}
    >
      {children}
    </h2>
  )
}
