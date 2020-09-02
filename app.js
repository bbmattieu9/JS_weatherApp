// import api file here


// Add this to an external filel and import it; Use standard convention for your folder structure mr.Mattieu!


window.addEventListener('load', () => {
    // let long;
    // let lat;

    let tempDescription = document.querySelector('.temperature-description');
    let tempDegree = document.querySelector('.temperature-degree');
    let locationTimeZone = document.querySelector('.location-timezone');
    let weatherIcon = document.querySelector('.weather-icon');

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
          
            let { longitude, latitude } = position.coords;
            // long = position.coords.longitude;
            // lat = position.coords.latitude; 

            const openWeatherApiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&APPID=1c831533900bcb8bf3edd9b4d16cfc69&units=metric`;

            fetch(openWeatherApiUrl)
                 .then(response => {
                     return response.json();
                 })
                 .then(weatherObject => {
                     console.log('[OpenWeather Returns]: ', weatherObject);
                     console.log('[Weather in Lagos]:', weatherObject.weather[0]);
                     console.log('[CityName]:', weatherObject.name);
                     
                     // Destructure the properties in the weatherObject
                     const { feels_like, humidity, pressure, temp, temp_max, temp_min} = weatherObject.main;
                     const { description, icon, main } = weatherObject.weather[0];
                     const {country, sunrise, sunset } = weatherObject.sys;
                     
                     // Set DOM Elements from weatherObject
                     tempDegree.textContent = temp;
                     tempDescription.textContent = firstCap(description);
                     locationTimeZone.textContent = `${weatherObject.name}/${country}`;
                     weatherIcon.innerHTML = `<img src="http://openweathermap.org/img/wn/${icon}@2x.png"/>`;
                 })
        });
    }

});

// Capitalize every first letter in a string 
firstCap = (str) => {
 return str.toString().replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + 
 txt.substr(1).toLowerCase();});
}