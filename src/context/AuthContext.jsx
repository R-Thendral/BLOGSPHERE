import React, { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext()

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('currentUser')
    return savedUser ? JSON.parse(savedUser) : null
  })

  const [users, setUsers] = useState(() => {
    const savedUsers = localStorage.getItem('users')
    return savedUsers ? JSON.parse(savedUsers) : []
  })

  // Save current user to localStorage whenever it changes
  useEffect(() => {
    if (user) {
      localStorage.setItem('currentUser', JSON.stringify(user))
    } else {
      localStorage.removeItem('currentUser')
    }
  }, [user])

  // Save users to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('users', JSON.stringify(users))
  }, [users])

  const signUp = (email, password, name) => {
    // Check if user already exists
    const existingUser = users.find(u => u.email === email)
    if (existingUser) {
      return { success: false, message: 'User with this email already exists' }
    }

    // Create new user
    const newUser = {
      id: Date.now().toString(),
      email,
      password, // In a real app, this should be hashed
      name: name || email.split('@')[0],
      createdAt: new Date().toISOString(),
    }

    setUsers([...users, newUser])
    setUser(newUser)
    return { success: true, message: 'Account created successfully!' }
  }

  const login = (email, password) => {
    const foundUser = users.find(u => u.email === email && u.password === password)
    
    if (foundUser) {
      // Remove password from user object before storing
      const { password: _, ...userWithoutPassword } = foundUser
      setUser(userWithoutPassword)
      return { success: true, message: 'Login successful!' }
    }
    
    return { success: false, message: 'Invalid email or password' }
  }

  const logout = () => {
    setUser(null)
  }

  const value = {
    user,
    signUp,
    login,
    logout,
    isAuthenticated: !!user,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

