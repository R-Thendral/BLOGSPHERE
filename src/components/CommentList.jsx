import React from 'react'

const CommentList = ({ comments }) => {
  if (!comments || comments.length === 0) {
    return (
      <p className="text-gray-500 italic">No comments yet. Be the first to comment!</p>
    )
  }

  return (
    <div className="space-y-4 mb-6">
      {comments.map((comment) => (
        <div
          key={comment.id}
          className="bg-gray-50 rounded-lg p-4 border-l-4 border-blue-500"
        >
          <div className="flex items-start justify-between mb-2">
            <h4 className="font-semibold text-gray-800">
              {comment.author || 'Anonymous'}
            </h4>
            <span className="text-sm text-gray-500">
              {new Date(comment.createdAt).toLocaleDateString()}
            </span>
          </div>
          <p className="text-gray-700">{comment.text}</p>
        </div>
      ))}
    </div>
  )
}

export default CommentList

