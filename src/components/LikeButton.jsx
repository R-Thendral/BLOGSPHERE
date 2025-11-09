import React from 'react'
import { useBlog } from '../context/BlogContext'

const LikeButton = ({ postId }) => {
  const { toggleLike, getLikeCount } = useBlog()
  const likeCount = getLikeCount(postId)

  const handleLike = () => {
    toggleLike(postId)
  }

  return (
    <button
      onClick={handleLike}
      className="flex items-center gap-2 px-3 py-2 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg transition-colors"
      aria-label="Like this post"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fillRule="evenodd"
          d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
          clipRule="evenodd"
        />
      </svg>
      <span className="font-medium">{likeCount}</span>
    </button>
  )
}

export default LikeButton

