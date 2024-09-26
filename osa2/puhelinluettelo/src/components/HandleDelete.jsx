import personService from '../services/persons'

const handleDelete = ({ id, persons, setPersons, setMessage, setMessageType }) => {
    if (window.confirm(`Delete ${persons.find(person => person.id === id).name}?`)) {
      personService
        .remove(id)
        .then(() => {
          setPersons(persons.filter(person => person.id !== id))
        })
        .catch(error => {
          setMessageType('error')
          setMessage(
            `Information of ${persons.find(person => person.id === id).name} has already been removed from server`
          )
          setTimeout(() => {
            setMessage(null)
          }, 5000)
        })
      setMessageType('success')
      setMessage(
        `Deleted ${persons.find(person => person.id === id).name}`
      )
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
  }

export default handleDelete