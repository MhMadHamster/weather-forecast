import axios from 'axios';
import 'babel-polyfill';

const getLocate = () => {
  return new Promise((resolve) => {
    function* getCity() {
      const position = yield new Promise((reslv) => {
        navigator.geolocation.getCurrentPosition((pos) => {
          reslv(pos);
        });
      });
      const lat = position.coords.latitude;
      const lng = position.coords.longitude;
      const response = yield axios.get(`http://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&language=en`);
      const addressComponents = response.data.results[0].address_components;
      for (let i = 0, length = addressComponents.length; i < length; i += 1) {
        if (addressComponents[i].types.includes('administrative_area_level_1')) {
          return addressComponents[i].long_name;
        }
      }
      return null;
    }

    const locate = getCity();
    locate.next().value
      .then(res => locate.next(res).value)
      .then(res => locate.next(res).value)
      .then(res => resolve(res));
  });
};

export default getLocate;
