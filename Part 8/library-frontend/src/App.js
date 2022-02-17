import React, { useEffect, useState } from 'react'
import Menu from './components/Menu'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginForm'
import { useSubscription, useApolloClient } from '@apollo/client'
import Favorites from './components/Favorites'
import { BOOK_ADDED, ALL_BOOKS } from './queries'

// function that takes care of manipulating cache
export const updateCache = (cache, query, bookAdded) => {
  const uniqByTitle = (a) => {
    let seen = new Set()
    return a.filter((item) => {
      let k = item.title
      return seen.has(k) ? false : seen.add(k)
    })
  }
  cache.updateQuery(query, ({ allBooks }) => {
    return {
      allBooks: uniqByTitle(allBooks.concat(bookAdded)),
    }
  })
}

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
      const bookAdded = subscriptionData.data.bookAdded
      window.alert(`${bookAdded.title} was added!`)

      updateCache(client.cache, { query: ALL_BOOKS }, bookAdded)
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
      <LoginForm setToken={setToken} show={page === 'login'} setPage={setPage} client={client} />
      <Authors show={page === 'authors'} />
      <Books show={page === 'books'} />
      <Favorites show={page === 'favorites'} />
      <NewBook show={page === 'add'} />

    </div>
  )
}

export default App