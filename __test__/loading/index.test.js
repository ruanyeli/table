import React from 'react';
import { shallow, render, mount } from 'enzyme';
import Loading from '../../components/loading';

const prefixLoad = 'y-loading';

describe('<Loading loading />', () => {
  it('should render to a loading', () => {
    const wrapper = mount(<Loading loading prefixLoad={prefixLoad} />);
    expect(wrapper.find('.y-loading-container')).toHaveLength(1);
    expect(wrapper.find('.y-loading-container-graph').children()).toHaveLength(8); // 8个div 组成 loading
  });
  /* it('should render to a loading icon', () => {
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
  }); */
});

describe('<Loading />loading props', () => {
  it('loading props should be useful ', () => {
    const loading = true;
    const wrapper = mount(<Loading loading={loading} prefixLoad={prefixLoad} />);
    expect(wrapper.prop('loading')).toStrictEqual(true);
    // console.error('loadingloadingloading', wrapper.prop('loading'));
    expect(wrapper.find('.y-loading-container')).toHaveLength(1);

    wrapper.setProps({ loading: !loading });
    expect(wrapper.prop('loading')).toStrictEqual(false);
    // console.error('loadingloadingloading', wrapper.prop('loading'));
    expect(wrapper.find('.y-loading-container')).toHaveLength(0);
  });
});

describe('<Loading />size props', () => {
  it('size props should be useful ', () => {
    const size = 'large';
    const wrapper = mount(<Loading size={size} loading prefixLoad={prefixLoad} />);
    expect(wrapper.prop('size')).toStrictEqual(size);
    expect(wrapper.find('.y-loading-container-graph').hasClass('loading-large')).toStrictEqual(true);

    wrapper.setProps({ size: 'small' });
    expect(wrapper.prop('size')).toStrictEqual('small');
    // console.error('loadingloadingloading', wrapper.prop('loading'));
    expect(wrapper.find('.y-loading-container-graph').hasClass('loading-small')).toStrictEqual(true);
  });
});

describe('<Loading />text props', () => {
  it('text props should be useful ', () => {
    const text = '加载中...';
    const wrapper = mount(<Loading text={text} loading prefixLoad={prefixLoad} />);
    expect(wrapper.prop('text')).toStrictEqual(text);
    expect(wrapper.find('.y-loading-container-graph').hasClass('loading-large')).toStrictEqual(true);
  });
});
