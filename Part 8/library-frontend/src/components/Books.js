import React, { useState } from 'react'
import { useQuery } from '@apollo/client'
import { ALL_BOOKS } from '../queries'

const Books = ({ show }) => {
  const result = useQuery(ALL_BOOKS)
  const [genre, setGenre] = useState('all')

  if (!show) {
    return null
  }

  if (result.loading) {
    return <div>loading...</div>
  }

  const books = result.data.allBooks
  console.log(books)
  let genres = books.map(b => b.genres).flat()
  //Remove duplicates:
  genres = [...new Set(genres)]

  return (
    <div>
      <h2>books</h2>

      <div>
        genre: 
        <select onChange={({ target }) => setGenre(target.value)}>
          <option defaultValue='all'>all</option>
          {genres.map(g => <option key={g}>{g}</option>)}
        </select>
      </div>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              author
            </th>
            <th>
              published
            </th>
          </tr>
          {books.map(a =>
            a.genres.includes(genre) || genre === 'all' ?
              <tr key={a.title}>
                <td>{a.title}</td>
                <td>{a.author}</td>
                <td>{a.published}</td>
              </tr> : null
          )}
        </tbody>
      </table>
    </div>
  )
}

export default Books