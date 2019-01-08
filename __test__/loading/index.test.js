import React from 'react';
import { mount } from 'enzyme';
import Loading from '../../components/loading';

// shallow, render,
const prefixLoad = 'y-loading';

describe('<Loading loading />', () => {
  it('should render to a loading', () => {
    const wrapper = mount(<Loading loading prefixLoad={prefixLoad} />);
    expect(wrapper.find('.y-loading-container')).toHaveLength(1);
    expect(wrapper.find('.y-loading-container-graph').children()).toHaveLength(8); // 8个div 组成 loading
  });
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
  });
});

describe('<Loading />childern props', () => {
  it('render loading with childern ', () => {
    const wrapper = mount(
      <Loading text="加载中" loading prefixLoad={prefixLoad}>
        <div>
          loading Content
        </div>
      </Loading>,
    );
    // expect(wrapper.find(`${prefixLoad}-content`).matchesElement(<div>loading Content</div>)).to.equal(true);
    expect(wrapper.html()).toContain('<div>loading Content</div>');
  });
});
