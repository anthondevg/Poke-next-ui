'use client'
import { useParams, useRouter } from 'next/navigation'
import Image from 'next/image'
import { useRef, useEffect } from 'react'

import uuid from 'react-uuid'
import { useFetchPokeApi } from '@/hooks/pokeapi'
import Stat from '../components/Stat'
import Sprite from '../components/Sprite'
import PokeType from '@/components/PokeType'
import { getSprite } from '@/utilities/formatters'
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
  const brightness = useTransform(
    x,
    [-100, -50, 0, 50, 100], // Input range (drag distance)
    [1.5, 1.2, 1, 1.2, 1.5] // Output range (brightness multiplier)
  )

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

  if (isFetching)
    return (
      <div className="h-screen bg-gradient-to-b from-gray-900 to-black flex flex-col items-center justify-center">
        <div className="flex flex-col items-center space-y-6">
          <Image
            src={'/Pikachu.png'}
            width={240}
            height={240}
            alt="pikachu"
            className="animate-pulse"
          />
          <motion.div
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <motion.h2
              className="text-yellow-400 text-2xl font-bold text-center"
              animate={{
                scale: [1, 1.05, 1],
                opacity: [0.8, 1, 0.8],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            >
              Loading your Pokémon...
            </motion.h2>
          </motion.div>

          {/* Animated dots */}
          <div className="flex space-x-1">
            {[0, 1, 2].map((index) => (
              <motion.div
                key={index}
                className="w-2 h-2 bg-yellow-400 rounded-full"
                animate={{
                  y: [0, -10, 0],
                  opacity: [0.4, 1, 0.4],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  delay: index * 0.2,
                  ease: 'easeInOut',
                }}
              />
            ))}
          </div>
        </div>
      </div>
    )
  const animationProps = {
    y: [0, 20, 0], // Animate along the y-axis from 0 to 100 and back to 0
    transition: { duration: 3, repeat: Infinity }, // Loop indefinitely
  }
  return (
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
        <h2 className="text-sm text-slate-300  font-bold absolute top-4 right-4">
          # 000{pokemon.id}
        </h2>
        <h2 className="text-2xl text-white mb-4  font-bold">Stats</h2>
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
        <h2 className="text-2xl text-white font-bold">Types</h2>
        <div className="flex gap-2 mb-4">
          {pokemon.types &&
            pokemon.types.map((pokemon: any) => (
              <PokeType key={uuid()} type={pokemon.type.name} />
            ))}
        </div>
        <h2 className="text-2xl text-white  font-bold mb-4">
          Sprites from Game [Normal/Shiny]
        </h2>
        {pokemon.sprites && (
          <div className="grid grid-cols-2 lg:grid-cols-4">
            <Sprite sprite={pokemon.sprites.front_default} />
            <Sprite sprite={pokemon.sprites.back_default} />
            <Sprite sprite={pokemon.sprites.front_shiny} />
            <Sprite sprite={pokemon.sprites.back_shiny} />
          </div>
        )}
      </div>
    </motion.main>
  )
}
