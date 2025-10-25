import GoToTopButton from '@/components/GoToTopButton'
import CardsWithSearch from './CardsWithSearch'

export default async function Page() {
  const pokemons = await fetch(
    'https://pokeapi.co/api/v2/pokemon/?offset=0&limit=400'
  )
    .then((res) => res.json())
    .then((data: any) => data.results)

  return (
    <main className="p-4 px-0 m-auto pb-72 max-w-[1200px] min-h-screen">
      <CardsWithSearch pokemons={pokemons} />
      {/* Go to top Pokeball button */}
      <GoToTopButton />
    </main>
  )
}
