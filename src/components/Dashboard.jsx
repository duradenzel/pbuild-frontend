
import { useState } from "react"

import PokemonList from "./PokemonList"
import TeamList from "./Teamlist"
import TeamManagement from "./TeamManagement"

export default function Dashboard() {
  
  const [team, setTeam] = useState([])
  console.log(team)

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
    <div className="flex flex-col space-y-6 w-full max-w-6xl mx-auto">
      
      <TeamManagement currentTeam={team} onLoadTeam={loadTeam} />
      <PokemonList onSelectPokemon={addToTeam} />
      <TeamList team={team} onRemovePokemon={removeFromTeam} />
    </div>
  )
}
