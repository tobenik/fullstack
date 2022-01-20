import React from 'react';

const Course = ({ course }) => {
    return (
        <>
        <Header course={course}/>
        <Content course={course}/>
        <Sum course={course}/>
        </>
    ) 
};

const Header = ({ course }) => {
    return (
      <h2>{course.name}</h2>
    )
};
  
const Part = (props) => {
    return (
        <p>
        {props.part.name} {props.part.exercises}
        </p>
    )
};
  
const Content = ({ course }) => {
    return (
        <>
        {course.parts.map(part =>
            <Part part={part} key={part.id}/>
        )}
        </>
    )
};
  
const Sum = ({ course }) => {
    const sum = course.parts.reduce((total, next) => 
                (total+next.exercises), 0)
    return (
        <b>total of {sum} exercises</b>
    )
};

export default Course;