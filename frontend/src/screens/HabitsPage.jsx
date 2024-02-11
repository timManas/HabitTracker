import { Row, Col, Container, Button, Form, Card } from 'react-bootstrap'
import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import axios from 'axios'

const HabitsPage = () => {
  const [habits, setHabits] = useState([])
  const [titleEntered, setTitleEntered] = useState('')
  const [priorityEntered, setPriorityEntered] = useState(0)
  const [descriptionEntered, setDescriptioEnteredn] = useState('')
  // const user = useSelector((state) => state.user.id)
  // const name = useSelector((state) => state.user.name)
  // const email = useSelector((state) => state.user.email)

  useEffect(() => {
    fetchData()
  }, [setHabits])

  const fetchData = async () => {
    const result = await axios.get('http://localhost:5000/auth/entry', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
    setHabits(result.data)
    console.log(result.data)
  }

  const submitHandler = () => {}

  return (
    <Container>
      <Row>
        <Col>
          {habits.map((currentHabbit) => (
            <Card style={{ width: '18rem' }} key={currentHabbit._id}>
              <Card.Body>
                <Card.Title>{currentHabbit.title}</Card.Title>
                <Card.Text>{currentHabbit.description}</Card.Text>
                <Button variant='primary'>Edit</Button>
              </Card.Body>
            </Card>
          ))}
        </Col>

        <Col>
          <Form onSubmit={submitHandler}>
            <Form.Group className='mb-3' controlId='formTitle'>
              <Form.Label>Enter Title</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter Title'
                value={titleEntered}
                onChange={(event) => setTitleEntered(event)}
              />
            </Form.Group>

            <Form.Group className='mb-3' controlId='formPriority'>
              <Form.Label>Enter Priority</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter Priority'
                value={priorityEntered}
                onChange={(event) => setPriorityEntered(event)}
              />
            </Form.Group>

            <Form.Group className='mb-3' controlId='formDescription'>
              <Form.Label>Description</Form.Label>
              <Form.Control
                type='text'
                placeholder='Description'
                value={descriptionEntered}
                onChange={(event) => setDescriptioEnteredn(event)}
              />
            </Form.Group>
            <Button variant='primary' type='submit'>
              Submit
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  )
}

export default HabitsPage
