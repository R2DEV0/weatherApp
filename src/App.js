import React,{ useState } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import background from './pics/background.jpg'

function App() {
  const[query, setQuery] = useState('');
  const[weather, setWeather] = useState({});

  const dateDisplay = (d) => {
    let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 
    'October', 'November', 'December'];
    let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day}, ${date} ${month} ${year}`
  }

  const search = evt => {
    if(evt.key === "Enter"){
      fetch(`https://api.openweathermap.org/data/2.5/weather?q=${query}&units={weatherAPI KEY}`)
        .then(res => res.json())
        .then(result => {
          setWeather(result);
          setQuery('');
          console.log(result);
        });
    }
  }


  return (
    <div className={( typeof weather.main != "undefined") ? 
    ((weather.main.temp > 60 && weather.main.temp < 90) ? 'wrapper' : 'wrapper cold') ? 
    ((weather.main.temp >= 90) ? 'wrapper hot' : 'wrapper cold') : 'wrapper app' : 'wrapper app'}>

      <div className='container text-center'>
        <div>
          <h1 className='title'>How's the weather?</h1>
        </div>
        <div className='col-12 mt-5'>
          <input type="text" className='userInput' placeholder='Search by City' onChange={e => setQuery(e.target.value)} value={query} onKeyPress={search} />
        </div>
        {(typeof weather.main != "undefined") ? (
        <div className='mt-5 info'>
          <h3 className='city'>{weather.name}, {weather.sys.country}</h3>
          <h3 className='date'> {dateDisplay(new Date())} </h3>
          <h1 className='temp'>{Math.round(weather.main.temp)}°F</h1>
          <h3 className='type'>{weather.weather[0].main}</h3>
        </div>
        ) : ('')}
      </div>
      <footer className='footer'>
        <p>© 2020 - <a href="http://kevinchancey.xyz" target="_blank" rel="noopener noreferrer" className='kevin'>Kevin Chancey</a></p>
      </footer>
    </div>
  );
}

export default App;
