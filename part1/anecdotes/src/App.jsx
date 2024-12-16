import { useState } from 'react'

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]

  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0))
  //Since votes.max doesnt work we look for the index of the biggest number in the array
  const MaxVotes = votes.indexOf(Math.max(...votes))

  const [selected, setSelected] = useState(0)

  const handleAnecdote = () => {
    setSelected(Math.floor(Math.random() * anecdotes.length))
    console.log(selected)
  }

  const handleVote = () => {
    const copyVotes = [...votes]
    copyVotes[selected] += 1
    console.log(votes[selected])
    setVotes(copyVotes)
  }

  return (
    <div>
    <h1>Anecdote of the Day:</h1>
    <p>{anecdotes[selected]}</p>
    <p>has {votes[selected]} votes</p>
    <Button handleClick={handleVote} text="vote"/>
    <Button handleClick={handleAnecdote} text="Anecdote of the Day"/>
    <p>Max votes anecdote: {anecdotes[MaxVotes]}</p>
    </div>
  )
}

export default App