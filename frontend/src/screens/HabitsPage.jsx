import { Row, Col, Container, Button, Form, Card } from 'react-bootstrap'
import { useState, useEffect } from 'react'
import axios from 'axios'

const HabitsPage = () => {
  const [habits, setHabits] = useState([])
  const [titleEntered, setTitleEntered] = useState('')
  const [priorityEntered, setPriorityEntered] = useState(0)
  const [descriptionEntered, setDescriptioEnteredn] = useState('')
  const [habitId, setHabitId] = useState(0)
  const [isUpdated, setIsUpdated] = useState(false)
  // const user = useSelector((state) => state.user.id)
  // const name = useSelector((state) => state.user.name)
  // const email = useSelector((state) => state.user.email)

  useEffect(() => {
    fetchData()
  }, [setHabits])

  const headers = {
    Authorization: `Bearer ${localStorage.getItem('token')}`,
    'Content-Type': 'application/json',
  }

  const fetchData = async () => {
    const result = await axios.get('http://localhost:5000/auth/entry', {
      headers,
    })
    setHabits(result.data)
    console.log(result.data)
  }

  const submitNewEntry = async (event) => {
    event.preventDefault()

    console.log(localStorage.getItem('token'))

    // Submit New Entry
    await axios
      .post(
        'http://localhost:5000/auth/entry',
        {
          title: titleEntered,
          priority: Number(priorityEntered),
          description: descriptionEntered,
        },
        { headers }
      )
      .then((result) => {
        console.log('result: ' + JSON.stringify(result))
        setHabits(result.data.habitsList)
        resetFields()
      })
      .catch((error) => console.log(error))
  }

  const updateEntry = async (habit) => {
    const { _id, title, priority, description } = habit
    console.log(
      `id: ${_id}   title: ${title}   priority:${priority}   description: ${description}`
    )

    setHabitId(_id)
    setTitleEntered(title)
    setPriorityEntered(priority)
    setDescriptioEnteredn(description)
    setIsUpdated(true)
  }

  const submitEditEntry = async (event) => {
    event.preventDefault()
    console.log(localStorage.getItem('token'))

    // Submit New Entry
    await axios
      .put(
        'http://localhost:5000/auth/entry',
        {
          entryId: habitId,
          updatedTitle: titleEntered,
          updatedPriority: Number(priorityEntered),
          updatedDescription: descriptionEntered,
        },
        { headers }
      )
      .then((result) => {
        console.log('Edit result: ' + JSON.stringify(result.data.habitsList))
        setHabits(result.data.habitsList)
        console.log('Edit Complete')

        // Reset
        resetFields()
      })
      .catch((error) => console.log(error))
  }

  const deleteEntry = async (id) => {
    console.log(`id: ${id}`)

    // Delete Entry
    await axios
      .delete('http://localhost:5000/auth/entry', {
        headers: headers,
        data: {
          entryId: id,
        },
      })
      .then((result) => {
        console.log('result: ' + JSON.stringify(result))
        setHabits(result.data.habitsList)
        console.log('deleted Item')
      })
      .catch((error) => console.log(error))
  }

  const cancelDeletEntry = (event) => {
    event.preventDefault()
    resetFields()
  }

  const resetFields = () => {
    setHabitId(0)
    setTitleEntered('')
    setPriorityEntered(0)
    setDescriptioEnteredn('')
    setIsUpdated(false)
  }

  return (
    <Container>
      <Row>
        <Col>
          {habits.map((currentHabbit) => (
            <Card style={{ width: '18rem' }} key={currentHabbit._id}>
              <Card.Body>
                <Card.Title>{currentHabbit.title}</Card.Title>
                <Card.Text>{currentHabbit.description}</Card.Text>
                <Button
                  variant='primary'
                  onClick={() => {
                    updateEntry(currentHabbit)
                  }}
                >
                  Edit
                </Button>
                <Button
                  variant='primary'
                  onClick={() => {
                    deleteEntry(currentHabbit._id)
                  }}
                >
                  Delete
                </Button>
              </Card.Body>
            </Card>
          ))}
        </Col>

        <Col>
          {!isUpdated ? (
            <>
              <Form onSubmit={submitNewEntry}>
                <Form.Group className='mb-3' controlId='formTitle'>
                  <Form.Label>Enter Title</Form.Label>
                  <Form.Control
                    type='text'
                    placeholder='Enter Title'
                    value={titleEntered}
                    onChange={(event) => setTitleEntered(event.target.value)}
                  />
                </Form.Group>

                <Form.Group className='mb-3' controlId='formPriority'>
                  <Form.Label>Enter Priority</Form.Label>
                  <Form.Control
                    type='text'
                    placeholder='Enter Priority'
                    value={priorityEntered}
                    onChange={(event) => setPriorityEntered(event.target.value)}
                  />
                </Form.Group>

                <Form.Group className='mb-3' controlId='formDescription'>
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    type='text'
                    placeholder='Enter Description'
                    value={descriptionEntered}
                    onChange={(event) =>
                      setDescriptioEnteredn(event.target.value)
                    }
                  />
                </Form.Group>
                <Button variant='primary' type='submit'>
                  Submit
                </Button>
              </Form>
            </>
          ) : (
            <>
              <Form>
                <Form.Group className='mb-3' controlId='formTitle'>
                  <Form.Label>Edit Title</Form.Label>
                  <Form.Control
                    type='text'
                    placeholder='Edit Title'
                    value={titleEntered}
                    onChange={(event) => setTitleEntered(event.target.value)}
                  />
                </Form.Group>

                <Form.Group className='mb-3' controlId='formPriority'>
                  <Form.Label>Edit Priority</Form.Label>
                  <Form.Control
                    type='text'
                    placeholder='Edit Priority'
                    value={priorityEntered}
                    onChange={(event) => setPriorityEntered(event.target.value)}
                  />
                </Form.Group>

                <Form.Group className='mb-3' controlId='formDescription'>
                  <Form.Label>EditDescription</Form.Label>
                  <Form.Control
                    type='text'
                    placeholder='Edit Description'
                    value={descriptionEntered}
                    onChange={(event) =>
                      setDescriptioEnteredn(event.target.value)
                    }
                  />
                </Form.Group>
                <Button
                  variant='primary'
                  type='submit'
                  onClick={submitEditEntry}
                >
                  Submit
                </Button>
                <Button
                  variant='secondary'
                  type='submit'
                  onClick={cancelDeletEntry}
                >
                  Cancel
                </Button>
              </Form>
            </>
          )}
        </Col>
      </Row>
    </Container>
  )
}

export default HabitsPage
