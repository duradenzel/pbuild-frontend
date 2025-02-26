/* eslint-disable react/prop-types */
"use client"

import { useState } from "react"
import { useAuth } from "./AuthContext"

function TeamManagement({ currentTeam, onLoadTeam }) {
  const [teamName, setTeamName] = useState("")
  const [savedTeams, setSavedTeams] = useState([])
  const [message, setMessage] = useState("")
  const { saveTeam, loadTeams } = useAuth()

  const handleSaveTeam = async () => {
    if (teamName.trim() === "") {
      setMessage("Please enter a team name")
      return
    }
    if (currentTeam.length === 0) {
      setMessage("Your team is empty")
      return
    }
    const success = await saveTeam(teamName, currentTeam)
    if (success) {
      setMessage("Team saved successfully")
      setTeamName("")
      handleLoadTeams()
    } else {
      setMessage("Failed to save team")
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
      const token = localStorage.getItem("token");
  
      const response = await fetch(`http://localhost:5286/api/Team/${teamId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      if (!response.ok) {
        throw new Error("Failed to fetch team details");
      }
      const teamData = await response.json();
  
      console.log('Team Data:', teamData);
  
      const loadedTeam = await Promise.all(
        teamData.pokemons.map(async (pokemon) => {
          const pokemonResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`);
          if (!pokemonResponse.ok) throw new Error(`Failed to fetch details for ${pokemon.name}`);
          return await pokemonResponse.json();
        })
      );
  
      onLoadTeam(loadedTeam);
      
      setMessage(`Team "${teamData.name}" loaded successfully`);
    } catch (error) {
      console.error("Error loading team:", error);
      setMessage("Failed to load team. Please try again.");
    }
  };
  
  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-md w-full">
      <h2 className="text-2xl font-semibold mb-4">Team Management</h2>
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
            Save Team
          </button>
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
                <li key={team.id} className="flex justify-between items-center">
                  <span>{team.name}</span>
                  
                  <button
                    onClick={() => handleLoadTeam(team.id)}
                    className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-1 px-2 rounded text-sm"
                  >
                    Load
                  </button>
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

