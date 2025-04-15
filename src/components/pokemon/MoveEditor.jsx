/* eslint-disable react/prop-types */

export default function MoveEditor({ moves, onMoveChange }) {
  return (
    <div className="space-y-2">
      {[0, 1, 2, 3].map((index) => (
        <div key={index} className="flex items-center">
          <label className="text-xs w-12">Move {index + 1}:</label>
          <input
            type="text"
            value={moves[index]}
            onChange={(e) => onMoveChange(index, e.target.value)}
            placeholder="Enter move name"
            className="flex-1 p-1 text-xs bg-gray-600 border border-gray-500 rounded"
          />
        </div>
      ))}
    </div>
  )
}

