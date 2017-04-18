import React, { Component } from 'react';
import Button from './button';
import CityItem from './cityItem';
import getCity from '../services/geo';
import '../../styles/city.scss';

class City extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
    };

    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    getCity().then((res) => {
      if (res) {
        this.setState({
          value: res,
        });
      }
    });
  }

  handleChange(event) {
    this.setState({
      value: event.target.value,
    });
  }

  render() {
    const { data, fetchCity, removeCity } = this.props;

    return (
      <div>
        <div className="input-wrapper">
          <input
            type="text"
            value={this.state.value}
            onChange={this.handleChange}
          />
          <Button
            onClick={() => fetchCity(this.state.value)}
            text={'Add city'}
          />
        </div>
        {this.props.data.loading ? <div>City weather loading...</div> : ''}
        <div>
          {data.arrCities.valueSeq().map(item => (
            <div key={item.city.id} className="city-item">
              <CityItem
                {...item}
              />
              <Button
                onClick={() => removeCity(item.city.id)}
                text={'Remove city'}
              />
            </div>
          ))}
        </div>
      </div>
    );
  }
}

City.propTypes = {
  data: React.PropTypes.shape({
    arrCities: React.PropTypes.Map,
    loading: React.PropTypes.bool,
  }).isRequired,
  fetchCity: React.PropTypes.func.isRequired,
  removeCity: React.PropTypes.func.isRequired,
};

export default City;
