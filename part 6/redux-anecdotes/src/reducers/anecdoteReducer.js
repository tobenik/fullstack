import anecdoteService from '../services/anecdotes'

const anecdoteReducer = (state = [], action) => {
  switch (action.type) {
    case 'VOTE':
      const id = action.data.id
      const anecdotetoVote = state.find(a => a.id === id)
      const anecdoteVoted = { ...anecdotetoVote, votes: anecdotetoVote.votes + 1 }
      return state.map(a => a.id === id ? anecdoteVoted : a)

    case 'NEW_ANECDOTE':
      return [...state, action.data]

    case 'INIT_ANECDOTES':
      return action.data

    default:
      return state
  }
}

export const voteFor = (id) => {
  return async dispatch => {
    await anecdoteService.addVote(id)
    dispatch({
      type: 'VOTE',
      data: { id }
    })
  }
}

export const newAnecdote = (content) => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch({
      type: 'NEW_ANECDOTE',
      data: newAnecdote
    })
  }
}

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes
    })
  }
}

export default anecdoteReducer