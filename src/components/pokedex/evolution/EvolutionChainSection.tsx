import React from 'react'
import Subtitle from '@/components/Subtitle'
import Image from 'next/image'

export default function EvolutionChainSection({
  evoChain,
  getSpeciesIdFromUrl,
}: {
  evoChain: any[]
  getSpeciesIdFromUrl: (url: string) => string
}) {
  return (
    <div className="max-w-4xl m-auto px-12 flex gap-4 flex-col">
      <Subtitle>Evolution Chain</Subtitle>
      <div className="flex gap-8 flex-wrap justify-start items-center mb-8">
        {evoChain.length > 0 ? (
          evoChain.map((stage, idx) => (
            <div
              key={stage.name}
              className="flex flex-col gap-12 items-center relative"
            >
              {idx < evoChain.length - 1 && (
                <span className="text-2xl text-pink-300 mx-2 absolute right-[-40px] top-1/2 transform -translate-y-1/2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="size-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m16.49 12 3.75 3.75m0 0-3.75 3.75m3.75-3.75H3.74V4.499"
                    />
                  </svg>
                </span>
              )}
              <Image
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${getSpeciesIdFromUrl(
                  stage.url
                )}.png`}
                alt={stage.name}
                width={120}
                height={120}
                className="bg-white rounded-full border-2 border-pink-300 shadow-lg"
              />

              <span className="mt-2 text-lg flex gap-6 font-bold capitalize text-pink-500">
                {stage.name}{' '}
              </span>
            </div>
          ))
        ) : (
          <span className="text-slate-400">No evolution chain found.</span>
        )}
      </div>
    </div>
  )
}
