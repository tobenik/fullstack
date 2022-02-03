import axios from 'axios'
const baseUrl = '/api/users'

const getById = async userId => {
  const response = await axios.get(`${baseUrl}/${userId}`)
  return response.data
}

export default { getById }