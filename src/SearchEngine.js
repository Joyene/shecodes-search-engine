import axios from "axios";
import React from "react";
import { useState } from "react";
function SearchEngine() {
    const [city, setCity] = useState("");
    const [loaded, setLoaded] = useState(false);
    const [weather, setWeather] = useState({});

    function handleSubmit(event) {
        event.preventDefault();
        let apiKey = "5ec378af668e4e5ca5b63a514661a894";
        let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
        axios.get(apiUrl).then(displayWeather);
    }
    function displayWeather(response) {
        setLoaded(true);
        setWeather(
            {
                temp: response.data.main.temp,
                speed: response.data.wind.speed,
                humidity: response.data.main.humidity,
                icon: response.data.weather[0].icon
            }
        )
    }
    function updateCountry(event) {
        //event.preventDefault();
        setCity(event.target.value);
    }
    let form = (
        <form className="Search-container" onSubmit={handleSubmit}>
            <input type="search" placeholder="Enter a country..." onChange={updateCountry} />
            <button type="submit">Search</button>
        </form>
    )
    if (loaded) {
        return (
            <div>
                {form}
                <ul>
                    <li>Temperature: {weather.temp}</li>
                    <li>Wind: {weather.speed}Km/h</li>
                    <li>Humidity: {weather.humidity}%</li>
                    <li>Icon: {weather.icon}</li>
                </ul>
            </div>
        )
    } else {
        return form
    }
}
export default SearchEngine;