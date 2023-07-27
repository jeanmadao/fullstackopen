const Country = (props) => {
  if (props.expanded) {
    return (
      <div>
        <h1>{props.name}</h1>
        <div>capital {props.capital}</div>
        <div>area {props.area}</div>
        
        <h3>languages:</h3>
        <ul>
          {Object.values(props.languages).map(language =>
            <li key={language}>
              {language}
            </li>
          )}
        </ul>
        <img src={props.flag} height="200" />

        <h2>Weather in {props.capital}</h2>
        <div>temperature {props.temperature} Celsius</div>
        <img src={`https://openweathermap.org/img/wn/${props.icon}@2x.png`} />
        <div>wind {props.wind} m/s</div>
      </div>
    )
  } else {
    return (
      <>
        {props.name}
      </>
    )
  }
}

export default Country
