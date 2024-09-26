import { useState, useEffect } from 'react'
import ShowPersons from './components/ShowPersons'
import FilterForm from './components/FilterForm'
import AddPersonForm from './components/AddPersonForm'
import personService from './services/persons'
import handleDelete from './components/HandleDelete'
import Notification from './components/Notification' 

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [message, setMessage] = useState(null)
  const [messageType, setMessageType] = useState('success')

  const hook = () => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }
  
  useEffect(hook, [])

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} type={messageType} />
      <FilterForm filter={filter} setFilter={setFilter} />
      <h3>Add a new</h3>
      <AddPersonForm 
        newName={newName} 
        newNumber={newNumber} 
        setNewName={setNewName} 
        setNewNumber={setNewNumber} 
        persons={persons} 
        setPersons={setPersons} 
        setMessage={setMessage}
        setMessageType={setMessageType}/>
      <h2>Numbers</h2>
      <ShowPersons persons={persons} filter={filter} handleDelete={(id) => handleDelete({ id, persons, setPersons, setMessage, setMessageType })}/>
    </div>
  )
}

export default App
