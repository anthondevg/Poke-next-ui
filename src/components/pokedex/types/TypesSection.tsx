import Subtitle from '@/components/Subtitle'
import PokeType from '@/components/PokeType'
import uuid from 'react-uuid'

export default function TypesSection({ pokemon }: { pokemon: any }) {
  return (
    <>
      <Subtitle className="text-2xl text-white font-bold">Types</Subtitle>
      <div className="flex gap-2 mb-4">
        {pokemon.types &&
          pokemon.types.map((pokemon: any) => (
            <PokeType key={uuid()} type={pokemon.type.name} />
          ))}
      </div>
    </>
  )
}
