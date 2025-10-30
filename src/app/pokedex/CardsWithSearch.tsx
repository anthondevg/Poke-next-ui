'use client'
import { useState, useEffect } from 'react'
import PokemonCard from '@/components/Card/PokemonCard'
import { PokemonRef } from '@/models/Pokemon'

export default function CardsWithSearch({
  pokemons,
}: {
  pokemons: PokemonRef[]
}) {
  const [search, setSearch] = useState('')
  const [debouncedSearch, setDebouncedSearch] = useState('')
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search)
    }, 150)
    return () => clearTimeout(handler)
  }, [search])

  const filtered = debouncedSearch.trim()
    ? pokemons.filter((p: PokemonRef) =>
        p.name.toLowerCase().includes(debouncedSearch.toLowerCase())
      )
    : pokemons
  const [tiltEnabled, setTiltEnabled] = useState(false)
  return (
    <>
      <div className="w-full flex flex-col items-center mb-6 px-4 gap-2">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search Pokémon..."
          className="px-6 text-xl py-3 text-blue-900 w-full  max-w-4xl font-bold rounded-xl border-4 border-red-400 bg-gradient-to-r from-blue-200 via-red-100 to-red-100 shadow-[0_0_0_4px_#222,inset_0_2px_8px_#fff] focus:outline-pink-500 focus:border-pink-500 transition-all duration-200 tracking-wide font-mono"
        />
        <div className="flex items-center w-full max-w-4xl">
          <input
            type="checkbox"
            id="tilt3d-toggle-global"
            checked={tiltEnabled}
            onChange={() => setTiltEnabled((v) => !v)}
            className="mr-2 accent-pink-500"
          />
          <label
            htmlFor="tilt3d-toggle-global"
            className="text-xs text-gray-400 select-none cursor-pointer"
          >
            3D Tilt Effect (All Cards)
          </label>
        </div>
      </div>
      <div className="grid px-4 sm:px-16 grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-6">
        {filtered.length ? (
          filtered.map((pokemonRef: PokemonRef) => (
            <PokemonCard
              key={pokemonRef.name}
              pokemonUrl={pokemonRef.url}
              tiltEnabled={tiltEnabled}
            />
          ))
        ) : (
          <div className="col-span-full text-center text-xl font-bold text-pink-600 py-12">
            No Pokémon found!
          </div>
        )}
      </div>
    </>
  )
}
