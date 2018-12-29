import React from 'react';
import Input from '../index';
const InputGroup = Input.Group;
export default class Group extends React.Component {
  render() {
    return (
      <div>
        <InputGroup compact style={{marginLeft: '20px'}}>
          <Input defaultValue="0571" style={{width: '20%'}}/>
          <Input defaultValue="26888888" style={{width: '30%'}}/>
        </InputGroup>
      </div>
    )
  }
}
