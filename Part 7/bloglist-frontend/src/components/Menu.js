import React from 'react'
import { Link } from 'react-router-dom'

const Menu = ({ user, handleLogout }) => {
  const padding = {
    padding: 10
  }

  const menuStyle = {
    background: 'GainsBoro',
    padding: 10
  }

  return (
    <div style={menuStyle}>
      <Link style={padding} to="/">blogs</Link>
      <Link style={padding} to="/users">users</Link>
      <bdi style={padding}>{user.name} logged in <button onClick={handleLogout}>logout</button></bdi>
    </div>
  )
}

export default Menu