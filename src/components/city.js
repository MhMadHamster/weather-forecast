import React, { Component } from 'react';
import Button from './button';
import CityItem from './cityItem';
import test from '../services/geo';

class City extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
    };

    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    test().then((res) => {
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
        <div>
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
          {data.arrCities.map((city, i) => (
            <div key={i}>
              <CityItem
                {...city}
              />
              <Button
                onClick={() => removeCity(i)}
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
  data: React.propTypes.shape({
    arrCities: React.propTypes.array,
    loading: React.propTypes.bool,
  }).isRequired,
  fetchCity: React.propTypes.func.isRequired,
  removeCity: React.propTypes.func.isRequired,
};

export default City;
