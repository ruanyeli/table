import React from 'react';
import ReactDOM from 'react-dom';
import Upload from '../index';
const MOUNT_NODE = document.getElementById('app');

class Demo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fileList: ''
    }
  }
  handleChange = file => {
    this.setState({
      fileList: file
    })
  }
  handleClick = () => {
    console.log(this.state.fileList);
    this.uploader.uploadAction();
  }


  render() {
    return (
      <div style={{width: 500}}>
        <Upload
          ref={u => this.uploader = u}
          multiple
          // note='abcdabcdabcd'
          showType="name"
          fileList={this.state.fileList}
          onChange={this.handleChange}
          onChangeToUpload={false}
          headers={{test: 'dsds'}}
          data={{test1: 'dsd--s'}}
          event={{
            onProgress: e => console.log(e),
            onSuccess: e => console.log(e),
            onError: e => console.log(e)
          }}
          showProgress={true}
          action="http://jsonplaceholder.typicode.com/posts/"
        />
        <Upload multiple note='abcdabcdabcd' fileList={this.state.fileList} onChange={this.handleChange}/>
        <div onClick={this.handleClick}>点击获得fileList</div>
      </div>
    )
  }
}

let render = () => {
  ReactDOM.render(<Demo />, MOUNT_NODE);
};

try {
  render();
} catch (e) {
  console.log(e);
}

if (module.hot) {
  module.hot.accept(['../index'], () => {
    setTimeout(() => {
      ReactDOM.unmountComponentAtNode(MOUNT_NODE);
      render();
    });
  });
}
