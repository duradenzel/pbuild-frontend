"use client"

import { useState } from "react"
import PokemonList from "./PokemonList"
import TeamList from "./TeamList"
import TeamManagement from "./TeamManagement"

export default function Dashboard() {
  const [team, setTeam] = useState([])
  console.log(team)

  const addToTeam = async (pokemon) => {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`)
    if (!response.ok) throw new Error("Failed to fetch Pokémon details")
      const fetchedPokemon = await response.json()
    console.log(fetchedPokemon)
    
    const modifiedPokemon = {
      ...pokemon,
      hp: fetchedPokemon.stats[0]?.base_stat,
      attack: fetchedPokemon.stats[1]?.base_stat,
      defense: fetchedPokemon.stats[2]?.base_stat,
      sp_attack: fetchedPokemon.stats[3]?.base_stat,
      sp_defense: fetchedPokemon.stats[4]?.base_stat,
      speed: fetchedPokemon.stats[5]?.base_stat,
    }
    console.log(modifiedPokemon)

    if (team.length < 6 && !team.some((p) => p.name === pokemon.name)) {
      setTeam([...team, modifiedPokemon])
    }
  
  }

  const removeFromTeam = (pokemonName) => {
    setTeam(team.filter((p) => p.name !== pokemonName))
  }

  const loadTeam = (loadedTeam) => {
    setTeam(loadedTeam)
  }

  return (
    <div className="flex flex-col space-y-6 w-full max-w-7xl mx-auto px-4">
   

      <div className="flex flex-col lg:flex-row gap-6">
        <div className="w-full lg:w-1/2">
          <TeamManagement currentTeam={team} onLoadTeam={loadTeam} />
        </div>
        <div className="w-full lg:w-1/2">
          <PokemonList onSelectPokemon={addToTeam} />
        </div>
      </div>

      <TeamList team={team} onRemovePokemon={removeFromTeam} />
    </div>
  )
}

