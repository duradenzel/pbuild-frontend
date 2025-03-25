/* eslint-disable react/prop-types */

export default function ItemEditor({ item, onItemChange }) {
  return (
    <div className="flex items-center">
      <label className="text-xs w-16">Held Item:</label>
      <input
        type="text"
        value={item}
        onChange={(e) => onItemChange(e.target.value)}
        placeholder="Enter item name"
        className="flex-1 p-1 text-xs bg-gray-600 border border-gray-500 rounded"
      />
    </div>
  )
}

