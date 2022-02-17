import React from 'react'
import { useQuery } from '@apollo/client'
import { ALL_BOOKS, GET_USER } from '../queries'

const Favorites = ({show}) => {
  const result = useQuery(ALL_BOOKS)
  const user = useQuery(GET_USER)

  if (!show) {
    return null
  }

  if (result.loading || user.loading ) {
    return <div>loading...</div>
  }

  const books = result.data.allBooks

  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th>
              title
            </th>
            <th>
              author
            </th>
            <th>
              published
            </th>
          </tr>
          {books.map(a =>
            a.genres.includes(user.data.me.favoriteGenre) ?
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

export default Favorites