const Country = ({ 
  name, capital, area, text, languages, flag, 
  showCountry, temperature, wind, icon }) => {
    console.log(name)
    console.log(capital)
    console.log(languages)
    // console.log(lat, long) was testing
    return ( <div>
      <li>
        <h1>{name} </h1>
        <p>{capital} </p>
        <p>{area}</p>
        <h2>{text}</h2>
        <ul>
        {/* map doesnt work on objects so we gotta get the array of data from the languages */}
        {languages === '' ? (
            console.log("null")
        ) : (
            Object.values(languages).map((language) => 
              <li key={language}>{language}</li>
            )
        )}
        </ul>
        <img src={flag}/>
        <br/>
        <button onClick={showCountry}>Show
        </button>
        <p>temperature: {temperature}</p>
        <p>wind: {wind} m/s</p>
        <img src={`https://openweathermap.org/img/wn/${icon}@2x.png`} alt="Weather icon"/>
        </li>
      </div>
    )
  }

export default Country