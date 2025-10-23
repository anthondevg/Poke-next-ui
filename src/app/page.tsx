import Button from '@/components/Button'
import Image from 'next/image'
import Link from 'next/link'

import { Jockey_One, Lato } from 'next/font/google'
const lato = Lato({ weight: '900', subsets: ['latin'] })
const JockeyOne = Jockey_One({ weight: '400', subsets: ['latin'] })

export default function Home() {
  return (
    <div className="relative overflow-hidden">
      <div className="w-full grid md:grid-cols-6 grid-cols-4 z-0">
        <div className="h-screen border-r-[#3e3e83] border-r"></div>
        <div className="h-screen border-r-[#000041] border-r"></div>
        <div className="h-screen border-r-[#000041] border-r"></div>
        <div className="h-screen border-r-[#000041] border-r"></div>
        <div className="h-screen border-r-[#000041] border-r hidden md:block"></div>
        <div className="h-screen border-r-[#3e3e83] border-r hidden md:block"></div>
      </div>

      <nav>
        <a className="absolute right-5 top-5 text-cyan-pkn" href="/pokedex">
          Pokedex
        </a>
      </nav>

      <header className="flex w-full justify-center flex-col items-center mt-52 gap-4 px-12 absolute top-0 z-50">
        <div className="flex gap-1 align-middle items-center  p-4 relative">
          <h1 className="text-cyan-300 text-2xl lg:text-4xl uppercase font-bold">
            <span className="text-red-pkn">Pokenext</span>-UI
          </h1>

          <Image
            src={'/Pikachu.png'}
            width={70}
            height={70}
            alt="pikachu"
            className="animate-pulse"
          />

          <div className="border-dashed border h-12 w-20 border-white/50 absolute top-3 -left-2"></div>
        </div>

        <div className="text-center flex flex-col relative gap-6">
          <h4 className={`text-red-pkn text-2xl lg:text-2xl ${lato.className}`}>
            React.js Pokedex with Next
          </h4>
          <h3
            className={`text-cyan-pkn text-4xl lg:text-5xl font-bold ${JockeyOne.className} mb-4`}
          >
            All Pokemon in just one place
          </h3>
          <Link href={'/pokedex'}>
            <Button className="bg-red-pkn uppercase">Open Pokedex</Button>
          </Link>
          <p className="text-center text-white">
            Developed by <p className="text-purple-300">Anthony Gonzalez</p>
          </p>
          <div className="border-dashed border h-32 w-32 border-white/30 absolute -top-2 -left-2"></div>
        </div>
      </header>

      <div className="w-44 h-44 bg-[#01013A] bottom-2 left-0 absolute rounded-lg rotate-[165deg] animate-pulse"></div>
      <div className="w-36 h-36 bg-[#01013A] top-96 -right-20 absolute rounded-lg -rotate-[15deg] animate-pulse"></div>
    </div>
  )
}
