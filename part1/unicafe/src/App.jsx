import { useState } from 'react'

const Statistics = (props) => {
  console.log(props)
  return (
    <div>
    <table style={{width: '400px', borderCollapse: 'collapse'}}>
    <tbody>
      <StatisticLine text="good" value={props.good}/>
      <StatisticLine text="neutral" value={props.neutral}/>
      <StatisticLine text="bad" value={props.bad}/>
      <StatisticLine text="average" value={props.totalFeedback > 0? (props.good - props.bad) / props.totalFeedback : 0}/>
      <StatisticLine text="positive" value={(props.good / (props.good + props.neutral + props.bad)) * 100}/>
      <StatisticLine text="total" value={props.totalFeedback}/>
      </tbody>
      </table>
    </div>
  )
}

const StatisticLine = (props) => {
  return (
    <tr>
        <td style={{textAlign: 'left'}}>{props.text}</td>

        <td style={{textAlign: 'right'}}>{props.value}</td>
      </tr>
  )
}

const Button = ({ handleStat, text }) => (
  <button onClick={handleStat}>
    {text}
  </button>
)

const History = (props) => {
  if (props.totalFeedback === 0) {
    return (
      <div>
        the app is used by pressing the buttons
      </div>
    )
  }
  return (
    <div>
      <Statistics 
          good={props.good} 
          neutral={props.neutral} 
          bad={props.bad} 
          totalFeedback={props.totalFeedback}/>
    </div>
  )
}

const App = () => {
  // guarda los clics de cada botón en su propio estado
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGood = () => {
    const updatedGood = good + 1
    console.log(good)
    setGood(updatedGood)
  }
  
  const handleBad = () => {
    const updatedBad = bad + 1
    console.log(bad)
    setBad(updatedBad)
  }
  const handleNeutral = () => {
    const updatedNeutral = neutral + 1
    console.log(neutral)
    setNeutral(updatedNeutral)
  }

  const totalFeedback = good + neutral + bad

  return (
    <div>
      <h1>give feedback</h1>
      <Button
        handleStat={handleGood}
        text='good'
      /> 
      <Button
        handleStat={handleNeutral}
        text='neutral'
      /> 
      <Button
        handleStat={handleBad}
        text='bad'
      /> 
      <h2>statistics</h2>
      <br />
          <History good={good} 
          neutral={neutral} 
          bad={bad} 
          totalFeedback={totalFeedback}/>
    </div>
  )
}

export default App