/* eslint-disable react/prop-types */
"use client"

export default function StatEditor({ stats, baseStats, onStatChange }) {
  const statNames = {
    hp: "HP",
    attack: "Attack",
    defense: "Defense",
    "special-attack": "Sp. Atk",
    "special-defense": "Sp. Def",
    speed: "Speed",
  }

  return (
    <div className="space-y-2">
      {baseStats.map((stat) => (
        <div key={stat.stat.name} className="flex items-center justify-between">
          <label className="text-xs w-20">{statNames[stat.stat.name]}:</label>
          <input
            type="range"
            min="1"
            max="255"
            value={stats[stat.stat.name] || stat.base_stat}
            onChange={(e) => onStatChange(stat.stat.name, e.target.value)}
            className="w-24 h-2"
          />
          <span className="text-xs w-8 text-right">{stats[stat.stat.name] || stat.base_stat}</span>
        </div>
      ))}
    </div>
  )
}

