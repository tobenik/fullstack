const filterReducer = (state = '', action) => {
  switch (action.type) {
    case 'UPDATE':
      return action.data.value

    default:
      return state
  }
}

export const updateFilter = (value) => {
  return ({
    type: 'UPDATE',
    data: { value }
  })
}

export default filterReducer