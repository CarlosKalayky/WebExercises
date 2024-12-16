const App = () => {
  const course = {
    name:'Half Stack application development',
    parts : [
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
      <Header course={course.name} />
      <Content parts={course.parts}/>
      <Total parts={course.parts} />
    </div>
  )
}

const Header = (props) => {
  console.log(props)
  return (
    <div>
      <p>{props.course}</p>
    </div>
  )
}

const Content = (props) => {
  console.log(props)
  return (
    <div>
     {props.parts.map(value => <Part key={value.name} content={value.name} exercices={value.exercises} />)}
        {/* <Part content={props[0]} exercices={props[0]}/>
        <Part content={props[1]} exercices={props[1]}/>
        <Part content={props[2]} exercices={props[3]}/> */}
    </div>
  )

}

const Part = (props) => {
  return (
    <div>
      <p>
        {props.content} {props.exercices}
      </p>
    </div>
  )
}

const Total = (props) => {
  console.log(props)
  /* Using reduce to reduce all the array into one number, which then uses the current value coming from exercises, starting at 0*/
  const finalValue = props.parts.reduce((accumulator, currentValue) => accumulator + currentValue.exercises, 0)
  console.log(finalValue)
  return (
    <div>
      <p>{finalValue}</p>
    </div>
  )

}

export default App