import { useEffect } from 'react'
import { useState } from 'react'

const useFetchPokeApi = (pokemonUrl: string) => {
  const [pokemon, setPokemon] = useState({} as any)
  const [isFetching, setIsFetching] = useState(false)

  useEffect(() => {
    setIsFetching(true)

    // Create a minimum delay to show the loading screen
    const minimumDelay = new Promise((resolve) => setTimeout(resolve, 100)) // 100 milliseconds delay

    const fetchData = fetch(pokemonUrl)
      .then((res) => res.json())
      .then((data) => {
        setPokemon(data)
      })
      .catch((err) => console.log(err))

    // Wait for both the API call and the minimum delay
    Promise.all([fetchData, minimumDelay]).finally(() => {
      setIsFetching(false)
    })
  }, [])

  return { pokemon, isFetching, setPokemon }
}

export { useFetchPokeApi }
