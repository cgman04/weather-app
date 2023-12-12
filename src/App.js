import hotBg from './assets/hot.jpg';
import coldBg from './assets/cold.jpg';
import Descriptions from './components/Descriptions';
import React, { useEffect, useState } from 'react';
import { getWeatherData } from './weatherService';

function App() {

  const [weather, setWeather] = useState(null);
  const [units, setUnits] = useState('imperial');
  const [city, setCity] = useState('Los Angeles');
  const [bg, setBg] = useState(hotBg);


  useEffect(() => {
    const fetchWeatherData = async () => {
      const data = await getWeatherData(city, units);
      setWeather(data);

      //dynamic background
      const threshold = units === 'imperial' ? 60 : 15;
      if (data.temp <= threshold) setBg(coldBg);
      else setBg(hotBg);
    }

    fetchWeatherData();
  }, [units, city]);

  const handleClick = (e) => {
    const button = e.currentTarget;
    const currentUnit = button.innerText.slice(1);

    const isFahrenheit = currentUnit === 'F';
    button.innerText = isFahrenheit ? '°C' : '°F';
    setUnits(isFahrenheit ? 'imperial' : 'metric');
  };

  const keyPressed = (e) => {
    if (e.key === 'Enter') {
      setCity(e.currentTarget.value)
      e.currentTarget.blur();
    }
  };

  return (
    <div className='app' style={{ backgroundImage: `url(${bg})` }}>
      <div className='overlay'>

        {/* Only want to render the container if weather is NOT null */}

        {
          weather && (
            <div className='container'>
              <div className='section section__inputs'>
                <input onKeyDown={keyPressed} type='text' name='city' placeholder='Enter City...' />
                <button onClick={(e) => handleClick(e)}>°C</button>
              </div>

              <div className='section section__temperature'>
                <div className='descriptions'>
                  <h3>{`${weather.name}, ${weather.country}`}</h3>
                  <img
                    src={weather.iconURL} alt='weatherIcon'
                  />
                  <h3>{weather.description}</h3>
                </div>
                <div className='temperature'>
                  <h1>{`${weather.temp.toFixed()} °${units === 'metric' ? 'C' : 'F'}`}</h1>
                </div>
              </div>

              {/*bottom description*/}
              <Descriptions weather={weather} units={units}/>
            </div>
          )}
      </div>
    </div>
  );
}

export default App;
