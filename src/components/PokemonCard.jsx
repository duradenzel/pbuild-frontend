/* eslint-disable react/prop-types */
"use client"

import { useState, useEffect } from "react"

const typeColors = {
  normal: "#A8A77A",
  fire: "#EE8130",
  water: "#6390F0",
  electric: "#F7D02C",
  grass: "#7AC74C",
  ice: "#96D9D6",
  fighting: "#C22E28",
  poison: "#A33EA1",
  ground: "#E2BF65",
  flying: "#A98FF3",
  psychic: "#F95587",
  bug: "#A6B91A",
  rock: "#B6A136",
  ghost: "#735797",
  dragon: "#6F35FC",
  dark: "#705746",
  steel: "#B7B7CE",
  fairy: "#D685AD",
}

function PokemonCard({ pokemon, onRemove }) {
  const [details, setDetails] = useState(null)

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`)
        if (!response.ok) throw new Error("Failed to fetch Pokémon details")
        const data = await response.json()
        setDetails(data)
      } catch (error) {
        console.error("Error fetching Pokémon details:", error)
      }
    }

    fetchDetails()
  }, [pokemon.name])

  if (!details) return <div>Loading...</div>

  const primaryType = details.types[0].type.name
  const secondaryType = details.types[1]?.type.name

  const cardStyle = {
    backgroundColor: `${typeColors[primaryType]}33`, // 33 is for 20% opacity
  }

  const typeStyle = (type) => ({
    backgroundColor: typeColors[type],
    color: "#fff",
    padding: "0.25rem 0.5rem",
    borderRadius: "0.25rem",
    fontSize: "0.75rem",
    fontWeight: "bold",
  })

  return (
    <div className=" rounded-lg shadow-md overflow-hidden" style={cardStyle}>
      <div className="relative">
        <img
          src={details.sprites.other.showdown.front_default || "/placeholder.svg"}
          alt={details.name}
          className="w-full h-48 object-contain"
        />
        <button
          onClick={() => onRemove(pokemon.name)}
          className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
        >
          ×
        </button>
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold capitalize mb-2">{details.name}</h3>
        <div className="flex gap-2">
          <span style={typeStyle(primaryType)}>{primaryType}</span>
          {secondaryType && <span style={typeStyle(secondaryType)}>{secondaryType}</span>}
        </div>
      </div>
    </div>
  )
}

export default PokemonCard

