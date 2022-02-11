import React, { useState, useEffect, useRef } from 'react'
import { useDispatch } from 'react-redux'
import Login from './components/Login'
import Menu from './components/Menu'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import BlogList from './components/BlogList'
import Togglable from './components/Togglable'
import Users from './components/Users'
import User from './components/User'
import loginService from './services/login'
import blogService from './services/blogs'
import { setNotification } from './reducers/notificationReducer'
import { initializeBlogs, newBlog } from './reducers/blogReducer'
import {
  Switch, Route
} from 'react-router-dom'
import Blog from './components/Blog'


const App = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const dispatch = useDispatch()

  useEffect(() => {
    async function fetchData() {
      dispatch(initializeBlogs())
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
      dispatch(setNotification(`${exception}`, 5))
    }
  }

  const handleLogout = async (event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
  }

  const createBlog = async (blogObject) => {
    try {
      //Create user:
      dispatch(newBlog(blogObject))
      //Hide BlogForm
      blogFormRef.current.toggleVisibility()
      //Show notification
      dispatch(setNotification(`${blogObject.title} by ${blogObject.author} added!`, 5))
    } catch (exception) {
      dispatch(setNotification(`${exception}`, 5))
    }
  }

  const blogFormRef = useRef()

  return (
    <div className='container'>
      <Notification />
      {
        user === null ?
          <>
            <Login
              username={username}
              password={password}
              setUsername={setUsername}
              setPassword={setPassword}
              handleLogin={handleLogin} />
          </> :
          <>
            <Menu user={user} handleLogout={handleLogout}/>
            <h2>blog app</h2>

            <p>{user.name} logged in <button onClick={handleLogout}>logout</button></p>

            <Switch >
              <Route path='/users/:id'>
                <User />
              </Route>
              <Route path='/users'>
                <Users />
              </Route>
              <Route path='/blogs/:id'>
                <Blog user={user} />
              </Route>
              <Route path='/'>
                <Togglable buttonLabel='create new blog' ref={blogFormRef}>
                  <h2>create new</h2>
                  <BlogForm createBlog={createBlog} />
                </Togglable>
                <BlogList user={user} />
              </Route>
            </Switch>
          </>
      }
    </div>
  )
}

export default App