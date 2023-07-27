import Country from './Country'

const CountriesDisplay = ({ countries, expanded, toggle } ) => {
  if (countries.length === 1) {
    const country = countries[0]
    console.log(country)
    return (
      <div>
        <Country 
          name={country.name.common}
          capital={country.capital}
          area={country.area}
          languages={country.languages}
          flag={country.flags.svg}
          temperature={country.capitalInfo.weather.main.temp}
          wind={country.capitalInfo.weather.wind.speed}
          icon={country.capitalInfo.weather.weather[0].icon}
          expanded={true}
        />
      </div>
    )
  } else if (countries.length <= 10) {
    return (
      <div>
        {countries.map((country, index) =>
          <div key={`${country.name.common}-div`}>
            <Country 
              key={country.name.common}
              name={country.name.common}
              capital={country.capital}
              area={country.area}
              languages={country.languages}
              flag={country.flags.svg}
              temperature={country.capitalInfo.weather.main.temp}
              wind={country.capitalInfo.weather.wind.speed}
              icon={country.capitalInfo.weather.weather[0].icon}
              expanded={country.expanded}
            />
            <button key={`${country.name.common}-btn`} onClick={toggle(index)}>show</button>
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
