import React, { Component } from 'react';
import cn from 'classnames';
import s from './style/index';

export default class Loading extends Component {
  static defaultProps = { // 设置默认参数
    prefixLoad: s.loadingPrefix,
    loading: true,
    size: 'default',
  };

  render() {
    const { prefixLoad, text, size, loading, className, style } = this.props;
    // let classTmp = prefixLoad + '-container-graph';
    const classTmp = `${prefixLoad}-container-graph`;
    const classNameValue = cn(
      classTmp,
      {
        [`loading-${size}`]: size !== 'default', // 当size！=default的时候设置类名
      },
      {
        [`${classTmp}-show-text`]: !!text,
      },
    );

    const textClassName = cn(
      `${prefixLoad}-container-text`,
      {
        [`${prefixLoad}-container-text-${size}`]: size !== 'default',
      },
    );
    return (
        <div style={{ position: 'relative' }}>
          {
            loading ? (
              <div className={prefixLoad}>
                <div className={`${prefixLoad}-container`}>
                  <div className={classNameValue}>
                    <div />
                    <div />
                    <div />
                    <div />
                    <div />
                    <div />
                    <div />
                    <div />
                  </div>
                  <div className={textClassName}>
                    {text}
                  </div>
                </div>
              </div>
            ) : ''
          }
          <div className={`${prefixLoad}-content`} style={{ opacity: loading ? 0.7 : 1, filter: loading ? 'blur(1px)' : '' }}>
            {
              React.Children.map(
                this.props.children, 
                child => (
                  <div className={className} style={style}>
                    {child}
                  </div>
                ),
              )
            }
          </div>
        </div>
    );
  }
}
