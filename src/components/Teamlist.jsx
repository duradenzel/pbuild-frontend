/* eslint-disable react/prop-types */
"use client"
import PokemonCard from "./PokemonCard"

function TeamList({ team, onRemovePokemon }) {
  return (
    <div className="mt-8">
      <h2 className="text-2xl font-semibold mb-4">Your Team</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {team.map((pokemon) => (
          <PokemonCard key={pokemon.name} pokemon={pokemon} onRemove={onRemovePokemon} />
        ))}
        {[...Array(6 - team.length)].map((_, index) => (
          <div key={`empty-${index}`} className=" p-4 rounded-lg h-64 flex items-center justify-center">
            <span className="text-gray-400">Empty Slot</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default TeamList

