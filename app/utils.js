function geoLocate() {
  return new Promise((resolve, reject) => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          let lat = position.coords.latitude;
          let lng = position.coords.longitude;

          fetch(`http://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&language=en`)
            .then((response) => response.json())
            .then((location) => {
                let addressComponents = location['results'][0]['address_components'];
                for (let i = 0; i < addressComponents.length; i++) {
                    if (addressComponents[i]['types'].includes('administrative_area_level_1')) {
                        resolve(addressComponents[i]['long_name']);
                    }
                }
                resolve(false);
            });
        }, (error) => {
          console.error(error);
        });
    } else resolve(false);
  });
}

function getWeather(city = false, dayCnt = 1) {
  if (!city) return;
  return new Promise((resolve, reject) => {
    fetch(`http://api.openweathermap.org/data/2.5/forecast/daily?appid=619cd4039c26e42174770ad2b8c5ab64&units=metric&q=${city}&cnt=${dayCnt}`)
      .then((response) => response.json())
      .then(function(weather) {
        if (weather.cod !== "200") throw Error(weather.message);
        resolve({
          city,
          dayCnt,
          weather
        });
      })
      .catch((response) => console.log(response.message));
    });
}

export { geoLocate, getWeather };
