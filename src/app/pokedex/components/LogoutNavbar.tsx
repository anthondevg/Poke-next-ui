'use client'
import Button from '@/components/Button'
import React from 'react'

export default function LogoutNavbar() {
  return (
    <div>
      <Button
        onClick={() => {
          console.log('Logout functionality removed')
          return {}
        }}
      >
        Cerrar sesion
      </Button>
    </div>
  )
}
