import Navbar from '@/components/Navbar'
import React from 'react'

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <section>
      <Navbar />
      {children}
    </section>
  )
}
