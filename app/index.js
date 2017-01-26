import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { geoLocate, getWeather } from './utils.js';

import base from './styles/base.css';
import styles from './styles/styles.css';

const initialStore = {
  arrCities: []
}

const reducer = (state = initialStore, action) => {
  let newState = {};
  switch (action.type) {
    case 'ADD_CITY':
      newState = {
        ...state,
        arrCities: [...state.arrCities, action.city]
      };
      localStorage.setItem('weather', JSON.stringify(newState));
      return newState;
    case 'REMOVE_CITY':
      newState = state;
      newState.arrCities.splice(action.id, 1);
      localStorage.setItem('weather', JSON.stringify(newState))
      return newState;
    case 'LOAD_LIST':
      return action.list;
    default:
      return state;
  }
}

const store = createStore(reducer);

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: ''
        }
    }
    componentDidMount() {
      let weatherList = {
        arrCities: []
      };
      if (localStorage.weather) weatherList = JSON.parse(localStorage.getItem('weather'));
      if (weatherList.arrCities.length > 0) {
        store.dispatch({
          type: 'LOAD_LIST',
          list: weatherList
        })
      } else {
        geoLocate()
          .then(getWeather)
          .then((result) => {
            store.dispatch({
              type: 'ADD_CITY',
              city: result
            });
          });
      }
    }
    changeHandler(event) {
      this.setState({
          value: event.target.value
      })
    }
    onSend() {
      getWeather(this.state.value).then((result) => {
        store.dispatch({
          type: 'ADD_CITY',
          city: result
        });
      });
    }
    onRemove(i) {
      store.dispatch({
        type: 'REMOVE_CITY',
        id: i
      });
    }
    render() {
        return (
            <div>
              <div className={styles.searchWrapper}>
                <input
                    type="text"
                    value={this.state.value}
                    onChange={this.changeHandler.bind(this)}
                    placeholder="Add new city"
                />
                <button onClick={this.onSend.bind(this)}>Add new city</button>
              </div>
              <div className={styles.cityList}>
                {this.props.arrCities.map((city, i) => {
                  return <div className={styles.city} key={i}>
                    <div>
                      <h4>{city.city}</h4>
                      <div className={styles.weatherWrapper}>
                        {city.weather.list.map((day, i) => {
                          return <ul className={styles.dayWeather} key={i}>
                            <li className="weather">{day.weather[0].main}</li>
                            <li className={styles.weatherDesc}>Weather: {day.weather[0].description}, <img src={`http://openweathermap.org/img/w/${day.weather[0].icon}.png`} /></li>
                            <li className="temperature">Temperature: {day.temp.day}</li>
                            <li className="clouds">Clouds: {day.clouds}%</li>
                            <li className="wind">Wind: {day.speed}m/s</li>
                          </ul>
                        })}
                      </div>
                    </div>
                    <a href="#" onClick={this.onRemove.bind(this, i)} className={styles.removeBtn}>REMOVE</a>
                  </div>
                })}
              </div>
            </div>
        );
    }
}

const render = () => {
  ReactDOM.render(
    <App
      {...store.getState()}
    />,
    document.getElementById('app')
  );
}

store.subscribe(render);
render();
