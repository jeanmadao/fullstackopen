import { useState, useEffect } from 'react'

import Input from './components/Input'
import CountriesDisplay from './components/CountriesDisplay'

import countryService from './services/countries'
import weatherService from './services/weather'

const App = () => {
  const [searchCountry, setSearchCountry] = useState('')
  const [countries, setCountries] = useState([])

  const filteredCountries = countries.filter(country => country.name.official.toLowerCase().includes(searchCountry.toLowerCase()))

  const changeHandler = setter => (event) => setter(event.target.value)
  
  const toggleExpand = targetIndex => () => {
  }

  useEffect(() => {
    countryService.getAll()
      .then(data => {
        setCountries(data.map(country => {
          const detailedCountry = { ...country, expanded: false }
          weatherService.get(country.capital)
            .then(data => detailedCountry.capitalInfo.weather = data)
            .catch(() => detailedCountry.capitalInfo.weather = null)
          return detailedCountry
        }))
      })
  }, [])

  return (
    <div>
      <Input 
        desc="find countries"
        value={searchCountry}
        onChange={changeHandler(setSearchCountry)}
      />
      <CountriesDisplay
        countries={filteredCountries} 
        toggle={toggleExpand}
      />
    </div>
  )
}

export default App;
