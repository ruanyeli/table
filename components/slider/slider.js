import React, {Component} from 'react';
import RcSlider from 'rc-slider/lib/Slider';
import RcRange from 'rc-slider/lib/Range';
import RcHandle from 'rc-slider/lib/Handle';
import Tooltip from '../tooltip/index'
import s from './style/index';

const prefixCls = s.sliderPrefix;

class Slider extends Component {
  static defaultProps = {
    prefixCls,
    tooltipPrefixCls: 'td-tooltip',
    tipFormatter(value) {
      return value.toString();
    }
  }

  constructor(props) {
    super(props);
    this.state = {
      visibles: {}
    }
  }

  toggleTooltipVisible = (index, visible) => {
    this.setState(({ visibles }) => ({
      visibles: {
        ...visibles,
        [index]: visible
      }
    }));
  }

  handleWithTooltip = ({ value, dragging, index, ...restProps }) => {
    const { tooltipPrefixCls, tipFormatter } = this.props;
    const { visibles } = this.state;
    return (
      <Tooltip
        prefixCls={tooltipPrefixCls}
        title={tipFormatter ? tipFormatter(value) : ''}
        visible={tipFormatter && (visibles[index] || dragging)}
        placement="top"
        transitionName="zoom-down"
        key={index}
        content={value}
      >
        <RcHandle
          {...restProps}
          value={value}
          onMouseEnter={() => this.toggleTooltipVisible(index, true)}
          onMouseLeave={() => this.toggleTooltipVisible(index, false)}
        />
      </Tooltip>
    );
  }

  render() {
    const { range, ...restProps } = this.props;
    if (range) {
      return <RcRange {...restProps} handle={this.handleWithTooltip} />;
    }
    return <RcSlider {...restProps} handle={this.handleWithTooltip} />;
  }
}

export default Slider;
