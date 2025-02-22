import { useState, useEffect } from 'react'
import Person from './components/Person'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import Message from './components/Message'
import personService from './services/persons'

// const Person = ({ name, number }) => {
//   console.log(name)
//   console.log(number)
//   return <li>{name.name} - {name.number}</li>
// }

const App = () => {

  useEffect(() => {
      personService
        .getAll()
        .then(initialPersons => {
          setPersons(initialPersons)
        })
        .catch(error => {
          console.log(error)
    })
  }, [])

  const [persons, setPersons] = useState([
    // { name: 'Arto Hellas', number: '731 854 832'},
    // { name: 'Ada Lovelace', number: '39-44-5323523'},
    // { name: 'Dan Abramov', number: '12-43-234345'},
    // { name: 'Mary Poppendieck', number: '39-23-6423122'}
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilters, setFilters] = useState('')
  const [message, setMessage] = useState(null)
  const [style, setStyle] = useState(null)

  const addPeople = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber,
      id: persons.length + 1
    }

    const handleSameName = persons.find((person) => 
      person.name === newName)
    if (handleSameName) {
      if(window.confirm(`${newName} is already added to the phonebook, replace the old number with the new one`)){
        personService
         .update(handleSameName.id, personObject)
         .then(returnedPerson => {
            setPersons(
              persons.map(
              person => 
              person.id !== handleSameName.id? person : returnedPerson))
              setMessage(`Updated ${newName}`)
              setStyle('success')
              setTimeout(() => {
                setMessage(null)
              }, 5000)
          })
         .catch(() => {
          setMessage(`error updating ${newName}`)
          setStyle('error')
              setTimeout(() => {
                setMessage(null)
              }, 5000)
            console.log('error')
      })
        return
      }
      alert(`${newName} is already added to the phonebook`)
      return
    }

    personService
     .create(personObject)
     .then(returnedPerson => {
      setPersons(persons.concat(returnedPerson))
      setNewNumber('')
      setNewName('')
      setMessage(`created ${newName}`)
      setStyle('success')
      setTimeout(() => {
        setMessage(null)
      }, 5000)
     })
     .catch((error) => {
      console.log(error.response.data.error)
      setMessage(`error creating ${newName}`)
      setStyle('error')
      setTimeout(() => {
        setMessage(null)
      }, 5000)
       console.log('error creating')
  })

    // axios
    //   .post('http://localhost:3001/persons', personObject)
    //   .then(response => {
    //     console.log(response)
    //     setPersons(persons.concat(response.data))
    //     setNewNumber('')
    //     setNewName('')
    //   })
    //   .catch(error => {
    //     console.error('There was an error adding the person!', error);
    //   })
  }

  const deletePerson = (personId) => {
    if (window.confirm(`Delete ${personId} ?`)){
      personService
      .deletePerson(personId)
      // with next step automatically filters the deleted data so theres no need to refresh website
      .then(() => {
      setPersons(persons.filter(person => person.id!== personId))
      setMessage(`deleted person ${personId}`)
      setStyle('success')
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    })
      .catch(() => {
        setMessage(`error deleting person with id ${personId}`)
        setStyle('error')
        setTimeout(() => {
          setMessage(null)
        }, 5000)
  
    })
    }
  }

  const addFilters = (event) => {
    event.preventDefault()
    setFilters(event.target.value)
  }
  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }
  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  return (
    <div>
      <Message message={message} style={style}/>
      <h2>Phonebook</h2>
      <div>
          <Filter 
            value={newFilters}
            onChange={addFilters}
            />
        </div>
      <h2>add a new</h2>
        <div>
        <PersonForm
            onSubmit={addPeople}
            name={newName}
            number={newNumber}
            onNameChange={handleNameChange}
            onNumberChange={handleNumberChange}
          />
        </div>
      <h2>Numbers</h2>
      <ul>
        {persons.filter((person) => 
        person.name.toLowerCase().includes(newFilters.toLowerCase())).map((person) => (
          <Person 
            key={person.id} 
            name={person}
            deletePerson={() => {
              console.log(`deleting person with id ${person.name}`)
              deletePerson(person.id)}
             } />
        ))}
      </ul>
      <div>debug: {newName}</div>
      <div>debug: {newNumber}</div>
      <div>debug: {newFilters}</div>
    </div>
  )
}


export default App