import React, { Component } from 'react';
import "./index.less";
import Icon from './component/icon/index';

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
