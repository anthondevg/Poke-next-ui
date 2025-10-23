import PokemonCard from '@/components/Card/PokemonCard'
import { PokemonRef } from '@/models/Pokemon'

export default async function Page() {
  const pokemons = await fetch(
    'https://pokeapi.co/api/v2/pokemon/?offset=0&limit=400'
  )
    .then((res) => res.json())
    .then((data: any) => data.results)

  return (
    <main className="p-4 px-6 m-auto pb-72 max-w-[1200px] border-x-4 border-blue-400 bg-gradient-to-b from-blue-950 via-black to-black min-h-screen">
      <div className="grid px-16 md:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-6">
        {pokemons.length &&
          pokemons.map((pokemonRef: PokemonRef) => (
            <PokemonCard key={pokemonRef.name} pokemonUrl={pokemonRef.url} />
          ))}
      </div>
    </main>
  )
}
