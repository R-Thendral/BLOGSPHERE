import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { BlogProvider } from './context/BlogContext'
import { AuthProvider } from './context/AuthContext'
import Header from './components/Header'
import Home from './components/Home'
import PostDetail from './components/PostDetail'
import CreatePost from './components/CreatePost'
import Login from './components/Login'
import SignUp from './components/SignUp'

function App() {
  return (
    <AuthProvider>
      <BlogProvider>
        <Router>
          <div className="min-h-screen bg-gray-50">
            <Header />
            <main>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/post/:id" element={<PostDetail />} />
                <Route path="/create" element={<CreatePost />} />
                <Route path="/edit/:id" element={<CreatePost />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<SignUp />} />
              </Routes>
            </main>
          </div>
        </Router>
      </BlogProvider>
    </AuthProvider>
  )
}

export default App

