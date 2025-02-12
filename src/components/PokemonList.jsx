/* eslint-disable react/prop-types */
"use client"

import { useState, useEffect, useRef } from "react"

function PokemonList({ onSelectPokemon }) {
  const [pokemonList, setPokemonList] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const dropdownRef = useRef(null)

  useEffect(() => {
    fetchPokemonList()

    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const fetchPokemonList = async () => {
    try {
      const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=1000")
      if (!response.ok) {
        throw new Error("Failed to fetch Pokémon list")
      }
      const data = await response.json()
      setPokemonList(data.results)
      setIsLoading(false)
    } catch (error) {
      setError(error.message)
      setIsLoading(false)
    }
  }

  const filteredPokemon = pokemonList.filter((pokemon) => pokemon.name.toLowerCase().includes(searchTerm.toLowerCase()))

  const handlePokemonSelect = (pokemon) => {
    onSelectPokemon(pokemon)
    setSearchTerm("")
    setIsDropdownOpen(false)
  }

  if (isLoading) return <div>Loading Pokémon...</div>
  if (error) return <div>Error: {error}</div>

  return (
    <div className=" p-6 w-1/2 m-auto rounded-lg shadow-md" ref={dropdownRef}>
      <h2 className="text-2xl font-semibold mb-4">Select a Pokémon</h2>
      <div className="relative">
        <input
          type="text"
          placeholder="Search Pokémon..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value)
            setIsDropdownOpen(true)
          }}
          onFocus={() => setIsDropdownOpen(true)}
          className="w-full p-2 border rounded"
        />
        {isDropdownOpen && (
          <ul className="absolute z-10 w-full mt-1 max-h-60 bg-gray-800 overflow-y-auto  border rounded shadow-lg">
            {filteredPokemon.map((pokemon) => (
              <li
                key={pokemon.name}
                onClick={() => handlePokemonSelect(pokemon)}
                className="p-2 cursor-pointer hover:bg-gray-100"
              >
                {pokemon.name}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}

export default PokemonList

