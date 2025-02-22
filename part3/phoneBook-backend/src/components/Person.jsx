
const Person = ({ name, deletePerson }) => {
    console.log(name)
    return ( <div>
      <li>{name.name} - {name.number}  <button onClick={deletePerson}>Delete</button></li>
      </div>
    )
  }

export default Person