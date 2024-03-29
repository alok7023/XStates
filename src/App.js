import { useState, useEffect } from "react";
import "./App.css";
const URL = `https://crio-location-selector.onrender.com/countries`;
function App() {
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setselectedCity] = useState("");

  const URL1 = `https://crio-location-selector.onrender.com/country=${selectedCountry}/states`;
  const URL2 = `https://crio-location-selector.onrender.com/country=${selectedCountry}/state=${selectedState}/cities`;

  const getCountries = async () => {
    try {
      const response = await fetch(URL);
      const countries = await response.json();
      setCountries(countries);
    } catch (error) {
      console.log(error);
    }
  };

  const getStates = async () => {
    try {
      const response = await fetch(URL1);
      const states = await response.json();
      setStates(states);
    } catch (error) {
      console.error(error);
    }
  };


  const getCities = async () => {
    try {
      const response = await fetch(URL2);
      const cities = await response.json();
      setCities(cities);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getCountries();
  }, []);

  useEffect(() => {
    if (selectedCountry) {
      getStates();
    }
  }, [selectedCountry]);

  useEffect(() => {
    if (selectedCountry && selectedState) {
      getCities();
    }
  }, [selectedCountry, selectedState]);

  return (
    <div className="city-selector">
      <h1>Select Location</h1>
      <div className="dropdowns">
      <select
        value={selectedCountry}
        onChange={(e) => setSelectedCountry(e.target.value)}
        className="dropdown"
      >
        <option>Select Country</option>
        {countries.map((country,idx) => (
          <option value={country} key={idx}>{country}</option>
        ))}
      </select>
      <select
        value={selectedState}
        onChange={(e) => setSelectedState(e.target.value)}
        className="dropdown"
      >
        <option>Select State</option>
        {states.map((state,idx) => (
          <option value={state} key={idx}>{state}</option>
        ))}
      </select>
      <select
        value={selectedCity}
        onChange={(e) => setselectedCity(e.target.value)}
        className="dropdown"
      >
        <option>Select City</option>
        {cities.map((city,idx) => (
          <option value={city} key={idx}>{city}</option>
        ))}
      </select>
      </div>
      {selectedCity && (
        <h2 className="result">
          You selected <span className="highlight">{selectedCity}</span>,
          <span className="fade">
            {" "}
            {selectedState}, {selectedCountry}
          </span>
        </h2>
      )}
      
    </div>
  );
}

export default App;