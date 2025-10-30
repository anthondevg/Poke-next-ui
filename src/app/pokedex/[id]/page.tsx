'use client'
import { useParams, useRouter } from 'next/navigation'
import { useRef } from 'react'
import { useState, useEffect } from 'react'
import { useFetchPokeApi } from '@/hooks/pokeapi'
import StatsSection from '@/components/pokedex/stats/StatsSection'
import TypesSection from '@/components/pokedex/types/TypesSection'
import SpritesSection from '@/components/pokedex/sprites/SpritesSection'
import EvolutionChainSection from '@/components/pokedex/evolution/EvolutionChainSection'
import { getSprite } from '@/utilities/formatters'
import Subtitle from '@/components/Subtitle'
import LoadingPokemon from '@/components/pokedex/LoadingPokemon'
import {
  motion,
  useMotionValue,
  useMotionValueEvent,
  useTransform,
} from 'framer-motion'

export default function Page() {
  const params = useParams()
  const router = useRouter()
  const { pokemon, isFetching } = useFetchPokeApi(
    `https://pokeapi.co/api/v2/pokemon/${params.id}`
  )
  const x = useMotionValue(0)
  const lastNavigationTime = useRef(0)
  const hasNavigated = useRef(false)

  // Reset navigation flag when component mounts or params change
  useEffect(() => {
    hasNavigated.current = false
  }, [params.id])
  // Transform the x motion value to brightness values
  // When dragging left or right, increase brightness
  function getSpeciesIdFromUrl(url: string) {
    const parts = url.split('/').filter(Boolean)
    return parts[parts.length - 1]
  }

  async function fetchEvolutionChain(speciesUrl: string) {
    // Fetch species data to get evolution chain URL
    const speciesRes = await fetch(speciesUrl)
    const speciesData = await speciesRes.json()
    const evoChainUrl = speciesData.evolution_chain.url
    const evoRes = await fetch(evoChainUrl)
    const evoData = await evoRes.json()
    return evoData.chain
  }

  function parseChain(chain: any) {
    // Recursively parse the chain into a flat array
    const out = []
    let current = chain
    while (current) {
      out.push({
        name: current.species.name,
        url: current.species.url,
      })
      if (current.evolves_to && current.evolves_to.length > 0) {
        current = current.evolves_to[0]
      } else {
        current = null
      }
    }
    return out
  }

  const [evoChain, setEvoChain] = useState<any[]>([])

  useEffect(() => {
    let ignore = false
    async function getChain() {
      if (!pokemon || !pokemon.species || !pokemon.species.url) return
      const chain = await fetchEvolutionChain(pokemon.species.url)
      const parsed = parseChain(chain)
      if (!ignore) setEvoChain(parsed)
    }
    getChain()
    return () => {
      ignore = true
    }
  }, [pokemon?.species?.url])

  // Transform x value to background filter for more vibrant effect
  const backgroundFilter = useTransform(
    x,
    [-100, -50, 0, 50, 100],
    [
      'brightness(1.5) saturate(1.3) contrast(1.1)',
      'brightness(1.2) saturate(1.15) contrast(1.05)',
      'brightness(1) saturate(1) contrast(1)',
      'brightness(1.2) saturate(1.15) contrast(1.05)',
      'brightness(1.5) saturate(1.3) contrast(1.1)',
    ]
  )

  useMotionValueEvent(x, 'change', (latest) => {
    console.log(latest)

    const now = Date.now()
    // Prevent navigation if already navigated recently (within 1 second)
    if (hasNavigated.current || now - lastNavigationTime.current < 1000) {
      return
    }

    if (latest > 50) {
      // Increased threshold to prevent accidental triggers
      if (pokemon.id === 1) return
      hasNavigated.current = true
      lastNavigationTime.current = now
      router.push(`/pokedex/${pokemon.id - 1}`)
    }

    if (latest < -50) {
      // Increased threshold to prevent accidental triggers
      hasNavigated.current = true
      lastNavigationTime.current = now
      router.push(`/pokedex/${pokemon.id + 1}`)
    }
  })

  const handlePrevious = () => {
    if (pokemon.id > 1) {
      router.push(`/pokedex/${pokemon.id - 1}`)
    }
  }

  const handleNext = () => {
    router.push(`/pokedex/${pokemon.id + 1}`)
  }

  if (isFetching) return <LoadingPokemon />
  const animationProps = {
    y: [0, 20, 0], // Animate along the y-axis from 0 to 100 and back to 0
    transition: { duration: 3, repeat: Infinity }, // Loop indefinitely
  }
  return (
    <>
      {/* Navigation Navbar */}
      <nav className="w-full flex justify-center items-center bg-gray-800 border-b border-gray-600">
        <div className="flex w-full max-w-4xl mx-auto">
          <button
            className="w-1/2 py-4 text-lg font-bold text-white bg-gray-800 hover:bg-gray-700 border-r border-gray-600 transition-colors"
            onClick={handlePrevious}
            disabled={pokemon.id === 1}
          >
            Previous
          </button>
          <button
            className="w-1/2 py-4 text-lg font-bold text-white bg-gray-800 hover:bg-gray-700 transition-colors"
            onClick={handleNext}
          >
            Next
          </button>
        </div>
      </nav>
      <motion.main
        className="bg-gradient-to-b overflow-x-hidden md:h-screen pb-6 gap-6 grow items-center relative"
        style={{ filter: backgroundFilter }}
      >
        <section className="flex flex-col justify-center m-auto lg:pt-12 items-center">
          <motion.div
            className="px-8 space-y-5 lg:px-16 pt-16 rounded-xl p-4 cursor-pointer mx-4 text-black relative"
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            style={{ x }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
          >
            <motion.div
              animate={{ y: 10 }}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              whileTap={{ scale: 0.9 }}
              className="z-50"
            >
              <h3
                className={`text-white z-50 text-7xl lg:text-9xl  capitalize font-black `}
              >
                {pokemon.name}
              </h3>
              <h3
                className={`  text-[#CFCFCF]/5   text-7xl lg:text-9xl -mb-32 lg:-mb-72 capitalize font-black `}
              >
                {pokemon.name}
              </h3>

              <motion.div animate={animationProps}>
                <img
                  src={pokemon.sprites && getSprite(pokemon)}
                  alt={`${pokemon.name} sprite`}
                  className="lg:w-96 w-44 mx-auto z-50 select-none pointer-events-none"
                  draggable={false}
                  onDragStart={(e) => e.preventDefault()}
                />
              </motion.div>

              <div className="px-1 md:hidden mt-6 py-1 bg-slate-50 rounded-full w-44 mx-auto">
                <div className=" bg-slate-700 w-5 h-5 mx-auto rounded-full"></div>
              </div>
            </motion.div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="44"
              height="44"
              className="absolute top-52 left-5 text-white cursor-pointer hover:scale-110 transition-transform"
              onClick={handlePrevious}
            >
              <path
                fill="white"
                d="M12 2a10 10 0 1 0 10 10A10.011 10.011 0 0 0 12 2zm0 18a8 8 0 1 1 8-8 8.009 8.009 0 0 1-8 8z"
              />
              <path
                fill="white"
                d="M13.293 7.293 8.586 12l4.707 4.707 1.414-1.414L11.414 12l3.293-3.293-1.414-1.414z"
              />
            </svg>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="44"
              height="44"
              className="absolute top-48 right-5 transform rotate-180 text-white cursor-pointer hover:scale-110 transition-transform"
              onClick={handleNext}
            >
              <path
                fill="white"
                d="M12 2a10 10 0 1 0 10 10A10.011 10.011 0 0 0 12 2zm0 18a8 8 0 1 1 8-8 8.009 8.009 0 0 1-8 8z"
              />
              <path
                fill="white"
                d="M13.293 7.293 8.586 12l4.707 4.707 1.414-1.414L11.414 12l3.293-3.293-1.414-1.414z"
              />
            </svg>

            <div className="h-6  bg-white/10 rounded-full flex justify-center items-center p-6 mt-12">
              <span className="bg-white/60 rounded-full mx-auto h-8 w-8 my-2"></span>
            </div>
          </motion.div>
        </section>

        <div className="max-w-4xl m-auto px-12 flex gap-4 flex-col">
          <div className="mx-auto">
            <Subtitle className="text-white z-50 text-3xl w-fit border px-4 rounded-full my-4 text-center italic capitalize font-black">
              {pokemon.name}
            </Subtitle>
          </div>
          <StatsSection pokemon={pokemon} />
          <TypesSection pokemon={pokemon} />
          <SpritesSection pokemon={pokemon} getSprite={getSprite} />
        </div>
        <EvolutionChainSection
          evoChain={evoChain}
          getSpeciesIdFromUrl={getSpeciesIdFromUrl}
        />
      </motion.main>
    </>
  )
}
