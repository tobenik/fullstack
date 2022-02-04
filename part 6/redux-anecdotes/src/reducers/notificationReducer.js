const initialState = ''

const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SHOW':
      return action.data.message
    case 'HIDE':
      return ''

    default:
      return state
  }
}

export const setNotification = (message, time) => {
  return async dispatch => {
    dispatch({
      type: 'SHOW',
      data: {message}
    })
    setTimeout(() => {
      dispatch({
        type: 'HIDE'
      })
    }, time*1000)
  }
}


export default notificationReducer