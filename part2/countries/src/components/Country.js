import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Country = ({ country, solo }) => {
  const [show, setShow] = useState(false)

  const handleShowClick = () => {
    setShow(show ^ true)
  }

  if (solo && show === false) {
    setShow(true)
  }

  useEffect(() => {
    axios
      .get(`https://api.openweathermap.org/data/2.5/weather?lat=${country.capitalInfo.latlng[0]}&lon=${country.capitalInfo.latlng[1]}&appid=${process.env.REACT_APP_API_KEY}`)
      .then(response => {
        const weatherJson = JSON.parse(response.request.response)
        const temperatureDiv = document.getElementById('temperature')
        const weatherImg = document.getElementById('weather-img')
        const windDiv = document.getElementById('wind')

        temperatureDiv.innerText = `temperature ${Math.round((weatherJson.main.temp - 273.15 + Number.EPSILON) * 100) / 100} Celcius`
        weatherImg.setAttribute("src", `http://openweathermap.org/img/wn/${weatherJson.weather[0].icon}@2x.png`)
        windDiv.innerText = `wind ${weatherJson.wind.speed} m/s`
      })
  })


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
        <h2>Weather in {country.capital}</h2>
        <div id="temperature"></div>
        <img id="weather-img" />
        <div id="wind"></div>
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
