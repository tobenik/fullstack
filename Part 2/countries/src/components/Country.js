import React, { useEffect } from "react";
import axios from "axios";

const Country = ({ country, currentWeather, setNewWeather }) => {
    if (!country.name) {
        return (<div></div>)
    } else {
        return (
            <div>
                <h1>{country.name.common}</h1>
                <p>Capital: {country.capital}</p>
                <p>Population: {country.population}</p>
                <h2>Official languages:</h2>
                <ul>
                    {Object.values(country.languages).map(lan => <li key={lan}>{lan}</li>)}
                </ul>
                <img src={country.flags.png} alt="country-flag" width="200" />
                <h2>Weather in {country.capital}</h2>
                <Weather country={country}
                        currentWeather={currentWeather}
                        setNewWeather={setNewWeather}/>
            </div>
        )
    }
};

const Weather = ({ country, setNewWeather, currentWeather }) => {
    const api_key = process.env.REACT_APP_API_KEY
    useEffect(() => {
        axios
          .get(`https://api.openweathermap.org/data/2.5/weather?q=${country.capital}&units=metric&appid=${api_key}`)
          .then(response => {
            setNewWeather(response.data)
            console.log('API call made!');
          })
      }, [country]);
    if (currentWeather.main) {
        return (
            <>
                <p>
                    <b>temperature: </b>{Math.round(currentWeather.main.temp)} Celsius<br/>
                    <b>conditions: </b>{currentWeather.weather[0].description} <br/>
                    <b>wind: </b>{currentWeather.wind.speed} m/s (direction: {currentWeather.wind.deg}°)
                </p>
    
            </>
        )
    } else { return null;}
}

export default Country;