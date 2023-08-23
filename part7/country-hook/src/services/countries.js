import axios from 'axios'

const baseUrl = 'https://studies.cs.helsinki.fi/restcountries'

const getCountry = async (country) => {
    const response = await axios.get(`${baseUrl}/api/name/${country}`)
    return response
}

export default { getCountry }