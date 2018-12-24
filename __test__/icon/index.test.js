import React from 'react';
import Icon from '../../src/component';
import { shallow, render, mount } from 'enzyme';

describe('<Icon />', () => {
  it('should render to a icon', () => {
    const wrapper = shallow(
      <Icon type="loading" />
    );
    expect(wrapper).hasClass('y-icon-loading');
  });
});