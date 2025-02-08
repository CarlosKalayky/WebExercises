import { useState, useEffect } from 'react'
import countryService from './services/countries.js'
import Filter from './components/Filter.jsx'
import Country from './components/Country.jsx'

function App() {

  const [countries, setCountries] = useState([]) 
  const [newFilters, setFilters] = useState('')
  const [selectedCountry, setSelectedCountry] = useState(null)
  const [weather, setWeather] = useState(null)
  // const [message, setMessage] = useState(null)
  // const [style, setStyle] = useState(null)

    useEffect(() => { // Gets list of countries
      countryService
        .getAll()
        .then(initialCountries => {
          console.log(initialCountries)  // debugging purposes
          setCountries(initialCountries)
        })
        .catch(error => {
          console.log(error)
    })
  }, [])

    const filteredCountries = countries.filter((country) => // we store the array of countries filtered that are equal to newFilters already controlled
      country.name.common.toLowerCase().includes(newFilters.toLowerCase()))

    useEffect(() => { // In this case we make sure that when the list of matched countries is 1 is the selected country like if button was pressed
        if(filteredCountries.length === 1) {
          setSelectedCountry(filteredCountries[0])
        } else {
          console.log(filteredCountries)
          //If we make the selected country to be null here when theres no selected country it will not allow for the selected country to be shown for
          // more than a milisecond, so instead we make the starting state of the selected country as null and that should fix it
        }
    }, [filteredCountries]); //It said react effect needed something for the dependencies that i am 
    // not sure about, but yeah, to not make an infinite loop always working itll refresh once theres a filtered

    useEffect(() => {
      if(selectedCountry) {
        const [lat, long] = selectedCountry.latlng
        countryService
        .getWeather(lat, long)
        .then(weatherData => {
          console.log("weather" + weatherData.main.temp)
          console.log("weather" + weatherData.wind.speed)
          console.log("weather" + weatherData.weather[0].icon)
          setWeather(weatherData)
        })
        .catch(error => {
          console.log(`Error fetching weather data: ${error}`)
        })
      }else{
        console.log('No country selected')
      }
    }, [selectedCountry]); //It said react effect needed something needed; //It said react effect needed something needed

    const addFilters = (event) => { //Filters controlled
      event.preventDefault()
      setFilters(event.target.value)
      setSelectedCountry(null)
    }

    const handleCountryClick = (country) => {
      console.log(country) // selects the country when button is pressed
      setSelectedCountry(country)
    }

  return (
    <>
      <div>
      <Filter 
            value={newFilters}
            onChange={addFilters}
            />
        <ul>
        {filteredCountries.length > 10 ? (
          <p>Too many matches, please be more specific</p>
        ) : selectedCountry && weather ? ( // If theres a selected country, its supposed to be less than 10 and if 1 then be true
        //Also if theres a weather made since theres some error if its not confirmed and it doesnt load
            <Country 
              name={selectedCountry.name.common}
              capital={selectedCountry.capital}
              text='Languages'
              area={selectedCountry.area}
              languages={selectedCountry.languages}
              flag={selectedCountry.flags.png}
              key={selectedCountry.name.common}
              temperature={weather.main.temp}
              wind={weather.wind.speed}
              icon={weather.weather[0].icon} 

              />
          ) : (
            filteredCountries.map((country) => (
              <Country 
              name={country.name.common}
              key={country.name.common}
              languages='' 
              showCountry={() => handleCountryClick(country)} />
            ))
          )
        }
        </ul>
      </div>
    </>
  )
}

export default App
