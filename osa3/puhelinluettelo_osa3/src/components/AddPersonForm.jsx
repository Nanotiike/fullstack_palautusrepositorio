import personService from '../services/persons'

const AddPersonForm = ({ newName, newNumber, setNewName, setNewNumber, persons, setPersons, setMessage, setMessageType }) => {

    const addPerson = (event) => {
        event.preventDefault()
        if (persons.find(person => person.name === newName)) {
          if (window.confirm(`${newName} is already added to phonebook, replace old number with a new one?`)) {
            const person = persons.find(person => person.name === newName)
            const changedPerson = { ...person, number: newNumber }
            personService
              .update(person.id, changedPerson)
              .then(returnedPerson => {
                setPersons(persons.map(person => person.id !== returnedPerson.id ? person : returnedPerson))
                setNewName('')
                setNewNumber('')
                setMessageType('success')
                setMessage(
                  `Updated ${changedPerson.name}'s number`
                )
                setTimeout(() => {
                  setMessage(null)
                }, 5000)
              })
              .catch(error => {
                setMessageType('error')
                setMessage(
                  `Failed to update ${person.name} number`
                )
                setTimeout(() => {
                  setMessage(null)
                }, 5000)
              })
          }
          return
        }
        const personObject = {
          name: newName,
          number: newNumber
        }
        personService
        .create(personObject)
          .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNewName('')
          setNewNumber('')
          setMessageType('success')
          setMessage(
            `Added ${returnedPerson.name} `
          )
          setTimeout(() => {
            setMessage(null)
          }, 5000)
        })
        .catch(error => {
          setMessageType('error')
          setMessage(`Failed to add ${newName}`)
          setTimeout(() => {
            setMessage(null)
          }, 5000)
        })
      }
    
      const handlePersonChange = (event) => {
        setNewName(event.target.value)
      }
    
      const handleNumberChange = (event) => {
        setNewNumber(event.target.value)
      }

    return (
        <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={handlePersonChange}/>
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNumberChange}/>
        </div>
        <div><button type="submit">add</button></div>
      </form>
    )
}

export default AddPersonForm