import React, { useState } from 'react'

const Country = ({ country, solo }) => {
  const [show, setShow] = useState(false)

  const handleShowClick = () => {
    setShow(show ^ true)
  }

  if (solo && show === false) {
    setShow(true)
  }

  if (show) {
    return (
      <div>
        <button onClick={handleShowClick}>hide</button>
        <h1>{country.name.common}</h1>
        <div>capital {country.capital}</div>
        <div>area {country.area}</div>

        <h3>languages:</h3>
        <ul>
          {Object.values(country.languages).map(language =>
            <li key={language}>{language}</li>
          )}
        </ul>
        <img src={country.flags.png} alt={`${country.name.common} flag`} />
      </div>
    )
  } else {

    return (
      <li>
        {country.name.common}
        <button onClick={handleShowClick}>show</button>
      </li>
    )
  }
}

export default Country
