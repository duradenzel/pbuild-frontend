/* eslint-disable react/prop-types */
"use client"

import { useEffect, useState } from "react"
import { useAuth } from "./AuthContext"
import { useNavigate, useLocation } from "react-router-dom"

export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    if (!loading) {
      if (!user) {
        navigate("/login", { state: { from: location }, replace: true })
      } else {
        setIsReady(true)
      }
    }
  }, [user, loading, navigate, location])

  if (loading || !isReady) {
    return <div>Loading...</div>
  }

  return children
}

