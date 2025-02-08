import Content from "./Content"
import Header from "./Header"
const Course = ({ course }) => {
    return (
      <div>
        <Header course={course[0].name} />
        <Content parts={course[0].parts}/>
        <Total parts={course[0].parts} />
        <Header course={course[1].name} />
        <Content parts={course[1].parts}/>
        <Total parts={course[1].parts} />
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
        <b>total of {finalValue}</b>
      </div>
    )
  
  }
  
  export default Course