
import PokemonList from "../components/PokemonList"
import { useState } from "react"
import TeamList from "../components/Teamlist"


const Homepage = () => {
  const [team, setTeam] = useState([])

  const addToTeam = (pokemon) => {
    if (team.length < 6 && !team.some((p) => p.name === pokemon.name)) {
      setTeam([...team, pokemon])
    }
  }

  const removeFromTeam = (pokemonName) => {
    setTeam(team.filter((p) => p.name !== pokemonName))
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-center">Pokémon Team Builder</h1>
      <PokemonList onSelectPokemon={addToTeam} />
      <TeamList team={team} onRemovePokemon={removeFromTeam} />
    </div>
  )
}

export default Homepage