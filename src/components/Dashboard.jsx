"use client"

import { useState } from "react"
import PokemonList from "./PokemonList"
import TeamList from "./TeamList"
import TeamManagement from "./TeamManagement"

export default function Dashboard() {
  const [team, setTeam] = useState([])

  const addToTeam = (pokemon) => {
    if (team.length < 6 && !team.some((p) => p.name === pokemon.name)) {
      setTeam([...team, pokemon])
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

