/* eslint-disable react/prop-types */
"use client"

import StatEditor from "./StatEditor"
import MoveEditor from "./MoveEditor"
import ItemEditor from "./ItemEditor"

export default function PokemonTabs({
  activeTab,
  setActiveTab,
  stats,
  baseStats,
  onStatChange,
  moves,
  onMoveChange,
  item,
  onItemChange,
}) {
  return (
    <div className="p-2 border-t border-gray-600">
      <div className="flex mb-2 border-b border-gray-600">
        <button
          className={`px-3 py-1 text-sm ${activeTab === "stats" ? "bg-gray-600 text-white" : "text-gray-300"}`}
          onClick={() => setActiveTab("stats")}
        >
          Stats
        </button>
        <button
          className={`px-3 py-1 text-sm ${activeTab === "moves" ? "bg-gray-600 text-white" : "text-gray-300"}`}
          onClick={() => setActiveTab("moves")}
        >
          Moves
        </button>
        <button
          className={`px-3 py-1 text-sm ${activeTab === "item" ? "bg-gray-600 text-white" : "text-gray-300"}`}
          onClick={() => setActiveTab("item")}
        >
          Item
        </button>
      </div>

      {activeTab === "stats" && <StatEditor stats={stats} baseStats={baseStats} onStatChange={onStatChange} />}

      {activeTab === "moves" && <MoveEditor moves={moves} onMoveChange={onMoveChange} />}

      {activeTab === "item" && <ItemEditor item={item} onItemChange={onItemChange} />}
    </div>
  )
}

