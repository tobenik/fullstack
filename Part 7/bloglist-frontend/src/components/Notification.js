import React from 'react'
import { useSelector } from 'react-redux'
import { Alert } from 'react-bootstrap'

const Notification = () => {
  const notification = useSelector(state => state.notification)

  if (!notification) {
    return null
  }

  let status = 'success'
  if (notification.includes('Error') || notification.includes('failed')) {
    status = 'danger'
  }

  return (
    <div className='container'>
      <Alert variant={status}>
        {notification}
      </Alert>
    </div>
  )
}

export default Notification