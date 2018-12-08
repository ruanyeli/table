import React from 'react';
import Alert from '../index';

export default class Basic extends React.Component {
  onClose = (e) => {
    console.log(e, 'I was closed.');
  }
  render() {
    return (
      <div>
        <Alert message="Success Tips" type="success" showIcon />
        <Alert message="Informational Notes" type="info" showIcon />
        <Alert message="Warning" type="warning" showIcon />
        <Alert message="Error" type="error" showIcon />
        <Alert
          message="success tips"
          description="Detailed description and advices about successful copywriting."
          type="success"
          showIcon
        />
        <Alert
          message="Informational Notes"
          description="Additional description and informations about copywriting."
          type="info"
          showIcon
        />
        <Alert
          message="Warning"
          description="This is a warning notice about copywriting."
          type="warning"
          showIcon
        />
        <Alert
          message="Error"
          description="This is an error message about copywriting."
          type="error"
          showIcon
        />
        <Alert message="Error Text"
          description="Error Description Error Description Error Description Error Description Error Description Error Description"
          type="error"
          closable
          onClose={this.onClose}
        />
      </div>
    )
  }
}
