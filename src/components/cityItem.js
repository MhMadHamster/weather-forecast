import React from 'react';

const CityItem = props => (
  <div>
    <h4>{props.city.name}</h4>
    <ul>
      <li>{props.list[0].weather[0].description}</li>
      <li><img src={`http://openweathermap.org/img/w/${props.list[0].weather[0].icon}.png`} /></li>
      <li>{props.list[0].temp.day}</li>
    </ul>
  </div>
);

export default CityItem;
