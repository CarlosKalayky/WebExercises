
import Part from "./part"
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

export default Content