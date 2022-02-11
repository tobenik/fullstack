import blogService from '../services/blogs'
import userService from '../services/users'

const blogReducer = (state = [], action) => {
  switch (action.type) {
    case 'LIKE': {
      const id = action.data.id
      const blogToLike = state.find(a => a.id === id)
      const blogLiked = { ...blogToLike, likes: blogToLike.likes + 1 }
      return state.map(a => a.id === id ? blogLiked : a)
    }

    case 'NEW_BLOG':
      return [...state, action.data]

    case 'DEL_BLOG': {
      const id = action.data.id
      return state.filter(b => b.id !== id)
    }

    case 'INIT_BLOGS':
      return action.data

    default:
      return state
  }
}

export const like = (id) => {
  return async dispatch => {
    await blogService.likeBlog(id)
    dispatch({
      type: 'LIKE',
      data: { id }
    })
  }
}

export const newBlog = (content) => {
  return async dispatch => {
    const newBlog = await blogService.create(content)
    //Transform userId to userObject
    newBlog.user = await userService.getById(newBlog.user)
    dispatch({
      type: 'NEW_BLOG',
      data: newBlog
    })
  }
}

export const delBlog = id => {
  return async dispatch => {
    await blogService.deleteBlog(id)
    dispatch({
      type: 'DEL_BLOG',
      data: { id }
    })
  }
}

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch({
      type: 'INIT_BLOGS',
      data: blogs
    })
  }
}

export default blogReducer