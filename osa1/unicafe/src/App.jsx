import { useState } from 'react'

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <Header />
      <div>
        <Button handleClick={() => setGood(good + 1)} text = "good" />
        <Button handleClick={() => setNeutral(neutral + 1)} text = "neutral" />
        <Button handleClick={() => setBad(bad + 1)} text = "bad" />
      </div>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

const Header = () => {
  return (
    <div>
      <h1>give feedback</h1>
    </div>
  )
}

const Statistics = ({good,neutral,bad}) => {
  const total = bad+good+neutral

  if (total == 0) {
    return (
      <div>
        <h1>statistics</h1>
        no feedback given
      </div>
    )
  } 
  return (
    <div>
      <h1>statistics</h1>
      <table>
        <tbody>
          <StatisticLine text="good" value ={good} end=""/>
          <StatisticLine text="neutral" value ={neutral} end=""/>
          <StatisticLine text="bad" value ={bad} end=""/>
          <StatisticLine text="all" value ={total} end=""/>
          <StatisticLine text="avarage" value ={total/3} end=""/>
          <StatisticLine text="positive" value ={(good/(total))*100 | 0} end="%"/>
        </tbody>
      </table>
    </div>
  )
}

const Button = ({handleClick,text}) => {
  return (
  <button onClick={handleClick}>
    {text}
  </button>
  )
} 

const StatisticLine = ({text,value,end}) => {
  return (
    <tr>
      <td>{text} </td>
      <td>{value} {end}</td>
    </tr>
  )
}

export default App