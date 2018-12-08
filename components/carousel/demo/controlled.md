---
order: 2
title:
  zh-CN: 受控组件
  en-US: basic usage
desc:
  zh-CN: 使用activeKey控制当前面板
  en-US: basic usage description
---

## zh-CN

使用activeKey控制当前面板

## en-US

The most basic usage

```jsx
import { Carousel } from 'td-ui';


class ControlledDemo extends React.Component {
  constructor () {
    super()
    this.state = {
      axis: 'x',
      loop: true,
      prevAndNext: true,
      activeKey: 1
    }
  }
  goTo = (index) => {
    this.setState({
      activeKey: index
    });
  }
  render () {
    return (
      <div className="carousel-container">
        <div className="header">
          <span className={'axis'}
            onClick={this.goTo.bind(this, 0)}>跳到第0张</span>
            <span className={'axis'}
              onClick={this.goTo.bind(this, 1)}>跳到第1张</span>
            <span className={'axis'}
              onClick={this.goTo.bind(this, 2)}>跳到第2张</span>
            <span className={'axis'}
              onClick={this.goTo.bind(this, 3)}>跳到第3张</span>
            <span className={'axis'}
              onClick={this.goTo.bind(this, 4)}>跳到第4张</span>
            <span className={'axis'}
              onClick={this.goTo.bind(this, 5)}>跳到第5张</span>
            <span className={'axis'} onClick={() => this.carouselInstance.pre()}>上一张</span>
            <span className={'axis'} onClick={() => this.carouselInstance.next()}>下一张</span>
        </div>
        <Carousel
          loop={this.state.loop}
          auto={false}
          axis={this.state.axis}
          prevAndNext={this.state.prevAndNext}
          activeKey={this.state.activeKey}
          instance={(instance) => this.carouselInstance = instance}
          onChange={(preKey, nextKey) => {
            console.log(preKey, nextKey);
          }}
        >
          <div className="frame" style={{backgroundColor: 'royalblue', height: '100%'}}>跑马灯 1</div>
          <div className="frame" style={{backgroundColor: 'orange', height: '100%'}}>跑马灯 2</div>
          <div className="frame" style={{backgroundColor: 'orchid', height: '100%'}}>跑马灯 3</div>
          <div className="frame" style={{backgroundColor: 'red', height: '100%'}}>跑马灯 4</div>
          <div className="frame" style={{backgroundColor: 'green', height: '100%'}}>跑马灯 5</div>
        </Carousel>
      </div>
    )
  }
}

ReactDOM.render(
  <ControlledDemo />
, mountNode);
```

```css
.frame {
  margin: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: default;
  color: white;
  text-transform: uppercase;
  -webkit-user-select: none;
  user-select: none;
  text-decoration: none;
}
.header {
  text-align: center;
  margin-bottom: 10px;
}
.axis {
  margin: 0 1em;
  opacity: 0.8;
  cursor: pointer;
  text-transform: uppercase;
}
.axis.current{
  opacity: 1;
  position: relative;
}
.axis.current:before{
  content: '•';
  position: absolute;
  left: -11px
}
```
