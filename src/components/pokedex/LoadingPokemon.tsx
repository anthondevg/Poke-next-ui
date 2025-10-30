import Image from 'next/image'
import { motion } from 'framer-motion'
import React from 'react'

export default function LoadingPokemon() {
  return (
    <div className="h-screen bg-gradient-to-b from-gray-900 to-black flex flex-col items-center justify-center">
      <div className="flex flex-col items-center space-y-6">
        {/* <Image
          src={'/Pikachu.png'}
          width={240}
          height={240}
          alt="pikachu"
          className="animate-pulse"
        /> */}
        <motion.div
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.h2
            className="text-blue-500 text-2xl font-bold text-center"
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
        <div className="flex space-x-1">
          {[0, 1, 2].map((index) => (
            <motion.div
              key={index}
              className="w-2 h-2 bg-blue-500 rounded-full"
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
}
