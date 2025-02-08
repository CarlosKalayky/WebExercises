import axios from 'axios'
const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/'
const weatherUrl = 'https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={appid}'

const getAll = () => {
    const request = axios.get(`${baseUrl}api/all`)
    return request.then(response => {
      console.log(request, response.data)
      return response.data
    })
     .catch(error => {
        return console.log(error)
      })
  }

  const getWeather = (lat, lon) => {
    const apikey = import.meta.env.VITE_SOME_KEY
    const weatherRequest = axios.get(weatherUrl.replace('{lat}', lat).replace('{lon}', lon).replace('appid', apikey))
    return weatherRequest.then(response => {
      return response.data
    })
  }
  
  const update = (id, newObject) => {
    const request = 
    axios
    .put(`${baseUrl}/${id}`, newObject)
    return request.then(response => response.data)
  }

export default { getAll, update, getWeather }