import axios from 'axios';
import 'babel-polyfill';
import co from 'co';

const geoLocation = () => new Promise((resolve) => {
  navigator.geolocation.getCurrentPosition((position) => {
    resolve(position);
  });
});

function* createGeoLocate() {
  const position = yield geoLocation();
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;
  const locationInfo = yield axios.get(`http://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&language=en`);
  const addressComponents = locationInfo.data.results[0].address_components;
  for (let i = 0, length = addressComponents.length; i < length; i += 1) {
    if (addressComponents[i].types.includes('administrative_area_level_1')) {
      return addressComponents[i].long_name;
    }
  }
  return null;
}

export default function getCity() {
  const geoLocate = co(createGeoLocate).catch(err => console.error(err));
  return geoLocate;
}
