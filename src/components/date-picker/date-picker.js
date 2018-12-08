/**
 * @Author: Zhengfeng.Yao <yzf>
 * @Date:   2017-06-22 11:56:15
 * @Last modified by:   yzf
 * @Last modified time: 2017-06-22 11:56:16
 */

import React from 'react';
import classNames from 'classnames';
import omit from 'lodash/omit';
import moment from 'moment';
import Picker from './picker';
import Input from '../input';
import Icon from '../icon';
import Calendar from './calendar';
import LocaleReceiver from '../locale-provider/LocaleReceiver';
import s from './style';

export default class DatePicker extends React.Component {
  static defaultProps = {
    prefixCls: s.datePickerPrefix,
    format: 'YYYY-MM-DD HH:mm:ss',
    allowClear: true
  };

  constructor(props) {
    super(props);
    const value = props.value || props.defaultValue;
    if (value && !moment.isMoment(value)) {
      throw new Error('The value/defaultValue of DatePicker or MonthPicker must be a moment object');
    }
    this.state = {
      value
    };
  }

  componentWillReceiveProps(nextProps) {
    if ('value' in nextProps) {
      this.setState({
        value: nextProps.value
      });
    }
  }

  handleChange = (value) => {
    const props = this.props;
    if (!('value' in props)) {
      this.setState({ value });
    }
    if ('onChange' in props) {
      props.onChange(value, (value && value.format(props.format)) || '');
    }
  }

  clearSelection = (e) => {
    if (this.props.allowClear) {
      e.preventDefault();
      e.stopPropagation();
      this.handleChange(null);
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
    const { value } = this.state;
    const props = omit(this.props, ['onChange']);
    const { prefixCls, format, placeholder, allowClear, disabled, onlyIcon, renderExtraFooter } = props;
    const calendar = (
      <Calendar
        renderExtraFooter={renderExtraFooter}
        prefixCls={`${prefixCls}-calendar`}
        onSelect={this.handleChange}
        format={format}
        disabledDate={props.disabledDate}
        defaultValue={props.defaultPickerValue || moment()}
        showFooter={true}
      />
    );
    const size = this.getSize();
    const input = ({ value: inputValue }) => <div style={{ position: 'relative' }}>
      <LocaleReceiver componentName="DatePicker">
        {
          local => <span>
            <Input
              size={props.size}
              readOnly
              disabled={disabled}
              value={(inputValue && inputValue.format(format)) || ''}
              placeholder={placeholder || local.placeholder}
              className={`${prefixCls}-input`}
            // suffix={icon}
            />
            <span className={classNames(`${prefixCls}-suffix`, {
              [`${prefixCls}-allow-clear`]: allowClear && !disabled && value
            })}>
              <span className={`${prefixCls}-suffix-icon`}>
                <Icon type="calendar" />
              </span>
              <span className={`${prefixCls}-suffix-clear`}>
                <Icon
                  type="cross-circle"
                  className={`${prefixCls}-clear`}
                  onClick={this.clearSelection}
                />
              </span>
            </span>
          </span>
        }
      </LocaleReceiver>
    </div>




    return (
      <span className={classNames(`${prefixCls}`, {
        [`${prefixCls}-${size}`]: size
      })}>
        <Picker
          value={value}
          transitionName="slide-up"
          prefixCls={`${prefixCls}-container`}
          calendar={calendar}
          onChange={this.handleChange}
          disabled={disabled}
        >
          {!onlyIcon ? input : (onlyIcon === true ? () => <Icon type="calendar" style={{ cursor: disabled ? 'not-allowed' : 'pointer' }} /> : onlyIcon)}
        </Picker>
      </span>
    );
  }
}
