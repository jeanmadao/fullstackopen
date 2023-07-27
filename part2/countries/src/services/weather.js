import axios from 'axios'

const baseUrl = "https://api.openweathermap.org/data/2.5/weather?"
const units = "metric"

const get = (city) => {
  const request = axios.get(`${baseUrl}q=${city}&appid=${process.env.REACT_APP_API_KEY}&units=${units}`)
  return request.then(response => response.data)
}

export default { get }
