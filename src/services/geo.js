import axios from 'axios';

export default function geoLocate() {
  return new Promise((resolve, reject) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;

        axios.get(`http://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&language=en`)
          .then(response => response.json())
          .then((location) => {
            const addressComponents = location.results[0].address_components;
            for (let i = 0, length = addressComponents.length; i < length; i += 1) {
              if (addressComponents[i].types.includes("administrative_area_level_1")) {
                resolve(addressComponents[i].long_name);
              }
            }
            resolve(false);
          });
      }, (error) => {
        reject(error);
      });
    } else resolve(false);
  });
}
