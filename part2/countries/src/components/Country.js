const Country = (props) => {
  if (props.expanded) {
    return (
      <div>
        <h1>{props.name}</h1>
        <div>capital {props.capital}</div>
        <div>area {props.area}</div>
        
        <h2>languages:</h2>
        <ul>
          {Object.values(props.languages).map(language =>
            <li key={language}>
              {language}
            </li>
          )}
        </ul>
        <img src={props.flag} height="200" />
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
