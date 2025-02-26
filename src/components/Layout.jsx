/* eslint-disable react/prop-types */
// Layout.jsx
import { Link } from "react-router-dom"
import { useAuth } from "./AuthContext"

export default function Layout({ children }) {
  const { user,logout } = useAuth()

  return (
    <div className="bg-gray-900 text-gray-100 min-h-screen">
      <nav className="bg-gray-800 shadow-md p-4">
        <div className="container mx-auto flex flex-col sm:flex-row justify-between items-center">
          <Link to="/" className="text-xl font-bold mb-4 sm:mb-0">
            Pokémon Team Builder
          </Link>
          <div className="flex space-x-4">
            {user ? (
              <div className="flex items-center justify-center">
              <h1 className="">Welcome, {user?.email}</h1>
              <button onClick={logout} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 ml-4 rounded">
               Logout
             </button>
              </div>
            ) : (
              <>
                <Link to="/login" className="text-blue-400 hover:text-blue-300">
                  Login
                </Link>
                <Link to="/register" className="text-blue-400 hover:text-blue-300">
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>
      <main className="container mx-auto px-4 py-8">{children}</main>
    </div>
  )
}
