// App.jsx
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import { AuthProvider } from "./components/AuthContext"
import Layout from "./components/Layout"
import Dashboard from "./components/Dashboard"
import LoginForm from "./components/LoginForm"
import RegisterForm from "./components/RegisterForm"
import ProtectedRoute from "./components/ProtectedRoute"

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/login" element={<LoginForm />} />
            <Route path="/register" element={<RegisterForm />} />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </Layout>
      </Router>
    </AuthProvider>
  )
}
