import React from 'react'
import Subtitle from '@/components/Subtitle'
import Sprite from '@/components/pokedex/Sprite'

export default function SpritesSection({
  pokemon,
}: {
  pokemon: any
  getSprite: (p: any) => string
}) {
  return (
    <>
      <Subtitle className="text-2xl text-white font-bold mb-4">
        Sprites from Game [Normal/Shiny]
      </Subtitle>
      {pokemon.sprites && (
        <div className="grid grid-cols-2 lg:grid-cols-4">
          <Sprite sprite={pokemon.sprites.front_default} />
          <Sprite sprite={pokemon.sprites.back_default} />
          <Sprite sprite={pokemon.sprites.front_shiny} />
          <Sprite sprite={pokemon.sprites.back_shiny} />
        </div>
      )}
    </>
  )
}
