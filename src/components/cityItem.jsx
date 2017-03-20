import React from 'react';
import '../../styles/cityItem.scss';

const CityItem = props => (
  <div>
    <h4>{props.city.name}</h4>
    <ul>
      <li><b>Weather:</b> {props.list[0].weather[0].description} <img src={`http://openweathermap.org/img/w/${props.list[0].weather[0].icon}.png`} /></li>
      <li><b>Avg. day temperature:</b> {props.list[0].temp.day}°C</li>
    </ul>
  </div>
);

export default CityItem;
