import React, { useEffect, useState } from 'react'
import userService from '../services/users'
import { useParams } from 'react-router-dom'

const User = () => {
  const [user, setUser] = useState(null)
  const userId = useParams().id

  useEffect(() => {
    async function findUser() {
      const result = await userService.getById(userId)
      setUser(result)
    }
    findUser()
  }, [])

  if (!user) {
    return null
  }

  return (
    <div>
      <h2>{user.name}</h2>
      <h3>added blogs</h3>
      <ul>
        {user.blogs.map(b =>
          <li key={b.id}>{b.title}</li>
        )}
      </ul>
    </div>
  )
}

export default User