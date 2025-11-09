# React Blog Application

A modern blog application built with React.js, featuring like and share functionality.

## Features

- ✅ Create, read, update, and delete blog posts
- ✅ Like posts with persistent like counts
- ✅ Share posts on Facebook, Twitter, LinkedIn, or copy link
- ✅ Add comments to posts
- ✅ Responsive design with Tailwind CSS
- ✅ Local storage persistence

## Tech Stack

- **Framework**: React.js (functional components with hooks)
- **Styling**: Tailwind CSS
- **Routing**: React Router v6
- **State Management**: React Context API
- **Build Tool**: Vite

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

The app will be available at `http://localhost:5173`

### Build

```bash
npm run build
```

## Project Structure

```
src/
├── components/
│   ├── Header.jsx          # Navigation bar
│   ├── Home.jsx             # Blog list with like/share
│   ├── PostDetail.jsx       # Full post view with like/share
│   ├── CreatePost.jsx       # Create/edit post form
│   ├── CommentList.jsx      # Display comments
│   ├── AddComment.jsx       # Add comment form
│   ├── LikeButton.jsx       # Like button component
│   └── ShareButton.jsx      # Share button with menu
├── context/
│   └── BlogContext.jsx      # Global state management
├── App.jsx                  # Root component with router
├── main.jsx                 # Entry point
└── index.css               # Tailwind CSS imports
```

## Components

### LikeButton
- Displays like count
- Toggles like on click
- Persists likes in localStorage

### ShareButton
- Dropdown menu with share options
- Facebook, Twitter, LinkedIn sharing
- Copy link to clipboard
- Opens share dialogs in new windows

## License

MIT

