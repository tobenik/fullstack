import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getById = async (id) => {
  const response = await axios.get(`${baseUrl}/${id}`)
  return response.data
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

const likeBlog = async id => {
  const currObj = await getById(id)
  const newObj = { ...currObj, likes: currObj.likes + 1 }
  const response = await axios.put(`${baseUrl}/${id}`, newObj)
  return response.data
}

const deleteBlog = async blogId => {
  const config = {
    headers: { Authorization: token },
  }
  await axios.delete(baseUrl.concat(`/${blogId}`), config)
}

export default { getAll, setToken, create, likeBlog, deleteBlog, getById }