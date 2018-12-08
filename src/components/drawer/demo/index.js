import React from 'react';
import ReactDom from 'react-dom';
import Drawer from '../index';
import Button from '../../button';

class Demo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      leftOpen: false,
      topOpen: false,
      rightOpen: false,
      bottomOpen: false
    }
  }

  toggle = key => {
    return e => {
      const visible = this.state[key];
      this.setState({
        [key]: !visible
      })
    }
  }

  render() {
    const { leftOpen, topOpen, rightOpen, bottomOpen } = this.state;
    return (<div style={{textAlign: 'center'}}>
      <Drawer placement="left" isOpen={leftOpen} onClose={this.toggle('leftOpen')}>
        <Button onClick={this.toggle('leftOpen')}>leftOpen</Button>
      </Drawer>
      <Drawer container={document.getElementById('app')} placement="right" isOpen={rightOpen} onClose={this.toggle('rightOpen')} mask={false}>
        <Button onClick={this.toggle('rightOpen')}>rightOpen</Button>
      </Drawer>
      <Drawer placement="top" isOpen={topOpen} onClose={this.toggle('topOpen')}>
        <Button onClick={this.toggle('topOpen')}>topOpen</Button>
      </Drawer>
      <Drawer placement="bottom" isOpen={bottomOpen} onClose={this.toggle('bottomOpen')}>
        <Button onClick={this.toggle('bottomOpen')}>bottomOpen</Button>
      </Drawer>
      <Button onClick={this.toggle('leftOpen')}>leftOpen</Button>
      <Button onClick={this.toggle('rightOpen')}>rightOpen</Button>
      <Button onClick={this.toggle('topOpen')}>topOpen</Button>
      <Button onClick={this.toggle('bottomOpen')}>bottomOpen</Button>
    </div>);
  }
}

const MOUNT_NODE = document.getElementById('app');

ReactDom.render(<Demo />, MOUNT_NODE);
