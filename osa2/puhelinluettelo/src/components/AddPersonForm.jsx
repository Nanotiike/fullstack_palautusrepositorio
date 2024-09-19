const AddPersonForm = ({ newName, newNumber, setNewName, setNewNumber, persons, setPersons }) => {

    const addPerson = (event) => {
        event.preventDefault()
        if (persons.find(person => person.name === newName)) {
          alert(`${newName} is already added to phonebook`)
          return
        }
        const personObject = {
          name: newName,
          number: newNumber
        }
        setPersons(persons.concat(personObject))
        setNewName('')
        setNewNumber('')
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