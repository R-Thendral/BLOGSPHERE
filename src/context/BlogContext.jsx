import React, { createContext, useContext, useState, useEffect } from 'react'

const BlogContext = createContext()

export const useBlog = () => {
  const context = useContext(BlogContext)
  if (!context) {
    throw new Error('useBlog must be used within a BlogProvider')
  }
  return context
}

const defaultPosts = [
  {
    id: '1',
    title: 'Getting Started with React Hooks',
    content: 'React Hooks revolutionized the way we write React components. They allow us to use state and other React features without writing a class. In this post, we\'ll explore the most commonly used hooks like useState, useEffect, and useContext. Understanding hooks is essential for modern React development, and they make our code more reusable and easier to understand.',
    createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    isPermanent: true,
    comments: [
      {
        id: 'c1',
        author: 'John Doe',
        text: 'Great introduction to hooks! Very helpful.',
        createdAt: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString(),
      }
    ]
  },
  {
    id: '2',
    title: 'Mastering Tailwind CSS',
    content: 'Tailwind CSS is a utility-first CSS framework that allows you to rapidly build custom user interfaces. Unlike traditional CSS frameworks, Tailwind provides low-level utility classes that you can compose to build any design. This approach offers flexibility and speed, making it a favorite among developers who want to build modern, responsive designs quickly.',
    createdAt: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString(),
    isPermanent: true,
    comments: []
  },
  {
    id: '3',
    title: 'Understanding React Context API',
    content: 'The Context API provides a way to pass data through the component tree without having to pass props down manually at every level. This is particularly useful for sharing data that can be considered "global" for a tree of React components, such as the current authenticated user, theme, or preferred language. In this tutorial, we\'ll build a complete example using Context API for state management.',
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    isPermanent: true,
    comments: [
      {
        id: 'c2',
        author: 'Jane Smith',
        text: 'This cleared up a lot of confusion I had about Context API. Thanks!',
        createdAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
      },
      {
        id: 'c3',
        author: 'Mike Johnson',
        text: 'When should I use Context vs Redux?',
        createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
      }
    ]
  },
  {
    id: '4',
    title: 'Building Responsive Web Applications',
    content: 'Responsive design is no longer optional—it\'s essential. With the variety of devices and screen sizes available today, your web application must work seamlessly across all platforms. This post covers the fundamentals of responsive design, including flexible grids, media queries, and modern CSS techniques like Flexbox and Grid. We\'ll also discuss mobile-first approaches and performance optimization.',
    createdAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
    isPermanent: true,
    comments: []
  },
  {
    id: '5',
    title: 'JavaScript ES6+ Features You Should Know',
    content: 'Modern JavaScript has introduced many powerful features that make development more enjoyable and code more maintainable. From arrow functions and destructuring to async/await and modules, ES6+ features have transformed how we write JavaScript. This comprehensive guide will walk you through the most important features with practical examples and use cases.',
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    isPermanent: true,
    comments: []
  },
  {
    id: '6',
    title: 'The Art of Code Review',
    content: 'Code reviews are a crucial part of the software development process. They help catch bugs early, share knowledge among team members, and maintain code quality standards. However, conducting effective code reviews requires more than just looking for syntax errors. This post explores best practices for both reviewers and authors, including how to give constructive feedback and how to respond to review comments professionally.',
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    isPermanent: true,
    comments: [
      {
        id: 'c4',
        author: 'Sarah Williams',
        text: 'Great tips! I\'ll share this with my team.',
        createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
      }
    ]
  },
  {
    id: '7',
    title: 'Introduction to RESTful APIs',
    content: 'REST (Representational State Transfer) is an architectural style for designing networked applications. RESTful APIs use HTTP requests to GET, PUT, POST, and DELETE data. Understanding REST principles is fundamental for any developer working with web services. This post covers the basics of REST, HTTP methods, status codes, and best practices for designing and consuming RESTful APIs.',
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    isPermanent: true,
    comments: []
  },
  {
    id: '8',
    title: 'Git Workflow Best Practices',
    content: 'Version control is essential for any development project, and Git has become the industry standard. However, using Git effectively requires understanding not just the commands, but also the workflows and best practices. This guide covers branching strategies, commit message conventions, pull request workflows, and how to handle common Git scenarios. Whether you\'re working solo or in a team, these practices will help you use Git more effectively.',
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    isPermanent: true,
    comments: []
  },
  {
    id: '9',
    title: 'Performance Optimization Techniques',
    content: 'Website performance directly impacts user experience and search engine rankings. Slow-loading pages lead to higher bounce rates and lower conversions. This comprehensive guide covers various optimization techniques including code splitting, lazy loading, image optimization, caching strategies, and bundle size reduction. We\'ll also discuss tools for measuring and monitoring performance.',
    createdAt: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
    isPermanent: true,
    comments: []
  },
  {
    id: '10',
    title: 'Building Accessible Web Applications',
    content: 'Web accessibility ensures that people with disabilities can perceive, understand, navigate, and interact with web applications. Making your application accessible is not just the right thing to do—it\'s also required by law in many jurisdictions and improves the experience for all users. This post covers WCAG guidelines, semantic HTML, ARIA attributes, keyboard navigation, and testing tools for accessibility.',
    createdAt: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
    isPermanent: true,
    comments: []
  }
]

export const BlogProvider = ({ children }) => {
  const [posts, setPosts] = useState(() => {
    const savedPosts = localStorage.getItem('blogPosts')
    if (savedPosts) {
      const parsed = JSON.parse(savedPosts)
      // Always ensure permanent posts are included
      const permanentPostIds = defaultPosts.map(p => p.id)
      const existingPermanentPosts = parsed.filter(p => p.isPermanent)
      const userPosts = parsed.filter(p => !p.isPermanent)
      
      // Merge permanent posts with user posts, ensuring all permanent posts exist
      const allPermanentPosts = defaultPosts.map(defaultPost => {
        const existing = existingPermanentPosts.find(p => p.id === defaultPost.id)
        return existing || defaultPost
      })
      
      return [...allPermanentPosts, ...userPosts]
    }
    // Initialize with default posts if no saved posts exist
    return defaultPosts
  })

  const [likes, setLikes] = useState(() => {
    const savedLikes = localStorage.getItem('blogLikes')
    return savedLikes ? JSON.parse(savedLikes) : {}
  })

  // Save posts to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('blogPosts', JSON.stringify(posts))
  }, [posts])

  // Save likes to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('blogLikes', JSON.stringify(likes))
  }, [likes])

  const addPost = (post) => {
    const newPost = {
      id: Date.now().toString(),
      ...post,
      createdAt: new Date().toISOString(),
    }
    setPosts([newPost, ...posts])
    return newPost.id
  }

  const updatePost = (id, updatedPost) => {
    const post = posts.find(p => p.id === id)
    if (post && post.isPermanent) {
      return false
    }
    setPosts(posts.map(post => 
      post.id === id ? { ...post, ...updatedPost } : post
    ))
    return true
  }

  const deletePost = (id) => {
    // Prevent deletion of permanent posts
    const post = posts.find(p => p.id === id)
    if (post && post.isPermanent) {
      return false
    }
    setPosts(posts.filter(post => post.id !== id))
    return true
  }

  const getPost = (id) => {
    return posts.find(post => post.id === id)
  }

  const toggleLike = (postId) => {
    setLikes(prev => ({
      ...prev,
      [postId]: prev[postId] ? prev[postId] + 1 : 1
    }))
  }

  const getLikeCount = (postId) => {
    return likes[postId] || 0
  }

  const addComment = (postId, comment) => {
    const newComment = {
      id: Date.now().toString(),
      ...comment,
      createdAt: new Date().toISOString(),
    }
    setPosts(posts.map(post => 
      post.id === postId 
        ? { ...post, comments: [...(post.comments || []), newComment] }
        : post
    ))
  }

  const value = {
    posts,
    addPost,
    updatePost,
    deletePost,
    getPost,
    toggleLike,
    getLikeCount,
    addComment,
  }

  return <BlogContext.Provider value={value}>{children}</BlogContext.Provider>
}

