import React, { useState } from 'react'

const Blog = ({ blog, user, like, delBlog }) => {
  const [visible, setVisibility] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  let buttonValue = visible ? 'hide' : 'view'

  const toggleVisibility = () => {
    setVisibility(!visible)
  }

  console.log(blog)

  const likeBlog = async () => {
    await like({
      user: blog.user.id,
      likes: blog.likes + 1,
      author: blog.author,
      title: blog.title,
      url: blog.url,
      id: blog.id
    })
  }

  const deleteBlog = async () => {
    await delBlog(blog.id)
  }

  return (
    <div style={blogStyle} className='blogDiv'>
      {blog.title} {blog.author} <button onClick={toggleVisibility} id='viewBlog'>{buttonValue}</button>
      <br />
      {
        visible === true ?
          <>
            <p>
              {blog.url}<br />
              likes: {blog.likes} <button onClick={likeBlog} id='likeBlog'>like</button><br />
              {blog.user.name}<br />
              {
                blog.user.name === user.name ?
                  <button onClick={deleteBlog} id='removeBlog'>remove</button> :
                  ''
              }

            </p>
          </> :
          ''
      }
    </div >
  )
}

export default Blog