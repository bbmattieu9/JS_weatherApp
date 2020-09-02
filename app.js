// import api file here

window.addEventListener('load', () => {
    let long;
    let lat;

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            console.log('[See position Object]', position);

            long = position.coords.longitude;
            lat = position.coords.latitude;
        });
    } 
});