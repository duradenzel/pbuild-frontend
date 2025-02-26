/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
"use client"

import { createContext, useContext, useState, useEffect } from "react"

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem("token")
    const storedUser = localStorage.getItem("user")
    if (token && storedUser) {
      setUser(JSON.parse(storedUser))
    }
    setLoading(false)
  }, [])

  const login = async (email, password) => {
    try {
      const response = await fetch("http://localhost:5286/api/User/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      })

      if (!response.ok) {
        throw new Error("Login failed")
      }

      const data = await response.json()
      localStorage.setItem("token", data.token)
      localStorage.setItem(
        "user",
        JSON.stringify({
          id: data.userId,
          email: data.email,
        }),
      )

      setUser({
        id: data.userId,
        email: data.email,
      })

      return true
    } catch (error) {
      console.error("Login error:", error)
      return false
    }
  }

  const register = async (name, email, password) => {
    try {
      const response = await fetch("http://localhost:5286/api/User/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      })

      if (!response.ok) {
        throw new Error("Registration failed")
      }

      return true
    } catch (error) {
      console.error("Registration error:", error)
      return false
    }
  }

  const logout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    setUser(null)
  }

  const getProfile = async () => {
    try {
      const token = localStorage.getItem("token")
      const response = await fetch("http://localhost:5286/api/User/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (!response.ok) {
        throw new Error("Failed to fetch profile")
      }

      return await response.json()
    } catch (error) {
      console.error("Profile fetch error:", error)
      return null
    }
  }

  const saveTeam = async (teamName, team) => {
    try {
      const token = localStorage.getItem("token")
      console.log("Token being sent:", token);

      const response = await fetch("http://localhost:5286/api/Team/save", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ Name: teamName, Pokemons: team }),
      })

      if (!response.ok) {
        throw new Error("Failed to save team")
      }

      return true
    } catch (error) {
      console.error("Save team error:", error)
      return false
    }
  }

  const loadTeams = async () => {
    try {
      const token = localStorage.getItem("token")
      const response = await fetch("http://localhost:5286/api/Team/list", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (!response.ok) {
        throw new Error("Failed to load teams")
      }

      return await response.json()
    } catch (error) {
      console.error("Load teams error:", error)
      return []
    }
  }

  return (
    <AuthContext.Provider value={{ user, login, register, logout, getProfile, loading, saveTeam, loadTeams }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)

