// LoginForm.jsx
import { useState } from "react"
import { useAuth } from "./AuthContext"
import { useNavigate, Link } from "react-router-dom"

export default function LoginForm() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")

    const success = await login(email, password)
    if (success) {
      navigate("/dashboard")
    } else {
      setError("Invalid email or password")
    }
  }

  return (
    <div className="max-w-md w-full mx-auto">
      <form onSubmit={handleSubmit} className="bg-gray-800 shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        {error && <div className="bg-red-500 text-white px-4 py-3 rounded mb-4">{error}</div>}
        <div className="mb-4">
          <label className="block text-gray-300 text-sm font-bold mb-2" htmlFor="email">
            Email
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="email"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-300 text-sm font-bold mb-2" htmlFor="password">
            Password
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
            type="submit"
          >
            Sign In
          </button>
        </div>
        <div className="mt-4 text-center">
          <Link to="/register" className="text-blue-400 hover:text-blue-300">
            Don&apos;t have an account? Register here
          </Link>
        </div>
      </form>
    </div>
  )
}
