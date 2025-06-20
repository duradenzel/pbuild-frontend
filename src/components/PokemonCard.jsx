/* eslint-disable react/prop-types */
"use client"

import { useState, useEffect } from "react"
import PokemonHeader from "./pokemon/PokemonHeader"
import PokemonTabs from "./pokemon/PokemonTabs"

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
  const [activeTab, setActiveTab] = useState("stats")
  const [stats, setStats] = useState({})
  const [moves, setMoves] = useState(["", "", "", ""])
  const [heldItem, setHeldItem] = useState("")
  const [isExpanded, setIsExpanded] = useState(false)

  useEffect(() => {
    const fetchDetails = async () => {
      if (pokemon.sprites) {
        setDetails(pokemon)
        initializeStats(pokemon)
      } else {
        try {
          const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`)
          if (!response.ok) throw new Error("Failed to fetch Pokémon details")
          const data = await response.json()
          setDetails(data)
          initializeStats(data)
        } catch (error) {
          console.error("Error fetching Pokémon details:", error)
        }
      }
    }

    fetchDetails()
  }, [pokemon])

  const initializeStats = (pokemonData) => {
    const initialStats = {}
    pokemonData.stats.forEach((stat) => {
      initialStats[stat.stat.name] = stat.base_stat
    })
    setStats(initialStats)
  }

  const handleStatChange = (statName, value) => {
    setStats((prevStats) => ({
      ...prevStats,
      [statName]: Number.parseInt(value, 10),
    }))
  }

  const handleMoveChange = (index, value) => {
    const newMoves = [...moves]
    newMoves[index] = value
    setMoves(newMoves)
  }

  const handleItemChange = (value) => {
    setHeldItem(value)
  }

  if (!details)
    return <div className="bg-gray-700 p-4 rounded-lg h-full flex items-center justify-center">Loading...</div>

  const primaryType = details.types[0].type.name
  const cardStyle = {
    backgroundColor: `${typeColors[primaryType]}33`,
  }

  return (
    <div
      className={`w-full bg-gray-700 rounded-lg shadow-md overflow-hidden transition-all duration-300 ${isExpanded ? "h-auto" : "h-48"}`}
      style={cardStyle}
      data-testid="pokemon-card"
    >
      <PokemonHeader
        details={details}
        onRemove={() => onRemove(details.name)}
        isExpanded={isExpanded}
        setIsExpanded={setIsExpanded}
        typeColors={typeColors}
      />

      {isExpanded && (
        <PokemonTabs
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          stats={stats}
          baseStats={details.stats}
          onStatChange={handleStatChange}
          moves={moves}
          onMoveChange={handleMoveChange}
          item={heldItem}
          onItemChange={handleItemChange}
        />
      )}
    </div>
  )
}

export default PokemonCard

