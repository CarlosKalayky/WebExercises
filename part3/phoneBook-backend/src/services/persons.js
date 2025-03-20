import axios from 'axios'
const baseUrl = 'https://testdeployment-yodj.onrender.com/persons'

let token = null

const setToken = newToken => {
  token = `Bearer ${newToken}` // Ensure "Bearer" is capitalized
}

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => {
      return response.data
    })
  }
  
  const create = async newObject => {
    const config = {
      headers: { Authorization: token }
    }
    console.log('sending request with the token:', token)
    try{
      const response = await axios.post(baseUrl, newObject, config)
      return response.data
    } catch (error) {
      console.error('Error creating person with the request:', error)
      throw error
    }
  }

  const deletePerson = async id => {
    const config = {
      headers: { Authorization: token },
    }
    try {
      const response = await axios.delete(`${baseUrl}/${id}`, config)
      return response.data
    } catch (error) {
      console.error('Error deleting person:', error)
      throw error
    }
  }
  
  const update = (id, newObject) => {
    const request = 
    axios
    .put(`${baseUrl}/${id}`, newObject)
    return request.then(response => response.data)
  }

export default { getAll, create, update, deletePerson, setToken }