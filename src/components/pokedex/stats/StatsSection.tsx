import Subtitle from '@/components/Subtitle'
import Stat from '@/components/pokedex/Stat'
import uuid from 'react-uuid'

export default function StatsSection({ pokemon }: { pokemon: any }) {
  return (
    <>
      <Subtitle className="text-2xl text-white mb-4 font-bold">Stats</Subtitle>
      <section className="grid-cols-1 gap-2 lg:grid-cols-2 lg:gap-4 grid">
        {pokemon.stats &&
          pokemon.stats
            .slice(0, 4)
            .map((stat: any) => (
              <Stat
                key={stat.stat.name || uuid()}
                name={stat.stat.name}
                value={stat.base_stat}
              />
            ))}
        <Stat name="Height" value={pokemon.height} />
        <Stat name="Weight" value={pokemon.weight} />
      </section>
    </>
  )
}
