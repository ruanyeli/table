import React, { Component } from 'react';
import Icon from './component/icon/index';
import "./index.less";

class App extends Component {
  render() {
    console.log('table')
    return (
      <div className="App">
        <Icon type="link"/>
      </div>
    );
  }
}

export default App;
