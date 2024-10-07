const express = require('express')
const app = express()
var date_time = new Date()
let date = ("0" + date_time.getDate()).slice(-2)
const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
let day = daysOfWeek[date_time.getDay()]
const monthsOfYear = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
let month = monthsOfYear[date_time.getMonth()]
let year = date_time.getFullYear()
let hours = date_time.getHours()
let minutes = date_time.getMinutes()
let seconds = date_time.getSeconds()

const cors = require('cors')

app.use(cors())

var morgan = require('morgan')
app.use(express.json())

morgan.token('body', (req) => JSON.stringify(req.body))

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))


let persons = [
  {
    id: "1",
    name: "Arto Hellas",
    number:  "040-123456"
  },
  {
    id: "2",
    name: "Ada Lovelace",
    number:  "39-44-5323523"
  },
  {
    id: "3",
    name: "Dan Abramov",
    number:  "12-43-234345"
  },
  {
    id: "4",
    name: "Mary Poppendieck",
    number:  "39-23-6423122"
  },
]

app.get('/', (req, res) => {
  res.send('<h1>Hello World!</h1>')
})

app.get('/api/persons', (req, res) => {
  res.json(persons)
})

app.get('/api/info', (req, res) => {
    res.send(`<div>Phonebook has info for ${persons.length} people</div>
        <div>${day + " " + month + " " + date + " " + year + " " + hours + ":" + minutes + ":" + seconds} GMT+0200 (Eastern European Standard Time)</div>`)
  })

app.get('/api/persons/:id', (request, response) => {
    const id = (request.params.id)
    const person = persons.find(person => person.id === id)
  
    if (person) {
      response.json(person)
    } else {
      response.status(404).end()
    }
  })

app.post('/api/persons', (req, res) => {
    const body = req.body
    
    if (!body.name) {
        return res.status(400).json({ 
        error: 'name missing' 
        })
    }

    if (persons.find(person => person.name === body.name)) {
        return res.status(400).json({ 
        error: 'name must be unique' 
        })
    }
    
    if (!body.number) {
        return res.status(400).json({ 
        error: 'number missing' 
        })
    }
    
    const person = {
        name: body.name,
        number: body.number,
        id: Math.floor(Math.random() * 1000),
    }
    
    persons = persons.concat(person)
    
    res.json(person)
})

app.delete('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    persons = persons.filter(person => person.id !== id)
  
    res.status(204).end()
  })

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})