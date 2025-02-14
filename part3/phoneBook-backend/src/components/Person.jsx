
const Person = ({ name, number, deletePerson }) => {
    console.log(name)
    console.log(number)
    return ( <div>
      <li>{name.name} - {name.number} <button onClick={deletePerson}>Delete</button></li>
      </div>
    )
  }

export default Person