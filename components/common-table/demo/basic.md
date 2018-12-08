---
order:  0
title: 
  en-US:  Basic Usage
  zh-CN:  基本用法
---

## zh-CN

基本的表格配置。

## en-US

Simple table.

````jsx
  import { CommonTable,message} from 'td-ui';
  import NameApplication from './nameApplication';
  import 'whatwg-fetch';
  const afterSearchFn = (resBefore,isSearchList) => {
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
  }
  const onSearchFn = (url) => {
    return fetch(url).then(res=>res.json());
  }
  const addObjFn = () => {
    message.info('新增成功！');
  };
  const configObj = {
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
         callBackFn:addObjFn
       }
    ],
    //查询列表的url
    searchUrl: 'http://interface.tongdun.me:3000/td_ui_commonTable/search',
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

ReactDOM.render(<CommonTable config={configObj} onSearch={onSearchFn} afterSearch={afterSearchFn}/>, mountNode);
````
