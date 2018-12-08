import React from 'react';
import PropTypes from 'prop-types';
import s from './style';
const prefixCls = s.watermarkPrefix;

class Watermark extends React.Component {
  static defaultProps = {
    prefixCls,
    style: {},
    text: '',
    color: '#eee',
    font: "italic 14px 'Microsoft YaHei'",
    rotate: -20,
    width: 200,
    height: 150,
    className: '',
    size: [],
    type: 'foreground', // or background
  }

  static propTypes = {
    text: PropTypes.string,
    color: PropTypes.string,
    font: PropTypes.string,
    rotate: PropTypes.number,
    width: PropTypes.number,
    height: PropTypes.number
  }

  constructor(props) {
    super(props);
    this.state = {
      bgImg: ''
    }
    setTimeout(() => {
      this.createImg(props);
    }, 1);
  }

  componentWillReceiveProps(nextProps) {
    this.createImg(nextProps);
  }

  createImg(props) {
    const { width, height, text, font, color, rotate, img } = props;
    if (text || img) {
      const canvas = document.createElement('canvas');
      canvas.setAttribute('width', width);
      canvas.setAttribute('height', height);
      const context = canvas.getContext('2d');
      context.rotate(rotate * Math.PI / 180);
      if (text) {
        context.textAlign = 'center';
        context.font = font;
        context.fillStyle = color;
        context.fillText(text, width / 2, height / 2);
        this.setState({
          bgImg: canvas.toDataURL()
        });
      } else {
        var image = new Image();
        image.setAttribute("crossOrigin", 'Anonymous')
        image.onload = () => {
          context.drawImage(image, (width - image.width) / 2, (height - image.height) / 2);
          this.setState({
            bgImg: canvas.toDataURL()
          });
        }
        image.src = img;
      }
    }
  }

  renderBackground() {
    const { prefixCls, children, style, className, watermarkStyle, size = [] } = this.props;
    const { bgImg } = this.state;
    const innerStyle = Object.assign({}, style, watermarkStyle);
    if (bgImg) {
      innerStyle.backgroundImage = `url(${bgImg})`
    }
    return (
      <div className={`${prefixCls} ${className}`} style={innerStyle} >
        {children}
      </div>
    )
  }

  renderForeground() {
    const { prefixCls, children, style, className, watermarkStyle, size = [] } = this.props;
    const { bgImg } = this.state;
    const innerStyle = Object.assign({ left: 0, top: 0, width: '100%', height: '100%', position: 'absolute' }, watermarkStyle);
    if (bgImg) {
      innerStyle.backgroundImage = `url(${bgImg})`
    }
    return (
      <div style={Object.assign({
        position: 'relative',
        width: size[0] || '100%',
        height: size[1] || '100%',
      }, style)}>
        {children}
        <div className={`${prefixCls} ${className}`} style={innerStyle} />
      </div>
    )
  }

  render() {
    return this.props.type === 'foreground' ? this.renderForeground() : this.renderBackground();
  }
}

export default Watermark;
