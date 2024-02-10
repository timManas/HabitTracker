import { useState } from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Container from 'react-bootstrap/esm/Container'
import axios from 'axios'
import asyncHandler from 'express-async-handler'

const LoginPage = () => {
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()

  const submitHandler = (event) => {
    event.preventDefault()
    console.log(`email: ${email}    password: ${password}`)
    fetchToken(email, password)
  }

  const fetchToken = asyncHandler(async () => {
    //localhost:5000/auth/login
    await axios
      .post('http://localhost:5000/auth/login', { email, password })
      .then((res) => {
        console.log('response: ' + JSON.stringify(res.data))
        localStorage.setItem('token', res.data)
      })
      .catch((err) => console.log('error: ' + err))
  })

  return (
    <Container>
      <Form onSubmit={submitHandler}>
        <Form.Group className='mb-10' controlId='formEmail'>
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type='email'
            placeholder='Enter email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>

        <Form.Group className='mb-3' controlId='formPassword'>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Button variant='primary' type='submit'>
          Submit
        </Button>
      </Form>
    </Container>
  )
}

export default LoginPage
