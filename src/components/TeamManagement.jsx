/* eslint-disable react/prop-types */
"use client"

import { useState } from "react"
import { useAuth } from "./AuthContext"

function TeamManagement({ currentTeam, onLoadTeam }) {
  const [teamName, setTeamName] = useState("")
  const [savedTeams, setSavedTeams] = useState([])
  const [message, setMessage] = useState("")
  const [editingTeam, setEditingTeam] = useState(null)
  const { saveTeam, loadTeams, updateTeam, deleteTeam } = useAuth()

  const handleSaveTeam = async () => {
    if (teamName.trim() === "") {
      setMessage("Please enter a team name")
      return
    }
    if (currentTeam.length === 0) {
      setMessage("Your team is empty")
      return
    }

    let success
    if (editingTeam) {
      // Update existing team
      success = await updateTeam(editingTeam.id, teamName, currentTeam)
      if (success) {
        setMessage(`Team "${teamName}" updated successfully`)
        setEditingTeam(null)
      } else {
        setMessage("Failed to update team")
      }
    } else {
      // Create new team
      success = await saveTeam(teamName, currentTeam)
      if (success) {
        setMessage(`Team "${teamName}" saved successfully`)
      } else {
        setMessage("Failed to save team")
      }
    }

    if (success) {
      setTeamName("")
      handleLoadTeams()
    }
  }

  const handleLoadTeams = async () => {
    const teams = await loadTeams()
    setSavedTeams(teams)
    if (teams.length === 0) {
      setMessage("No saved teams found")
    } else {
      setMessage("")
    }
  }

  const handleLoadTeam = async (teamId) => {
    console.log("selected team id:" + teamId)
    try {
      const token = localStorage.getItem("token")

      const response = await fetch(`http://localhost:5286/api/Team/${teamId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (!response.ok) {
        throw new Error("Failed to fetch team details")
      }
      const teamData = await response.json()

      console.log("Team Data:", teamData)

      const loadedTeam = await Promise.all(
        teamData.pokemons.map(async (pokemon) => {
          const pokemonResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`)
          if (!pokemonResponse.ok) throw new Error(`Failed to fetch details for ${pokemon.name}`)
          return await pokemonResponse.json()
        }),
      )

      onLoadTeam(loadedTeam)

      setMessage(`Team "${teamData.name}" loaded successfully`)
    } catch (error) {
      console.error("Error loading team:", error)
      setMessage("Failed to load team. Please try again.")
    }
  }

  const handleEditTeam = async (team) => {
    try {
      const token = localStorage.getItem("token")

      const response = await fetch(`http://localhost:5286/api/Team/${team.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (!response.ok) {
        throw new Error("Failed to fetch team details")
      }
      const teamData = await response.json()

      const loadedTeam = await Promise.all(
        teamData.pokemons.map(async (pokemon) => {
          const pokemonResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`)
          if (!pokemonResponse.ok) throw new Error(`Failed to fetch details for ${pokemon.name}`)
          return await pokemonResponse.json()
        }),
      )

      onLoadTeam(loadedTeam)
      setTeamName(teamData.name)
      setEditingTeam(team)
      setMessage(`Editing team "${teamData.name}"`)
    } catch (error) {
      console.error("Error loading team for edit:", error)
      setMessage("Failed to load team for editing. Please try again.")
    }
  }

  const handleDeleteTeam = async (teamId, teamName) => {
    if (window.confirm(`Are you sure you want to delete the team "${teamName}"?`)) {
      try {
        const success = await deleteTeam(teamId)
        if (success) {
          setMessage(`Team "${teamName}" deleted successfully`)
          handleLoadTeams()

          // If we're currently editing this team, reset the form
          if (editingTeam && editingTeam.id === teamId) {
            setEditingTeam(null)
            setTeamName("")
          }
        } else {
          setMessage("Failed to delete team")
        }
      } catch (error) {
        console.error("Error deleting team:", error)
        setMessage("Failed to delete team. Please try again.")
      }
    }
  }

  const handleCancelEdit = () => {
    setEditingTeam(null)
    setTeamName("")
    setMessage("")
  }

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-md w-full">
      <h2 className="text-2xl font-semibold mb-4">
        {editingTeam ? `Edit Team: ${editingTeam.name}` : "Team Management"}
      </h2>
      <div className="flex flex-col space-y-4">
        <div className="flex space-x-2">
          <input
            type="text"
            value={teamName}
            onChange={(e) => setTeamName(e.target.value)}
            placeholder="Enter team name"
            className="flex-grow p-2 rounded bg-gray-700 text-white"
          />
          <button
            onClick={handleSaveTeam}
            className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded"
          >
            {editingTeam ? "Update Team" : "Save Team"}
          </button>
          {editingTeam && (
            <button
              onClick={handleCancelEdit}
              className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
            >
              Cancel
            </button>
          )}
        </div>
        <button
          onClick={handleLoadTeams}
          className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded"
        >
          Load Teams
        </button>
        {message && <p className="text-yellow-400">{message}</p>}
        {savedTeams.length > 0 && (
          <div className="mt-4">
            <h3 className="text-xl font-semibold mb-2">Saved Teams</h3>
            <ul className="space-y-2">
              {savedTeams.map((team) => (
                <li key={team.id} className="flex justify-between items-center p-2 bg-gray-700 rounded">
                  <span className="font-medium">{team.name}</span>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleLoadTeam(team.id)}
                      className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-1 px-2 rounded text-sm"
                    >
                      Load
                    </button>
                    <button
                      onClick={() => handleEditTeam(team)}
                      className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-1 px-2 rounded text-sm"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteTeam(team.id, team.name)}
                      className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded text-sm"
                    >
                      Delete
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  )
}

export default TeamManagement

