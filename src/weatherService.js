import { data } from "autoprefixer";

const API_KEY = 'dfb73cba81b2e83266399889a73da176';
const iconURL = (iconId) => `https://openweathermap.org/img/wn/${iconId}.png`;

const getWeatherData = async (city, units='metric') => {
    const URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=${units}`;

    const data = await fetch(URL)
        .then((res) => res.json())
        .then((data) => data);


    const {weather, main: {temp, feels_like, temp_min, temp_max, pressure, humidity},
    wind: {speed},
    sys: {country},
    name,
        } = data;

    const {description, icon} = weather[0];

    return {
        description, 
        iconURL: iconURL(icon), 
        temp, 
        feels_like, 
        temp_min, 
        temp_max, 
        pressure, 
        humidity, 
        speed, 
        country, 
        name,
    };
};

export {getWeatherData};