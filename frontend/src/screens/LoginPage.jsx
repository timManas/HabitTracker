import { useState } from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Container from 'react-bootstrap/esm/Container'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { setId, setName, setEmail } from '../slices/userSlice.jsx'
import { jwtDecode } from 'jwt-decode'

const LoginPage = () => {
  const [emailEntered, setEmailEntered] = useState()
  const [password, setPassword] = useState()
  const dispatch = useDispatch()

  const submitHandler = (event) => {
    event.preventDefault()
    console.log(`email: ${emailEntered}    password: ${password}`)
    fetchToken(emailEntered, password)
  }

  const fetchToken = async () => {
    const res = await axios.post('http://localhost:5000/auth/login', {
      email: emailEntered,
      password,
    })

    const { _id, name: nameToken, email: emailToken } = jwtDecode(res.data)
    console.log(
      `id: ${_id}   emailToken: ${emailToken}    nameToken: ${nameToken}`
    )
    // // Update Store
    dispatch(setId(_id))
    dispatch(setName(nameToken))
    dispatch(setEmail(emailToken))

    localStorage.setItem('token', res.data)
  }

  return (
    <Container>
      <Form onSubmit={submitHandler}>
        <Form.Group className='mb-10' controlId='formEmail'>
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type='email'
            placeholder='Enter email'
            value={emailEntered}
            onChange={(e) => setEmailEntered(e.target.value)}
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
