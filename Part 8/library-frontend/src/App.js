import React, { useEffect, useState } from 'react'
import Menu from './components/Menu'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginForm'
import { useSubscription, useApolloClient } from '@apollo/client'
import Favorites from './components/Favorites'
import { BOOK_ADDED } from './queries'


const App = () => {
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(null)
  const client = useApolloClient()

  useEffect(() => {
    if (localStorage.getItem('library-user-token')) {
      setToken(localStorage.getItem('library-user-token'))
    }
  }, [])

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      console.log(subscriptionData)
    }
  })

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
    setPage('authors')
  }

  return (
    <div>

      <Menu setPage={setPage} token={token} logout={logout} />
      <LoginForm setToken={setToken} show={page === 'login'} setPage={setPage} />
      <Authors show={page === 'authors'} />
      <Books show={page === 'books'} />
      <Favorites show={page === 'favorites'} />
      <NewBook show={page === 'add'} />

    </div>
  )
}

export default App