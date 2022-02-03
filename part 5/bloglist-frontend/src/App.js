import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Login from './components/Login'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import loginService from './services/login'
import blogService from './services/blogs'
import userService from './services/users'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [newNotification, setNotification] = useState(null)

  useEffect(() => {
    async function fetchData() {
      const blogs = await blogService.getAll()
      setBlogs(blogs)
    }
    fetchData()
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setNotification('Error: Wrong credentials')
      setTimeout(() => {
        setNotification(null)
      }, 5000)
    }
  }

  const handleLogout = async (event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
  }

  const createBlog = async (blogObject) => {
    try {
      const result = await blogService.create(blogObject)
      //Transform userId to userObject
      result.user = await userService.getById(result.user)
      //Add created blog to blogs state
      setBlogs(blogs.concat(result))
      //Hide BlogForm
      blogFormRef.current.toggleVisibility()
      //Show notification
      setNotification(`${result.title} by ${result.author} added!`)
      setTimeout(() => {
        setNotification(null)
      }, 5000)
    } catch (exception) {
      setNotification(`${exception}`)
      setTimeout(() => {
        setNotification(null)
      }, 5000)
    }
  }

  const likeBlog = async (blog) => {
    try {
      const returnedBlog = await blogService.likeBlog(blog)
      const updatedBlog = blogs.find((b) => b.id === returnedBlog.id)
      updatedBlog.likes = returnedBlog.likes
      setBlogs(
        blogs.map((b) => b.id === updatedBlog.id.toString() ? updatedBlog : b)
      )
    } catch (exception) {
      setNotification(`${exception}`)
      setTimeout(() => {
        setNotification(null)
      }, 5000)
    }
  }

  const deleteBlog = async (id) => {
    try {
      if (window.confirm('Are you sure you want to remove blog?')) {
        await blogService.deleteBlog(id)
        let copy = blogs
        copy = copy.filter((b) => b.id !== id)
        setBlogs(copy)
      }
    } catch (exception) {
      setNotification(`${exception}`)
      setTimeout(() => {
        setNotification(null)
      }, 5000)
    }
  }

  const blogFormRef = useRef()

  return (
    <div>
      <Notification message={newNotification} />
      {
        user === null ?
          <>
            <h2>login to application</h2>
            <Login
              username={username}
              password={password}
              setUsername={setUsername}
              setPassword={setPassword}
              handleLogin={handleLogin} />
          </> :
          <>
            <h2>blogs</h2>

            <p>{user.name} logged in <button onClick={handleLogout}>logout</button></p>

            <Togglable buttonLabel='create new blog' ref={blogFormRef}>
              <h2>create new</h2>
              <BlogForm createBlog={createBlog} />
            </Togglable>

            {blogs.sort((a, b) => (a.likes < b.likes) ? 1 : -1).map(blog =>
              <Blog key={blog.id} blog={blog} like={likeBlog} delBlog={deleteBlog} user={user} />
            )}
          </>
      }
    </div>
  )
}

export default App