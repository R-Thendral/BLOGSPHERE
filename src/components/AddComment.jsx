import React, { useState } from 'react'
import { useBlog } from '../context/BlogContext'

const AddComment = ({ postId }) => {
  const { addComment } = useBlog()
  const [formData, setFormData] = useState({
    author: '',
    text: '',
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (!formData.text.trim()) {
      alert('Please enter a comment')
      return
    }

    addComment(postId, formData)
    setFormData({
      author: '',
      text: '',
    })
  }

  return (
    <form onSubmit={handleSubmit} className="border-t pt-6">
      <h3 className="text-xl font-semibold mb-4 text-gray-800">Add a Comment</h3>
      
      <div className="mb-4">
        <input
          type="text"
          name="author"
          value={formData.author}
          onChange={handleChange}
          placeholder="Your name (optional)"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent mb-3"
        />
        <textarea
          name="text"
          value={formData.text}
          onChange={handleChange}
          rows="3"
          placeholder="Write your comment..."
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          required
        />
      </div>

      <button
        type="submit"
        className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
      >
        Post Comment
      </button>
    </form>
  )
}

export default AddComment

