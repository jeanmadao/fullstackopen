import { useState, useEffect } from 'react'

import Input from './components/Input'
import CountriesDisplay from './components/CountriesDisplay'

import countryService from './services/countries'

const App = () => {
  const [searchCountry, setSearchCountry] = useState('')
  const [countries, setCountries] = useState([])

  const filteredCountries = countries.filter(country => country.name.official.toLowerCase().includes(searchCountry.toLowerCase()))

  const changeHandler = setter => (event) => setter(event.target.value)

  useEffect(() => {
    countryService.getAll()
      .then(data => {
        setCountries(data)   
      })
  }, [])

  return (
    <div>
      <Input desc="find countries" value={searchCountry} onChange={changeHandler(setSearchCountry)} />
      <CountriesDisplay countries={filteredCountries} />
    </div>
  )
}

export default App;
