/**
 * @Author: Zhengfeng.Yao <yzf>
 * @Date:   2017-06-27 20:16:13
 * @Last modified by:   yzf
 * @Last modified time: 2017-06-28 09:49:57
 */

import React from 'react';
import classNames from 'classnames';
import moment from 'moment';
import Picker from './picker';
import RangeCalendar from './range-calendar';
import Icon from '../icon';
import s from './style';
import LocaleReceiver from '../locale-provider/LocaleReceiver';

function getShowDateFromValue(value) {
  const [start, end] = value;
  if (!start && !end) {
    return;
  }
  const newEnd = end && end.isSame(start, 'month') ? end.clone().add(1, 'month') : end;
  return [start, newEnd];
}

function formatValue(value, format) {
  return (value && value.format(format)) || '';
}

function pickerValueAdapter(value) {
  if (!value) {
    return;
  }
  if (Array.isArray(value)) {
    return value;
  }
  return [value, value.clone().add(1, 'month')];
}

export default class RangePicker extends React.Component {
  static defaultProps = {
    prefixCls: s.rangePickerPrefix,
    format: 'YYYY-MM-DD HH:mm:ss',
    allowClear: true
  };

  constructor(props) {
    super(props);
    const value = props.value || props.defaultValue || [];
    if (
      value[0] && !moment.isMoment(value[0]) ||
      value[1] && !moment.isMoment(value[1])
    ) {
      throw new Error('The value/defaultValue of RangePicker must be a moment object array');
    }
    this.state = {
      value,
      open: props.open,
      hoverValue: []
    };
  }

  componentWillReceiveProps(nextProps) {
    if ('value' in nextProps) {
      const value = nextProps.value || [];
      this.setState({ value, showDate: getShowDateFromValue(value) });
    }
    if ('open' in nextProps) {
      this.setState({
        open: nextProps.open
      });
    }
  }

  clearSelection = e => {
    e.preventDefault();
    e.stopPropagation();
    this.setState({ value: [] });
    this.handleChange([]);
  };

  clearHoverValue = () => this.setState({ hoverValue: [] });

  handleStateChange = value => {
    this.setState({ value, showDate: getShowDateFromValue(value) })
  }

  handleChange = value => {
    const props = this.props;
    // if (!('value' in props)) {
    //   this.setState({value, showDate: getShowDateFromValue(value)})
    // }
    if ('onChange' in props) {
      props.onChange(value, [
        formatValue(value[0], props.format),
        formatValue(value[1], props.format)
      ]);
    }
  };

  handleOpenChange = open => {
    this.setState({ open });
    const { onOpenChange } = this.props;
    if (onOpenChange) {
      onOpenChange(open);
    }
  };

  handleShowDateChange = showDate => this.setState({ showDate });

  handleHoverChange = hoverValue => this.setState({ hoverValue });

  setValue(value) {
    this.handleStateChange(value);
    if (!this.props.showTime) {
      this.handleOpenChange(false);
    }
  }

  getSize = () => {
    let { size } = this.props;
    const sizeMap = {
      small: 'sm',
      large: 'lg'
    }
    return sizeMap[size];
  }

  render() {
    const { state, props } = this;
    const { value, showDate, hoverValue, open } = state;
    const {
      prefixCls, style, disabledDate,
      showTime, format, startPlaceholder,
      endPlaceholder, disabled, allowClear, renderExtraFooter
    } = props;
    const size = this.getSize();
    const calendarClassName = classNames({
      [`${prefixCls}-time`]: showTime
    });
    const calendar = (
      <RangeCalendar
        renderExtraFooter={renderExtraFooter}
        onSelect={this.handleStateChange}
        format={format}
        prefixCls={`${prefixCls}-calendar`}
        className={calendarClassName}
        showTime={showTime}
        inputPlaceholder={[startPlaceholder, endPlaceholder]}
        value={value}
        showDate={showDate || pickerValueAdapter(props.defaultPickerValue) || pickerValueAdapter(moment())}
        onValueChange={this.handleShowDateChange}
        hoverValue={hoverValue}
        onHoverChange={this.handleHoverChange}
        disabledDate={disabledDate}
      />
    );
    const input = ({ value: inputValue }) => {
      const start = inputValue[0];
      const end = inputValue[1];
      return <span className={`${prefixCls}-input`} disabled={disabled}>
        <LocaleReceiver componentName="DatePicker">
          {
            local => <span>
              <input
                disabled={disabled}
                readOnly
                value={start && start.format(format) || ''}
                placeholder={startPlaceholder || local.startTimePlaceholder}
                className={`${prefixCls}-input-item`}
              />
              <span className={`${prefixCls}-input-separator`}> ~ </span>
              <input
                disabled={disabled}
                readOnly
                value={end && end.format(format) || ''}
                placeholder={endPlaceholder || local.endTimePlaceholder}
                className={`${prefixCls}-input-item`}
              />
              <span className={classNames(`${prefixCls}-input-suffix`, {
                [`${prefixCls}-input-allow-clear`]: !disabled && allowClear && value && (value[0] || value[1])
              })}>
                <span className={`${prefixCls}-input-suffix-icon`}>
                  <Icon type="calendar" />
                </span>
                <span className={`${prefixCls}-input-suffix-clear`}>
                  <Icon type="cross-circle" className={`${prefixCls}-clear`} onClick={this.clearSelection} />
                </span>
              </span>
            </span>
          }
        </LocaleReceiver>
      </span>
    };

    return (
      <span className={classNames(`${prefixCls}`, {
        [`${prefixCls}-${size}`]: size
      })} style={Object.assign({}, style)}>
        <Picker
          value={value}
          transitionName="slide-up"
          prefixCls={`${prefixCls}-container`}
          calendar={calendar}
          onChange={this.handleChange}
          open={open}
          onOpenChange={this.handleOpenChange}
          disabled={disabled}
        >
          {input}
        </Picker>
      </span>
    );
  }
}
