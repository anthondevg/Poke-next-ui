'use client'
import Card from './CardWrapper'
import Link from 'next/link'
import Image from 'next/image'
import {
  formatMoveName,
  getPokemonType,
  getSprite,
} from '@/utilities/formatters'
import { PokemonCardsProps } from '@/models/Pokemon'
import { cn } from '@/utilities/cn'
import uuid from 'react-uuid'
import { useFetchPokeApi } from '@/hooks/pokeapi'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import React, { useRef } from 'react'
import PokemonCardSkeleton from '../Skeleton/PokemonCardSkeleton'
import PokeType from '@/components/PokeType'
import CardWrapper from './CardWrapper'

export default function PokemonCard({
  pokemonUrl,
  className,
}: PokemonCardsProps) {
  const { pokemon, isFetching } = useFetchPokeApi(pokemonUrl)

  if (isFetching) return <PokemonCardSkeleton />
  if (!pokemon.sprites) return
  return (
    <div className={cn('grid-flow-row', className)}>
      <Link href={`/pokedex/${pokemon.name}`}>
        <Tilt3D>
          <CardWrapper
            borderColor={getPokemonType(pokemon)}
            hp={pokemon.stats[0].base_stat}
            className={className}
          >
            <Image
              src={getSprite(pokemon)}
              alt={`${pokemon.name} sprite`}
              width={144}
              height={144}
              className="mt-4 m-auto"
            />

            <div className="text-center">
              <p className="text-stroke-3-white text-xl lg:text-3xl font-black text-center w-full capitalize">
                {pokemon.name}
              </p>

              <div className="flex justify-center mt-2">
                <PokeType type={getPokemonType(pokemon)} />
              </div>
            </div>

            <div className="z-10 mt-4">
              <div className="flex flex-col pl-4">
                {pokemon.abilities.map((ability: any) => {
                  return (
                    <div
                      key={uuid()}
                      className="flex flex-col text-sm text-gray-50"
                    >
                      <p className="text-stroke-3-white text-md font-semibold text-left w-full capitalize">
                        {formatMoveName(ability.ability.name)}
                      </p>
                    </div>
                  )
                })}
              </div>
            </div>
          </CardWrapper>
        </Tilt3D>
      </Link>
    </div>
  )
}

// Cosmetic-only: 3D tilt effect wrapper
function Tilt3D({ children }: { children: React.ReactNode }) {
  const cardRef = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const rotateX = useSpring(y, { stiffness: 200, damping: 20 })
  const rotateY = useSpring(x, { stiffness: 200, damping: 20 })

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    const card = cardRef.current
    if (!card) return
    const rect = card.getBoundingClientRect()
    const cardX = rect.left + rect.width / 2
    const cardY = rect.top + rect.height / 2
    const deltaX = e.clientX - cardX
    const deltaY = e.clientY - cardY
    // Limit max rotation to 15deg
    x.set((deltaX / (rect.width / 2)) * 15)
    y.set((-deltaY / (rect.height / 2)) * 15)
  }

  function handleMouseLeave() {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      ref={cardRef}
      style={{
        rotateX,
        rotateY,
        transformPerspective: 600,
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ y: 7 }}
      whileHover={{ y: -0.5 }}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
    >
      {children}
    </motion.div>
  )
}
