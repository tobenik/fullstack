import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Country from './components/Country';

const App = () => {

  const [newSearch, setNewSearch] = useState('');
  const [countries, setCountries] = useState([]);
  const [matching, setNewMatching] = useState([]);
  const [currentCountry, setNewCountry] = useState({});
  const [currentWeather, setNewWeather] = useState({});

  const handleSearchChange = (event) => {
    setNewSearch(event.target.value)
    // Update the matching countries list
    setNewMatching(countries.filter((country) => 
      country.name.common.toLowerCase().includes(event.target.value.toLowerCase())
    ))
  };

  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        setCountries(response.data)
      })
  }, []);

  return (
    <div>
      Find country: <input onChange={handleSearchChange} />
      <div>
        {(matching.length < 11) ? 
        <ul>
          {matching.map((country) => 
            <li key={country.name.common}>
              {country.name.common}
              <button onClick={() => setNewCountry(country)}>
                show
              </button>
            </li>
          )}
      </ul> : 
      <p>Too many matches, continue typing ...</p>}
      </div>
      <Country country={currentCountry} 
              currentWeather={currentWeather}
              setNewWeather={setNewWeather}/>
    </div>
  )
};

export default App