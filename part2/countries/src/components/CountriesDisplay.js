import Country from './Country'

const CountriesDisplay = ({ countries, expanded, toggle } ) => {
  if (countries.length === 1) {
    const country = countries[0]
    return (
      <div>
        <Country 
          name={country.name.common}
          capital={country.capital}
          area={country.area}
          languages={country.languages}
          flag={country.flags.svg}
          expanded={true}
        />
      </div>
    )
  } else if (countries.length <= 10) {
    return (
      <div>
        {countries.map((country, index) =>
          <div>
            <Country 
              key={country.name.common}
              name={country.name.common}
              capital={country.capital}
              area={country.area}
              languages={country.languages}
              flag={country.flags.svg}
              expanded={expanded[index]}
            />
            <button onClick={toggle(index)}>show</button>
          </div>
        )}
      </div>
    )
  } else {
    return (
      <div>
        Too many matches, specify another filter
      </div>
    )
  }
}

export default CountriesDisplay
