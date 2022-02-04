import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { voteFor } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'
import _ from 'lodash'

const Anecdote = ({ anecdote, handleClick }) => {
  return (
    <div key={anecdote.id}>
      <div>
        {anecdote.content}
      </div>
      <div>
        has {anecdote.votes}
        <button onClick={handleClick}>vote</button>
      </div>
    </div>
  )
}

const AnecdoteList = () => {
  const dispatch = useDispatch()
  const anecdotes = useSelector(state => state.anecdotes)
  const filter = useSelector(state => state.filter)
  const handleVote = (id, content) => {
    dispatch(voteFor(id))
    dispatch(setNotification(`you voted '${content}'`, 5))
  }

  return (
    <div>
      {_.orderBy(anecdotes, ['votes'], ['desc']).map(anecdote =>
        anecdote.content.toLowerCase().includes(filter.toLowerCase()) ? 
        <Anecdote
          key={anecdote.id}
          anecdote={anecdote}
          handleClick={() => handleVote(anecdote.id, anecdote.content)}
        /> :
        ''
      )}
    </div>
  )
}

export default AnecdoteList