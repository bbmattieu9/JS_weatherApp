// import api file here

if ('serviceWorker' in navigator) {
    console.log('[Service worker is supported!]');  
}

// When the page loads
window.addEventListener('load', () => {

    let tempDescription = document.querySelector('.temperature-description');
    let tempDegree = document.querySelector('.temperature-degree');
    let locationTimeZone = document.querySelector('.location-timezone');
    let weatherIcon = document.querySelector('.weather-icon');
    let temperatureSection = document.querySelector('.temperature');
    const temperatureSpan = document.querySelector('.temperature span');

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {

            // destructure props from the geolocation object
            let { longitude, latitude } = position.coords;

            // construct openWeatherApi url with long & lat from geolocation
            const openWeatherApiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&APPID=1c831533900bcb8bf3edd9b4d16cfc69&units=metric`;

            // make http request to OpenWeatherApi with fetch()
            fetch(openWeatherApiUrl)
                .then(response => {
                    return response.json();
                })
                .then(weatherObject => {

                    // Destructure the properties in the weatherObject
                    const { feels_like, humidity, pressure, temp, temp_max, temp_min } = weatherObject.main;
                    const { description, icon, main } = weatherObject.weather[0];
                    const { country, sunrise, sunset } = weatherObject.sys;

                    // Set DOM Elements from weatherObject
                    tempDegree.textContent = temp;
                    tempDescription.textContent = firstCap(description);
                    locationTimeZone.textContent = `${weatherObject.name}/${country}`;
                    weatherIcon.innerHTML = `<img src="http://openweathermap.org/img/wn/${icon}@2x.png"/>`;

                    // Convert from Celcius to Farenheit
                    let celsius = (temp - 32) * (5 / 9);

                    // change temperature to Celsius/Farenheit
                    temperatureSection.addEventListener('click', () => {
                        if (temperatureSpan.innerHTML === `<sup>o</sup>F`) {
                            temperatureSpan.innerHTML = `<sup>o</sup>C`;
                            tempDegree.textContent = Math.floor(celsius);
                        } else {
                            temperatureSpan.innerHTML = `<sup>o</sup>F`;
                            tempDegree.textContent = temp;
                        }
                    })
                })
        });
    }

});

// Capitalize every first letter in a string 
firstCap = (str) => {
    return str.toString().replace(/\w\S*/g, function (txt) {
        return txt.charAt(0).toUpperCase() +
            txt.substr(1).toLowerCase();
    });
}