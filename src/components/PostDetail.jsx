import React from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { useBlog } from '../context/BlogContext'
import LikeButton from './LikeButton'
import ShareButton from './ShareButton'
import CommentList from './CommentList'
import AddComment from './AddComment'

const PostDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { getPost, deletePost } = useBlog()
  const post = getPost(id)

  if (!post) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4 text-gray-800">Post Not Found</h1>
          <Link
            to="/"
            className="text-blue-600 hover:underline"
          >
            Back to Home
          </Link>
        </div>
      </div>
    )
  }

  const handleDelete = () => {
    if (post.isPermanent) {
      alert('This is a featured post and cannot be deleted.')
      return
    }
    if (window.confirm('Are you sure you want to delete this post?')) {
      const success = deletePost(id)
      if (success) {
        navigate('/')
      }
    }
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <Link
        to="/"
        className="text-blue-600 hover:underline mb-4 inline-block"
      >
        ← Back to Home
      </Link>

      <article className="bg-white rounded-lg shadow-lg p-8 mb-8">
        <div className="mb-6">
          <h1 className="text-4xl font-bold mb-4 text-gray-800">{post.title}</h1>
          <div className="flex items-center justify-between mb-6">
            <span className="text-gray-500">
              {new Date(post.createdAt).toLocaleDateString()}
            </span>
            <div className="flex items-center gap-4">
              <LikeButton postId={post.id} />
              <ShareButton postId={post.id} />
            </div>
          </div>
        </div>

        <div className="prose max-w-none mb-6">
          <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">
            {post.content}
          </p>
        </div>

        {!post.isPermanent && (
          <div className="flex gap-4 mt-8 pt-6 border-t">
            <Link
              to={`/edit/${id}`}
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
            >
              Edit Post
            </Link>
            <button
              onClick={handleDelete}
              className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
            >
              Delete Post
            </button>
          </div>
        )}
        {post.isPermanent && (
          <div className="mt-8 pt-6 border-t">
            <div className="flex items-center gap-2 text-yellow-600 bg-yellow-50 px-4 py-2 rounded-lg">
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <span className="font-medium">This is a featured post and cannot be edited or deleted.</span>
            </div>
          </div>
        )}
      </article>

      <div className="bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Comments</h2>
        <CommentList comments={post.comments || []} />
        <AddComment postId={id} />
      </div>
    </div>
  )
}

export default PostDetail

