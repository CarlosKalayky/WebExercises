const express = require('express')
const morgan = require('morgan')
const app = express()

let persons = [
  { 
    "id": 1,
    "name": "Arto Hellas", 
    "number": "040-123456"
  },
  { 
    "id": 2,
    "name": "Ada Lovelace", 
    "number": "39-44-5323523"
  },
  { 
    "id": 3,
    "name": "Dan Abramov", 
    "number": "12-43-234345"
  },
  { 
    "id": 4,
    "name": "Mary Poppendieck", 
    "number": "39-23-6423122"
  }
]

const cors = require('cors')

app.use(cors())

morgan.token('type', function (request, response, next) {
  return JSON.stringify(request.body)
})

app.use(morgan('tiny'))
app.use(morgan(':type'))
app.use(express.json())


const generateId = () => {
  const maxId = persons.length > 0
    ? Math.floor(Math.random() * persons.length)
    : 0
  return maxId + 1
}

// Create a new person
app.post('/persons', (request, response) => {
  const body = request.body

  if (!body.name || !body.number) {
    return response.status(400).json({ 
      error: 'name or number missing' 
    })
  }

  if (persons.find(person => person.name === body.name)) {
    return response.status(400).json({ 
      error: 'name must be unique' 
    })
  }

  const person = {
    name: body.name,
    number: body.number,
    id: generateId()
  }

  persons = persons.concat(person)

  response.json(person)
})

// Delete a person
app.delete('/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  persons = persons.filter(person => person.id!== id)

  response.status(204).end()
})

// Get one person from its id
app.get('/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(person => person.id === id)
    
  
    if (person) {
      response.json(person)
    } else {
      response.status(404).end()
    }
  })

// Get for all persons
app.get('/persons', (request, response) => {
    response.json(persons)
})

const time = new Date()

app.get('/info', (request, response) => {
    response.send(`<p>Phonebook has info for ${persons.length} people</p><br/><p>${time}</p>`)
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})