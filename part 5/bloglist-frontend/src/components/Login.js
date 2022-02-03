import React from 'react'
const Login = ({ username, password, setUsername, setPassword, handleLogin }) => (
  <div>
    <form onSubmit={handleLogin} id='loginForm'>
      <div>
        username
        <input
          type="text"
          value={username}
          name="username"
          id='username'
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          type="password"
          value={password}
          name="password"
          id='password'
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit" id='loginButton'>login</button>
    </form>
  </div>
)

export default Login