import PokemonCard from '@/components/Card/PokemonCard'
import GoToTopButton from '@/components/GoToTopButton'
import { PokemonRef } from '@/models/Pokemon'

export default async function Page() {
  const pokemons = await fetch(
    'https://pokeapi.co/api/v2/pokemon/?offset=0&limit=400'
  )
    .then((res) => res.json())
    .then((data: any) => data.results)

  return (
    <main className="p-4 px-0 m-auto pb-72 max-w-[1200px] min-h-screen">
      <div className="grid px-4 sm:px-16 grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-6">
        {pokemons.length &&
          pokemons.map((pokemonRef: PokemonRef) => (
            <PokemonCard key={pokemonRef.name} pokemonUrl={pokemonRef.url} />
          ))}
      </div>

      {/* Go to top Pokeball button */}
      <GoToTopButton />
    </main>
  )
}
