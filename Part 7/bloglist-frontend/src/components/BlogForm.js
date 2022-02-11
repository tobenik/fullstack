import React from 'react'

const BlogForm = ({ createBlog }) => {
  const addBlog = (event) => {
    event.preventDefault()
    createBlog({
      title: event.target.title.value,
      author: event.target.author.value,
      url: event.target.url.value
    })
  }

  return (
    <form className='blogForm' onSubmit={addBlog}>
      <div>
        title: <input id='title'
        />
      </div>
      <div>
        author: <input id='author'
        />
      </div>
      <div>
        url: <input id='url'
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