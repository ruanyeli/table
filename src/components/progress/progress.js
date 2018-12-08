/**
 * @Author: Yingxi.Hao <yzf>
 * @Date:   2017-06-20
 * @Last modified by:   hyx
 * @Last modified time: 2017-06-23
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import ClassNames from 'classnames';
import s from './style';
import Icon from '../icon';

const icons = {
  default: {
    success: {
      icon: 'check-circle',      
    },
    warning: {
      icon: 'exclamation-circle'
    },
    exception: {
      icon: 'cross-circle'
    }
  },
  circle: {
    success: {
      icon: 'check',      
    },
    warning: {
      icon: 'exclamation'
    },
    exception: {
      icon: 'cross'
    }
  }
  
}
export default class Progress extends Component {
  static propTypes = {
    // 目的是引入最开始的类名，比如td-progress,需要去default.less配置去
    prefixCls: PropTypes.string,
    // 哪种类型
    type: PropTypes.oneOf(['line', 'stripe', 'circle']),
    targetType: PropTypes.oneOf(['line', 'stripe', 'circle']),
    // 是否有动画
    active: PropTypes.bool,
    // 自定义宽度,line,stripe:width,circle:width,height
    width: PropTypes.number,
    showInfo: PropTypes.bool,
    showPercent: PropTypes.bool,
    // 百分比
    percent: PropTypes.number,
    // 普通的class
    className: PropTypes.string,
    // success,exception,active,normal(可不传)
    status: PropTypes.oneOf(['success', 'exception', 'warning']),
    targetStatus: PropTypes.oneOf(['success', 'exception', 'warning']),
    targetPercent: PropTypes.number
  };
  static defaultProps = {
    prefixCls: s.progressPrefix,
    type: 'line',
    targetType: 'line',
    height: 8,
    showInfo: true,
    showPercent: true
  };
  render () {
    const {prefixCls, type, status, width, percent, className, height, targetStatus, targetPercent, targetType, showInfo, showPercent, ...restProps} = this.props;
    let progressInfo;
    let progress;
    let text;
    let targetInner;
    let progressStatus = status || 'normal';
    let currentPercent = percent || 0;
    if (currentPercent >= 100) {
      // progressStatus = 'success';
      currentPercent = 100;
    } else if (currentPercent < 0) {
      currentPercent = 0;
    }
    
    let currentWidth = 280;
    if (width) {
      if (width >= 180) {
        currentWidth = width;
      } else {
        currentWidth = 180;
      }
    }
    const cn = ClassNames({
      [`${prefixCls}-target-inner`]: true,
      [`${prefixCls}-target-inner-${targetStatus}-${targetType}`]: targetStatus,
      [`${prefixCls}-target-inner-${targetType}`]: targetType === 'stripe'

    })
    const targetLineStyle = {
      width: `${targetPercent}%`,
      height: height,
      borderRadius: height / 2
    }
    const targetStripeStyle = {
      width: `${targetPercent}%`,
      height: height,
      borderRadius: height / 2
    }
    targetInner = <div className={cn} style={targetType === 'stripe' ? targetStripeStyle : targetLineStyle}></div>;
    
    const iconStyle = {
      fontSize: height < 14 ? 14 : height,
      marginTop: height < 14 ? -7 : -height/2
    }
    switch (progressStatus) {
      case 'success':
        text = <Icon type="check-circle" style={iconStyle}></Icon>;
        if (type === 'circle') {
          text = <Icon type="check"></Icon>;
        }
        currentPercent = 100;
        break;
      case 'exception':
        text = <Icon type="cross-circle" style={iconStyle}></Icon>
        if (type === 'circle') {
          text = <Icon type="cross"></Icon>
        }
        break;
      case 'warning':
        text = <Icon type='exclamation-circle' style={iconStyle}></Icon>
        if (type === 'circle') {
          text = <Icon type='exclamation' />
        }
        break;
      default:
      text = currentPercent >= 100 ? (type === 'circle' ? <Icon type="check" /> : <Icon type="check-circle" style={iconStyle}/>) : `${currentPercent}%`;    
    }
    
    const textStyle = {
      paddingRight: status ? (height < 14 ? 20 : height + 5) : 0
    }
    progressInfo = <span className={`${prefixCls}-text`} style={textStyle}><span>{(showInfo && status && showPercent && currentPercent < 100) ? `${currentPercent}%` : ''}</span>{showInfo && text}</span>;
    if (type === 'line') {
      const lineOuterStyle = {
        width: currentWidth,
        height: height,
        borderRadius: height / 2
      };
      const lineStyle = {
        width: `${currentPercent}%`,
        height: height,
        borderRadius: height / 2
      };
      

      progress = (
        <div className={`${prefixCls}-wrapper`}>
          
          <div className={`${prefixCls}-outer`} style={lineOuterStyle}>
            {
              !!(targetStatus || targetPercent !== undefined) && targetInner
            }
            <div className={`${prefixCls}-inner`} style={lineStyle}>           
            </div>
            
          </div>
          {progressInfo}
        </div>
      );
    } else if (type === 'stripe') {
      const stripeOuterStyle = {
        width: currentWidth,
        height: height,
        borderRadius: height / 2
      };
      const stripeStyle = {
        width: `${currentPercent}%`,
        height: height,
        borderRadius: height / 2
      };
      
      progress = (
        <div className={`${prefixCls}-wrapper`}>
          <div className={`${prefixCls}-outer`} style={stripeOuterStyle}>
            {
              !!(targetStatus || targetPercent !== undefined) && targetInner
            }
            <div className={`${prefixCls}-inner-stripe`} style={stripeStyle}>
            </div>
          </div>
          {progressInfo}
        </div>
      );
    } else if (type === 'circle') {
      let circleSize = 120;
      if (width) {
        if (width >= 80) {
          circleSize = width;
        } else {
          circleSize = 80;
        }
      }
      let halfCircleSize = circleSize / 2;
      let rotateDeg = (18 / 5) * currentPercent;
      let outerCircleStyle = {
        width: circleSize,
        height: circleSize
      };
      let innerCircleStyle = {
        width: circleSize,
        height: circleSize,
        borderWidth: height
      };
      let percentCircleStyle = {
        width: circleSize,
        height: circleSize,
        clip: `rect(0,${circleSize}px,${circleSize}px,${halfCircleSize}px)`
      };
      let leftCircleStyle = {
        width: circleSize,
        height: circleSize,
        transform: `rotate(${rotateDeg}deg)`,
        clip: `rect(0,${halfCircleSize}px,${circleSize}px,0)`,
        borderWidth: height
      };
      let rightCircleStyle = {
        width: circleSize,
        height: circleSize,
        clip: `rect(0,${circleSize}px,${circleSize}px,${halfCircleSize}px)`,
        borderWidth: height
      };
      let textCircleStyle = {
        width: circleSize,
        height: circleSize,
        lineHeight: `${circleSize}px`,
        fontSize: circleSize * 0.16 + 5
      };
      if (currentPercent > 50) {
        rightCircleStyle = Object.assign(rightCircleStyle, {
          display: 'block'
        });
        percentCircleStyle = Object.assign(percentCircleStyle, {
          clip: 'rect(auto,auto,auto,auto)'
        });
      }
      progress = (
        <div className={`${prefixCls}-wrapper`}>
          <div className={`${prefixCls}-circle-outer`} style={outerCircleStyle}>
            <div className={`${prefixCls}-circle-inner`} style={innerCircleStyle}>
              <div className={`${prefixCls}-circle-percent`} style={percentCircleStyle}>
                <div className={`${prefixCls}-circle-left`} style={leftCircleStyle}></div>
                <div className={`${prefixCls}-circle-right`} style={rightCircleStyle}></div>
              </div>
            </div>
            {
              targetStatus || targetPercent !== undefined ? <div className={`${prefixCls}-circle-inner ${prefixCls}-circle-target-inner`} style={innerCircleStyle}>
              <div className={`${prefixCls}-circle-percent ${prefixCls}-circle-target-percent`} style={percentCircleStyle}>
                <div className={`${prefixCls}-circle-left ${prefixCls}-circle-target-left`} style={leftCircleStyle}></div>
                <div className={`${prefixCls}-circle-right ${prefixCls}-circle-target-right`} style={rightCircleStyle}></div>
              </div>
            </div> : null
            }
            <div className={`${prefixCls}-circle-text`} style={textCircleStyle}>{text}</div>
          </div>
        </div>
      );
    }
    const classString = ClassNames(prefixCls, {
      [`${prefixCls}-${type}`]: true,
      [`${prefixCls}-status-${progressStatus}`]: true
    }, className);
    return (
      <div {...restProps} className={classString}>
        {progress}
      </div>
    )
  }
}
