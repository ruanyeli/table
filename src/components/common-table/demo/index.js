/**
 * @Author:  Yingxi.Hao
 * @Date:  2017-12-13
 * @Last modified by:  hyx
 */
import React from 'react';
import ReactDOM from 'react-dom';
import 'whatwg-fetch';
import CommonTable from '../index';
import message from '../../message';
import NameApplication from './nameApplication';
import 'whatwg-fetch';
//对响应结果的处理
let render = () => {
  class Demo extends React.Component {
    state = {
      loading:false
    };
    afterSearchFn = (resBefore,isSearchList) => {
       if(isSearchList){
         return {
           isSuccess:(resBefore.success && resBefore.code===200),
           list:resBefore.data.list,
           total:resBefore.data.total
          };
      }else{
        return {
          isSuccess:true,
          data:resBefore.data
        };
      }
    };
    onSearchFn = (url) => {
      return fetch(url).then(res=>res.json());
    };
    addObjFn = () => {
      message.info('新增成功！即将刷新页面！');
      this.configObj.searchListFn(true);
    };
    setLoading = (isLoading) => {
      this.setState({
        loading:isLoading
      });
    };
    configObj = {
    //表格内容
    columns:  [
      {title:  '日期',dataIndex: 'gmtCreateStr',key: 'gmtCreateStr'},
      {title: '标签名',dataIndex: 'tagName',key: 'tagName'},
      {title: '渠道',dataIndex: 'channel',key: 'channel'},
      {title: '发件人',dataIndex: 'sender',key: 'sender'},
    ],
    //参数配置
    params: [
      {
        type: 'rangeDate',
        start: 'startTime',
        end: 'endTime',
        default: 7,
        isTimeStamp:true
      },
      {
        type: 'select',
        title: '标签',
        param: 'tagName',
        default: '',
        defaultTip: '全部'
      },
      {
        type: 'select',
        title: '渠道',
        param: 'channel',
        default: '',
        defaultTip: '全部'
      },
      {
        type: 'input',
        title: '发件人',
        param: 'sender',
        default: ''
      },
      {
        type: 'component',
        param: 'nameApplication',
        component:NameApplication
      }

    ],
    //按钮配置
    buttons: [
      {
        type: 'search',
        title: '查询'
      },
      {
        type:'add',
        title:'新增',
        callBackFn:this.addObjFn
      }
    ],
    //查询列表的url
    searchUrl: 'http://interface.tongdun.me:3000/td_ui_commonTable/search',
      setLoading:this.setLoading.bind(this),
    //请求参数列表
    paramList: [
      {
        type:"map",
        param: 'tagNameList',
        url:"http://interface.tongdun.me:3000/td_ui_commonTable/getTag"

      },
      {
        param: 'channelList',
        value: [
          {value: 'sftp', name: 'ftp'},
          {value: 'system', name: '数据平台'}
        ]
      }
    ]
  };
    render() {
      return (
      <CommonTable config={this.configObj} onSearch={this.onSearchFn} afterSearch={this.afterSearchFn}/>
      )
    }
  }

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
