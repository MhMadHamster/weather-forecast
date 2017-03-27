import React from 'react';
import { shallow } from 'enzyme';
import CityItem from '../../src/components/cityItem';

describe('cityItem component', () => {
  it('should render city item comonent with all props', () => {
    const props = {
      city: { name: 'Test city' },
      list: [
        {
          weather: [
            { description: 'test description',
              icon: '01d' },
          ],
          temp: { day: '0' },
        },
      ],
    };

    const cityItemComponent = shallow(<CityItem {...props} />);

    expect(cityItemComponent.find('h4').text()).toBe('Test city');
  });
});

