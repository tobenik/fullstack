import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

test('renders content correctly', () => {
  const blog = {
    title: 'No Role Models',
    author: 'J. Cole',
    likes: 345,
    url: 'jcole.dope'
  }
  const component = render(
    <Blog blog={blog} />
  )
  const obj = component.container.querySelector('.blogDiv')

  expect(obj).toHaveTextContent('No Role Models')
  expect(obj).toHaveTextContent('J. Cole')
  expect(obj).not.toHaveTextContent('jcole.dope')
  expect(obj).not.toHaveTextContent('likes')
})

test('view button shows url and likes', () => {
  const blog = {
    title: 'No Role Models',
    author: 'J. Cole',
    likes: 345,
    url: 'jcole.dope',
    user: { name: 'pingu' }
  }
  const user = {
    name: 'pingu'
  }
  const component = render(
    <Blog blog={blog} user={user} />
  )
  const obj = component.container.querySelector('.blogDiv')

  expect(obj).not.toHaveTextContent('jcole.dope')
  expect(obj).not.toHaveTextContent('likes')

  const button = component.getByText('view')
  fireEvent.click(button)

  expect(obj).toHaveTextContent('jcole.dope')
  expect(obj).toHaveTextContent('likes')
})

test('clicking view button twice calls event handler twice', () => {
  const blog = {
    title: 'No Role Models',
    author: 'J. Cole',
    likes: 345,
    url: 'jcole.dope',
    user: { name: 'pingu' }
  }
  const user = {
    name: 'pingu'
  }

  const mockHandler = jest.fn()

  const component = render(
    <Blog blog={blog} user={user} like={mockHandler} />
  )

  const view = component.getByText('view')
  fireEvent.click(view)
  const like = component.getByText('like')

  fireEvent.click(like)
  expect(mockHandler.mock.calls).toHaveLength(1)
  fireEvent.click(like)
  expect(mockHandler.mock.calls).toHaveLength(2)
})

