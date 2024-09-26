import Person from './Person'

const ShowPersons = ({ persons, filter, handleDelete }) => {

    const personsToShow = persons
        .filter(person => person.name && person.number && person)
        .filter(person => 
        person.name?.toLowerCase().includes(filter.toLowerCase()) || filter === ''
    )

    return (
        <div>
        {personsToShow.map(person => 
            <Person key={person.id} person={person} persons={persons} handleDelete={handleDelete} />
        )}
        </div>
    )
}

export default ShowPersons