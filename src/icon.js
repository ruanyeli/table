import React, { Component } from 'react';
import "./index.less";
import Icon from './component/icon/index';

class App extends Component {
  render() {
    console.log('icon')
    return (
      <div className="App">
        <Icon type="loading"/>
        <Icon type="more"/>
      </div>
    );
  }
}

export default App;