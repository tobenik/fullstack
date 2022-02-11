import React from 'react'
import { Form, Button } from 'react-bootstrap'

const Login = ({ username, password, setUsername, setPassword, handleLogin }) => (
  <div>
    <h2>Login</h2>
    <Form onSubmit={handleLogin} id='loginForm'>
      <Form.Group>
        <Form.Label>username:</Form.Label>
        <Form.Control
          type="text"
          name="username"
          value={username}
          id='username'
          onChange={({ target }) => setUsername(target.value)}
        />
        <Form.Label>password:</Form.Label>
        <Form.Control
          type="password"
          value={password}
          name="password"
          id='password'
          onChange={({ target }) => setPassword(target.value)}
        />
      </Form.Group>
      <Button variant="primary" type="submit" id='loginButton'>
        Login
      </Button>
    </Form>
  </div>
)

export default Login