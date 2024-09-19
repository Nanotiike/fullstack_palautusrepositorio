const Course = (props) => {
    const { name, id, parts } = props.course
    return (
      <div>
        <CourseHeader key={id} name={name} />
        <Content key={id} parts={parts} />
        <Total key={id} parts={parts} />
      </div>
    )
  }
  
  const CourseHeader = ({ name }) => {
    return (
      <div>
        <h2>{name}</h2>
      </div>
    )
  }
  
  const Content = ({ parts }) => {
    return (
      <div>
        {parts.map((part) => (
          <Part key={part.id} name={part.name} exercises={part.exercises} />
        ))}
      </div>
    )
  }
  
  const Part = ({ name, exercises }) => {
    return ( 
      <div>
        <p>
          {name} {exercises}
        </p>
      </div>
    )
  }
  
  const Total = ({ parts }) => {
    const totalExercises = parts.reduce((sum, part) => sum + part.exercises, 0)
    return (
      <div>
        <b>total of {totalExercises} exercises</b>
      </div>
    )
  }

export default Course