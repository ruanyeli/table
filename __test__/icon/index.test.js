import React from 'react';
import { shallow, render, mount } from 'enzyme';
import { Icon } from '../../components';

describe('<Icon />', () => {
  it('should render to a loading icon', () => {
    const wrapper = mount(<Icon type="loading" />);
    expect(wrapper.find('i')).toHaveLength(1);

    expect(wrapper.find('.y-icon')).toHaveLength(1);
    expect(wrapper.find('.y-icon-loading')).toHaveLength(1);
  });

  it('loading icon should match snapshot', () => {
    const wrapper = render(<Icon type="loading" />);
    expect(wrapper).toMatchSnapshot();
  });

  it('style props should be used', () => {
    const wrapper = shallow(<Icon type="clock" style={{ fontSize: '16px', color: 'red' }} />);
    // console.log('style', wrapper.debug(), typeof wrapper.props().style.color);
    expect(wrapper.prop('style').color).toEqual('red');
    expect(wrapper.prop('style')).toEqual({ fontSize: '16px', color: 'red' });
    expect(wrapper).toMatchSnapshot();
  });

  it('classnames props should be used', () => {
    const wrapper = shallow(<Icon type="clock" className="icon" />);
    expect(wrapper.hasClass('icon')).toBeTruthy();
    expect(wrapper).toMatchSnapshot();
  });
});
