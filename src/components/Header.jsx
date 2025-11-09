import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const Header = () => {
  const navigate = useNavigate()
  const { user, logout, isAuthenticated } = useAuth()

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <header className="bg-blue-600 text-white shadow-lg">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="text-2xl font-bold hover:text-blue-200 transition">
            Blogsphere
          </Link>
          <div className="flex items-center gap-4">
            <Link
              to="/"
              className="px-4 py-2 rounded hover:bg-blue-700 transition"
            >
              Home
            </Link>
            <Link
              to="/create"
              className="px-4 py-2 rounded hover:bg-blue-700 transition"
            >
              Create Post
            </Link>
            {isAuthenticated ? (
              <>
                <span className="px-4 py-2 text-blue-100">
                  Welcome, {user.name}!
                </span>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 rounded hover:bg-blue-700 transition"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => navigate('/login')}
                  className="px-4 py-2 rounded hover:bg-blue-700 transition"
                >
                  Login
                </button>
                <button
                  onClick={() => navigate('/signup')}
                  className="px-4 py-2 bg-blue-500 rounded hover:bg-blue-700 transition"
                >
                  Sign Up
                </button>
              </>
            )}
          </div>
        </div>
      </nav>
    </header>
  )
}

export default Header

