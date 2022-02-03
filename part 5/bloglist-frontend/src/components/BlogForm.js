import React, { useState } from 'react'

const BlogForm = ({ createBlog }) => {
  const [newTitle, setTitle] = useState('')
  const [newAuthor, setAuthor] = useState('')
  const [newUrl, setUrl] = useState('')

  const addBlog = (event) => {
    event.preventDefault()
    createBlog({
      title: newTitle,
      author: newAuthor,
      url: newUrl
    })
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <form className='blogForm' onSubmit={addBlog}>
      <div>
        title: <input value={newTitle} id='title'
          onChange={({ target }) => setTitle(target.value)}
        />
      </div>
      <div>
        author: <input value={newAuthor} id='author'
          onChange={({ target }) => setAuthor(target.value)}
        />
      </div>
      <div>
        url: <input value={newUrl} id='url'
          onChange={({ target }) => setUrl(target.value)}
        />
      </div>
      <div>
        <button type="submit" id='submitBlog'>
          create
        </button>
      </div>
    </form>
  )
}

export default BlogForm