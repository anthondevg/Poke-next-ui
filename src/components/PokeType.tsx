import React from 'react'

type PokeType = {
  type: string
}

// Simple type color mapping
const getTypeColor = (type: string) => {
  const typeColors: { [key: string]: string } = {
    fire: 'bg-red-500',
    water: 'bg-blue-500',
    grass: 'bg-green-500',
    electric: 'bg-yellow-500',
    psychic: 'bg-pink-500',
    ice: 'bg-cyan-400',
    dragon: 'bg-purple-600',
    dark: 'bg-gray-800',
    fairy: 'bg-pink-400',
    fighting: 'bg-red-700',
    poison: 'bg-purple-500',
    ground: 'bg-yellow-600',
    flying: 'bg-indigo-400',
    bug: 'bg-green-400',
    rock: 'bg-yellow-700',
    ghost: 'bg-purple-700',
    steel: 'bg-gray-500',
    normal: 'bg-gray-400',
  }

  return typeColors[type.toLowerCase()] || 'bg-gray-400'
}

export default function PokeType({ type }: PokeType) {
  return (
    <span
      className={`px-3 py-1 ${getTypeColor(
        type
      )} text-white rounded-full font-bold text-sm capitalize`}
    >
      {type}
    </span>
  )
}
