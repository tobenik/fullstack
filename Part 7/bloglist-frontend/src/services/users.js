import axios from 'axios'
const baseUrl = '/api/users'

const getById = async userId => {
  const response = await axios.get(`${baseUrl}/${userId}`)
  return response.data
}

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

export default { getById, getAll }