import React from 'react';
import Loading from '../../components/loading';

export default class index extends React.Component {
  render() {
    return (
      <div>
        {/* <Loading loading size="large" text="加载中..." /> */}
        <br />
        <Loading text="加载中">
          <div style={{ padding: 50, textAlign: 'center' }}>
            loading Content
          </div>
        </Loading>
      </div>
    );
  }
}
