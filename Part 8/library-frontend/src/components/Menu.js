import React from "react"

const Menu = ({ setPage, token, logout }) => {
  return (
    <div>
      <button onClick={() => setPage('authors')}>authors</button>
      <button onClick={() => setPage('books')}>books</button>
      {
        !token ?
          <button onClick={() => setPage('login')}>login</button> :
          <>
            <button onClick={() => setPage('add')}>add book</button>
            <button onClick={() => setPage('favorites')}>favorites</button>
            <button onClick={() => logout()}>logout</button>
          </>
      }
    </div>
  )
}

export default Menu