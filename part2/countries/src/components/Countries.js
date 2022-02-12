import React from 'react'
import Country from './Country'

const Countries = ({ countriesToShow }) => {

  if (countriesToShow.length > 10) {
    return (
      <div>
        Too many matches, specify another filter
      </div>
    )
  } else if (countriesToShow.length === 1) {
    return (
      <Country key={countriesToShow[0].name.official} country={countriesToShow[0]} show={true} />
    )
  } else {
    return (
      <ul>
        {countriesToShow.map(country =>
          <Country key={country.name.official} country={country} show={false} />
        )}
      </ul>
    )
  }
}

export default Countries
