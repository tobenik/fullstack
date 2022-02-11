import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router'
import { delBlog, like } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'
import blogService from '../services/blogs'

const Blog = ({ user }) => {
  const [blog, setBlog] = useState(null)
  const blogId = useParams().id
  const dispatch = useDispatch()

  useEffect(() => {
    async function findBlog() {
      const result = await blogService.getById(blogId)
      setBlog(result)
    }
    findBlog()
  }, [blog])

  if (!blog) {
    return null
  }

  const likeBlog = async () => {
    try {
      dispatch(like(blog.id))
    } catch (exception) {
      dispatch(setNotification(`${exception}`, 5))
    }
  }

  const deleteBlog = async () => {
    try {
      if (window.confirm('Are you sure you want to remove blog?')) {
        dispatch(delBlog(blog.id))
      }
    } catch (exception) {
      dispatch(setNotification(`${exception}`, 5))
    }
  }

  return (
    <>
      <h2>{blog.title}</h2>
      <p>
        {blog.url} <br />
        {blog.likes} likes <button onClick={likeBlog}>like</button> <br />
        added by {blog.user.name}
      </p>
      {user.username === blog.user.username ? <button onClick={deleteBlog}>remove</button> : ''}
    </>
  )
}

export default Blog