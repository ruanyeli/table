---
order: 0
title:
  zh-CN: 基本用法
  en-US: basic usage
desc:
  zh-CN: 跑马灯的基本用法
  en-US: basic usage description
---

## zh-CN

## en-US

The most basic usage

```jsx
import { Carousel } from 'td-ui';

ReactDOM.render(
  <div className="carousel-container">
    <Carousel>
      <div className="frame" style={{backgroundColor: 'royalblue', height: '100%'}}>跑马灯 1</div>
      <div className="frame" style={{backgroundColor: 'orange', height: '100%'}}>跑马灯 2</div>
      <div className="frame" style={{backgroundColor: 'orchid', height: '100%'}}>跑马灯 3</div>
      <div className="frame" style={{backgroundColor: 'red', height: '100%'}}>跑马灯 4</div>
      <div className="frame" style={{backgroundColor: 'green', height: '100%'}}>跑马灯 5</div>
    </Carousel>
  </div>
, mountNode);
```

```css
.carousel-container{
  width: 300px;
  height: 200px;
}
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
```
