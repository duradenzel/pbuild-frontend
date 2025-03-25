/* eslint-disable react/prop-types */
"use client"

export default function PokemonHeader({ details, onRemove, isExpanded, setIsExpanded, typeColors }) {
  const primaryType = details.types[0].type.name
  const secondaryType = details.types[1]?.type.name

  const typeStyle = (type) => ({
    backgroundColor: typeColors[type],
    color: "#fff",
    padding: "0.25rem 0.5rem",
    borderRadius: "0.25rem",
    fontSize: "0.75rem",
    fontWeight: "bold",
  })

  return (
    <>
      <div className="relative">
        <img
          src={details.sprites.other.showdown.front_default || "/placeholder.svg"}
          alt={details.name}
          className="w-full h-32 object-contain bg-gray-800"
        />
        <button
          onClick={onRemove}
          className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
        >
          ×
        </button>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="absolute bottom-2 right-2 bg-gray-600 text-white rounded-full w-6 h-6 flex items-center justify-center"
        >
          {isExpanded ? "−" : "+"}
        </button>
      </div>
      <div className="p-2 flex flex-col justify-between">
        <h3 className="text-sm font-semibold capitalize mb-1 truncate">{details.name}</h3>
        <div className="flex flex-wrap gap-1">
          <span style={typeStyle(primaryType)} className="text-xs">
            {primaryType}
          </span>
          {secondaryType && (
            <span style={typeStyle(secondaryType)} className="text-xs">
              {secondaryType}
            </span>
          )}
        </div>
      </div>
    </>
  )
}

