import React from 'react'

const Notification = ({ message }) => {
  if (message === null) {
    return null
  }

  const messageStyle = {
    color: 'green',
    background: 'lightgrey',
    fontSize: 14,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  }

  if (message.includes('Error') || message.includes('failed')) {
    messageStyle.color = 'red'
  }

  return (
    <div style={messageStyle} className='notification'>
      {message}
    </div>
  )
}

export default Notification