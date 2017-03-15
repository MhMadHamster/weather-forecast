import axios from 'axios';

export const fetchCity = (cityName = false, dayCnt = 1) => ({
  type: 'FETCH_CITY',
  payload: axios.get(`http://api.openweathermap.org/data/2.5/forecast/daily?appid=619cd4039c26e42174770ad2b8c5ab64&units=metric&q=${cityName}&cnt=${dayCnt}`),
});

export const removeCity = (cityId = null) => ({
  type: 'REMOVE_CITY',
  payload: cityId,
});

