import React, { Component } from 'react';
import Alert from '../alert';

export default (ErrorComponent) => WrappedComponent => {
	class NewComponent extends Component {
    render() {
      return <ErrorBoundary ErrorComponent={ErrorComponent}>
	      				<WrappedComponent/>
	      			</ErrorBoundary>
    }
  }
  return NewComponent
}

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { error: null, errorInfo: null };
  }
  
  componentDidCatch(error, errorInfo) {
  	console.log(error, errorInfo);
    this.setState({
      error: error,
      errorInfo: errorInfo
    })
  }
  
  render() {
  	const { children, ErrorComponent } = this.props;
  	const { error, errorInfo } = this.state;
    if (errorInfo) {
      return ErrorComponent ? <ErrorComponent error={error} errorInfo={errorInfo} /> : <Alert message="出错了" type="error" showIcon />
    }
    return children;
  }  
}
