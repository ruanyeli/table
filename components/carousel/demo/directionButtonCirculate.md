---
order: 1
title:
  zh-CN: 方向按钮、循环
  en-US: basic usage
desc:
  zh-CN: 方向按钮的显示、是否循环、滚动方向
  en-US: basic usage description
---

## zh-CN

## en-US

The most basic usage

```jsx
import { Carousel } from 'td-ui';

class Demo extends React.Component {
  constructor () {
    super()
    this.state = {
      axis: 'x',
      loop: true,
      prevAndNext: true
    }
  }
  setAxis (axis) {
    return () => this.setState({axis: axis})
  }
  setLoop (loop) {
    return () => this.setState({loop: loop})
  }
  setPrevAndNext (prevAndNext) {
    return () => this.setState({prevAndNext: prevAndNext})
  }
  render () {
    return (
      <div className="carousel-container">
        <div className="header">
          <span className={this.state.axis === 'x' ? 'axis current' : 'axis'}
            onClick={this.setAxis('x')}>水平</span>
          <span className={this.state.axis === 'y' ? 'axis current' : 'axis'}
            onClick={this.setAxis('y')}>垂直</span>
          <span className={this.state.loop ? 'axis current' : 'axis'}
            onClick={this.setLoop(true)}>循环</span>
          <span className={this.state.loop ? 'axis' : 'axis current'}
            onClick={this.setLoop(false)}>不循环</span>
          <span className={this.state.prevAndNext ? 'axis current' : 'axis'}
            onClick={this.setPrevAndNext(true)}>显示上下按钮</span>
          <span className={this.state.prevAndNext ? 'axis' : 'axis current'}
            onClick={this.setPrevAndNext(false)}>不显示上下按钮</span>
        </div>
        <Carousel loop={this.state.loop} auto={false} axis={this.state.axis} prevAndNext={this.state.prevAndNext}>
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

ReactDOM.render(<Demo />, mountNode);
```

```css
.carousel-container{
  width: 100%;
  height: 200px;
}
```
<style>
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
</style>
