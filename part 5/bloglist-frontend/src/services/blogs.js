import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const create = async newBlog => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.post(baseUrl, newBlog, config)
  return response.data
}

const likeBlog = async likedBlog => {
  const response = await axios.put(baseUrl.concat(`/${likedBlog.id}`), likedBlog)
  return response.data
}

const deleteBlog = async blogId => {
  const config = {
    headers: { Authorization: token },
  }
  await axios.delete(baseUrl.concat(`/${blogId}`), config)
}

export default { getAll, setToken, create, likeBlog, deleteBlog }