import React from 'react'

const Header = (props) => (
  <div>
    <h1>
      {props.course.name}
    </h1>
  </div>
)

const Content = (props) => (
  <div>
    <Part info={props.course.parts[0]} />
    <Part info={props.course.parts[1]} />
    <Part info={props.course.parts[2]} />
  </div>
)

const Part = (props) => (
  <>
    <p>
      {props.info.name} {props.info.exercises}
    </p>
  </>
)

const Total = (props) => {
  const total = (
    props.course.parts[0].exercises + 
    props.course.parts[1].exercises + 
    props.course.parts[2].exercises
  );
  
  return (
  <div>
    <p>
      Numer of exercises {total}
    </p>
  </div>
  )
};

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
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
    <>
      <Header course={course} />
      <Content course={course} />
      <Total course={course} />
    </>
  )
}

export default App