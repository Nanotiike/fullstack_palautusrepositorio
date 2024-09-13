/*Koko sovellus on nyt ikävästi yhdessä komponentissa. 
Refaktoroi sovelluksen koodi siten, että se koostuu kolmesta uudesta komponentista: Header, Content ja Total. 
Kaikki data pidetään edelleen komponentissa App, joka välittää tarpeelliset tiedot kullekin komponentille props:ien avulla. 
Header huolehtii kurssin nimen renderöimisestä, 
Content osista ja niiden tehtävämääristä
ja Total tehtävien yhteismäärästä.*/

const Header = (props) => {
  return (
    <div>
      <h1>{props.course.name}</h1>
    </div>
  )
}

const Content = (props) => {
  return (
    <div>
      <Part name={props.parts[0].name} exercises={props.parts[0].exercises}/>
      <Part name={props.parts[1].name} exercises={props.parts[1].exercises}/>
      <Part name={props.parts[2].name} exercises={props.parts[2].exercises}/>
    </div>
  )
}

const Part = (props) => {
  return ( 
    <div>
      <p>
        {props.name} {props.exercises}
      </p>
    </div>
  )
}

const Total = (props) => {
  return (
    <div>
      <p>
        Number of exercises {props.parts[0].exercises + props.parts[1].exercises + props.parts[2].exercises}
      </p>
    </div>
  )
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Header course = {course} />
      <Content parts = {course.parts} />
      <Total parts = {course.parts} />
    </div>
  )
}

export default App