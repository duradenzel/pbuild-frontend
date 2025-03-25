/* eslint-disable react/prop-types */
"use client"
import PokemonCard from "./PokemonCard"

function TeamList({ team, onRemovePokemon }) {
  return (
    <div className="w-full">
      <h2 className="text-2xl font-semibold mb-4">Your Team</h2>
      <div className="flex flex-wrap gap-4">
        {[...team, ...Array(6 - team.length).fill(null)].map((pokemon, index) => (
          <div
            key={pokemon ? pokemon.name : `empty-${index}`}
            className="w-full sm:w-[calc(50%-0.5rem)] md:w-[calc(33.33%-1rem)] lg:w-[calc(33.33%-1rem)]"
          >
            {pokemon ? (
              <PokemonCard pokemon={pokemon} onRemove={onRemovePokemon} />
            ) : (
              <div className="bg-gray-700 p-4 rounded-lg h-48 flex items-center justify-center">
                <span className="text-gray-400">Empty Slot</span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default TeamList

