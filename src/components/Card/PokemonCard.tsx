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
import { motion } from 'framer-motion'
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
        <motion.div
          animate={{ y: 7 }}
          whileHover={{ y: -0.5 }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
        >
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
              <p className="text-stroke-3-white text-3xl lg:text-3xl font-black text-center w-full capitalize">
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
                      <p>{formatMoveName(ability.ability.name)}</p>
                    </div>
                  )
                })}
              </div>
            </div>
          </CardWrapper>
        </motion.div>
      </Link>
    </div>
  )
}
