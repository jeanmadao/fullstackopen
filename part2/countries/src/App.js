import { useState, useEffect } from 'react'

import Input from './components/Input'
import CountriesDisplay from './components/CountriesDisplay'

import countryService from './services/countries'

const App = () => {
  const [searchCountry, setSearchCountry] = useState('')
  const [countries, setCountries] = useState([])
  const [expanded, setExpanded] = useState([])

  const filteredCountries = countries.filter(country => country.name.official.toLowerCase().includes(searchCountry.toLowerCase()))

  const changeHandler = setter => (event) => setter(event.target.value)
  
  const toggleExpand = targetIndex => () => setExpanded(expanded.map((current, index) => index === targetIndex ? !current : current))

  useEffect(() => {
    countryService.getAll()
      .then(data => {
        setExpanded(data.map(country => false))
        setCountries(data)   
      })
  }, [])

  return (
    <div>
      <Input desc="find countries" value={searchCountry} onChange={changeHandler(setSearchCountry)} />
      <CountriesDisplay countries={filteredCountries} expanded={expanded} toggle={toggleExpand}/>
    </div>
  )
}

export default App;
