import { useState } from 'react'
import ShowPersons from './components/ShowPersons'
import FilterForm from './components/FilterForm'
import AddPersonForm from './components/AddPersonForm'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  return (
    <div>
      <h2>Phonebook</h2>
      <FilterForm filter={filter} setFilter={setFilter} />
      <h3>Add a new</h3>
      <AddPersonForm 
        newName={newName} 
        newNumber={newNumber} 
        setNewName={setNewName} 
        setNewNumber={setNewNumber} 
        persons={persons} 
        setPersons={setPersons} />
      <h2>Numbers</h2>
      <ShowPersons persons={persons} filter={filter} />
    </div>
  )
}

export default App
