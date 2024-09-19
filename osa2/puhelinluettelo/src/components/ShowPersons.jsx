import Person from './Person'

const ShowPersons = ({ persons, filter }) => {
    
    const personsToShow = persons.filter(person => 
        person.name.toLowerCase().includes(filter.toLowerCase()) || filter === ''
    )

    return (
        <div>
        {personsToShow.map(person => 
            <Person key={person.name} person={person} />
        )}
        </div>
    )
}

export default ShowPersons