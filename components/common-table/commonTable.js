import React, { Component } from 'react';
import PropTypes from 'prop-types';
import s from './style';
import Table from '../table';
import Button from '../button';
import Pagination from '../pagination';
import Input from '../input';
import Select from '../select';
import DatePicker from '../date-picker';
import moment from 'moment';
const Option = Select.Option;
const { RangePicker } = DatePicker;
// 推荐在入口文件全局设置 locale
moment.locale('zh-cn');
export default class CommonTable extends Component {
  static propTypes = {
    prefixCls: PropTypes.string,
    config: PropTypes.object,
    // 查询的函数比如fetch
    onSearch: PropTypes.func,
    // 查询完回调函数
    afterSearch: PropTypes.func
  };
  static defaultProps = {
    prefixCls :  s.commonTablePrefix
  };
  constructor(props) {
    super(props);
    const configObj = props.config;
    this.componentUrlObj = {};
    this.state = {
      dataSource: [],
      totalCount: 0,
      pageNum: 1,
      pageSize: configObj.pageSize||10,
      lastComponentUrl:''
    };
    (configObj.params || []).forEach((item) => {
      switch (item.type) {
        case 'rangeDate':
          this.state[item.start] = moment().subtract(item.default||7, 'days');
          this.state[item.end] = moment();
          break;
        case 'select':
          this.state[item.param] = item.default;
          this.state['last'+this.upperFirstLetter(item.param)] = item.default;
          break;
        case 'input':
          this.state['last'+this.upperFirstLetter(item.param)] = item.default;
          break;
        default:
          break;
      }
    });
    (configObj.paramList || []).forEach((item) => {
          this.state[item.param] = [];
    });
      configObj.searchListFn = (isFirst) => {
        if  (isFirst) {
          this.state.pageNum = 1;
        }
        this.searchList.bind(this)(isFirst,  this.state.pageNum,  this.state.pageSize)
      };
      configObj.setStateValueFn = (param,  value) => {
        let stateObj = {};
        stateObj[param] = value;
        this.state[param] = value;
        this.setState(stateObj);
      };
  }
  // 单词首字母大写
  upperFirstLetter = (words) => {
    let wordsArr = words.split('');
    wordsArr[0] = wordsArr[0].toUpperCase();
    return wordsArr.join('');
  };
  // 选择select
  valueSelect = (value, name) => {
    let stateObj = {};
    stateObj[name] = value;
    this.setState(stateObj);
  };
  // 搜索列表函数
  searchList = (isFirst, pageNum, pageSize) => {
    const configObj = this.props.config;
    const {onSearch, afterSearch} = this.props;
    let baseUrl = configObj.searchUrl, 
      paramArr = [], paramNameArr=[],componentUrl = "";
    let getList = () => {
      typeof configObj.setLoading === 'function' && configObj.setLoading(true);
      let fetchUrl = `${baseUrl}?pageNum=${pageNum}&pageSize=${pageSize}`;
      paramNameArr.forEach((item, index) => {
        fetchUrl+=`&${item}=${paramArr[index]}`;
      });
      onSearch(fetchUrl+componentUrl).then((res) => {
        const searchRes = afterSearch(res,true);
        if (searchRes.isSuccess) {
          searchRes.list.forEach((item, index) => {
            item.key = index;
          });
          if (searchRes.list.length === 0 && pageNum !== 1) {
            pageNum--;
            getList.apply(this, paramArr);
          }
          let stateObj = {
            dataSource: searchRes.list,
            totalCount: searchRes.total,
            pageNum: pageNum,  
            pageSize: pageSize,
            lastComponentUrl:componentUrl
          };
          paramNameArr.forEach((item,  index) => {
            stateObj[`last${this.upperFirstLetter(item)}`] = paramArr[index];
          });
          this.setState(stateObj);
        }
        typeof configObj.setLoading === 'function' && configObj.setLoading(false);
      });
    };
    // 首次加载
    if (isFirst){
      (configObj.params||[]).forEach((item) => {
        switch (item.type) {
          case 'component':
            componentUrl+=this.componentUrlObj[item.param]();
            break;
          case 'rangeDate':
            paramNameArr.push(item.start);
            paramNameArr.push(item.end);
            if(item.isTimeStamp){
              paramArr.push(this.state[item.start].valueOf());
              paramArr.push(this.state[item.end].valueOf());
            }else{
              paramArr.push(this.state[item.start].format('YYYY-MM-DD HH:mm:ss'));
              paramArr.push(this.state[item.end].format('YYYY-MM-DD HH:mm:ss'));
            }
            break;
          case 'input':
            paramNameArr.push(item.param);
            paramArr.push(this.refs[item.param].input.value);
            break;
          default:
            paramNameArr.push(item.param);
            paramArr.push(this.state[item.param]);
        }
      });
      // 换页,  切换条数
    } else {
      componentUrl = this.state.lastComponentUrl;
      (configObj.params || []).forEach((item) => {
        switch (item.type) {
          case 'rangeDate':
            paramNameArr.push(item.start);
            paramNameArr.push(item.end);
            if(item.isTimeStamp){
              paramArr.push(this.state[item.start].valueOf());
              paramArr.push(this.state[item.end].valueOf());
            }else{
              paramArr.push(this.state[item.start].format('YYYY-MM-DD HH:mm:ss'));
              paramArr.push(this.state[item.end].format('YYYY-MM-DD HH:mm:ss'));
            }
            break;
          default:
            paramNameArr.push(item.param);
            paramArr.push(this.state[`last${this.upperFirstLetter(item.param)}`]);
        }
      });
    }
    getList.apply(this,  paramArr);
  };
  // 换页
  handlePageChange = (pageNum,  pageSize) => {
    this.searchList(false,  pageNum,  pageSize);
  };
  //  切换条数
  handleShowSizeChange = (pageNum, pageSize) => {
    this.searchList(false, 1, pageSize);
  };
  //  日期范围选择
  dateChange = (value, start, end) => {
    let startTime = value[0];
    let endTime = value[1];
    let stateObj = {};
    stateObj[start] = startTime;
    stateObj[end] = endTime;
    this.setState(stateObj);
  };
  getFinalData = (type,data,passValueArr,passNameArr)=>{
    let finalData = [];
    switch (type) {
      case 'array':
        finalData = data.map((item) => {
          return {
            value: item,
            name: item
          }
        });
        break;
      case 'map':
        for(let prop in data){
          finalData.push({
            value: prop,
            name: data[prop]
          });
        }
        break;
      default:
        if(passValueArr&&passNameArr&&passValueArr.length&&passNameArr.length){
          finalData = data.map((item) => {
            let returnValue='',returnName='';
            for(let i=0;i<passValueArr.length;i++){
              returnValue+=item[passValueArr[i]];
            }
            for(let i=0;i<passNameArr.length;i++){
              returnName+=item[passNameArr[i]]+' ';
            }
            return {
              value:returnValue,
              name:returnName
            };
          });
        }else{
          finalData = data;
        }
        break;
    }
    return finalData;
  };
  //  得到搜索的参数
  getSearchParam = (item) => {
    const {onSearch, afterSearch} = this.props;
    typeof this.props.config.setLoading === 'function' && this.props.config.setLoading(true);
    onSearch(item.url).then((res) => {
      const searchRes = afterSearch(res);
      if (searchRes.isSuccess) {
        let stateObj = {};
        stateObj[item.param] = this.getFinalData(item.type,searchRes.data,item.passValueArr,item.passNameArr);
        this.setState(stateObj);
      }
      typeof this.props.config.setLoading === 'function' && this.props.config.setLoading(false);
    });
  };
  // 表格行的类
  getRowClassName = (record) => {
    const {getRowClassNameFn} = this.props.config;
    if  (typeof getRowClassNameFn === 'function'){
      return getRowClassNameFn(record);
    }
  };
  render () {
    const {dataSource, totalCount, pageNum, pageSize} = this.state;
    const {prefixCls} = this.props;
    const configObj = this.props.config;
    let searchTopObjs = [], buttonObjs = [];
    (configObj.params||[]).forEach((item) => {
      switch (item.type){
        case 'component':
          const ItemComponent = item.component;
          searchTopObjs.push(
            <ItemComponent key={`${item.param}component`} componentUrlObj = {this.componentUrlObj}/>
          );
          break;
        case 'rangeDate':
          searchTopObjs.push(
            <div className={s.searchTopDiv} key={`rangedateDiv${item.start}`}>
              {item.title? <span className={s.titleSpan}>{item.title}</span>: null}
              <RangePicker
                key={`rangedate${item.start}`}
                showTime={{format: 'HH:mm:ss'}}
                format='YYYY-MM-DD HH:mm:ss'
                defaultValue={[moment().subtract(item.default||7,  'days'),  moment()]}
                value={[this.state[item.start], this.state[item.end]]}
                onChange={(value) => this.dateChange(value, item.start, item.end)} allowClear={false} className={s.time} style={{cursor:  'pointer'}}/>
            </div>
          );
          break;
        case 'select':
          let listName = `${item.param}List`;
          searchTopObjs.push(
            <div className={s.searchTopDiv} key={`${listName}div`}>
              {item.title? <span className={s.titleSpan}>{item.title}</span>: null}
              <Select defaultValue=''  value={this.state[item.param]} style={{ width:  130 }} onChange={(value)=>this.valueSelect(value, item.param)} className={s.topSelect}>
                <Option value={item.default||''}>{item.defaultTip}</Option>
                {(this.state[listName]||[]).map((prop) => {
                  return <Option value={prop.value} key={prop.value+item.param}>{prop.name}</Option>;
                })}
              </Select>
            </div>
          );
          break;
        case 'input':
          searchTopObjs.push(
            <div className={s.searchTopDiv} key={`${item.param}div`}>
              {item.title? <span className={s.titleSpan}>{item.title}</span>: null}
              <Input type='text' ref={item.param} style={{ width: 130 }} maxLength={60} defaultValue={item.default||''}/>
            </div>
          );
          break;
      }
    });
    (configObj.buttons||[]).forEach((item) => {
      if  (item.type==='search'){
        // 为了权限
        if (item.isHide){
          return false;
        }
        buttonObjs.push(
          <Button type='primary' onClick={this.searchList.bind(this, true, 1, pageSize)} key={`searchBtn`}>查询</Button>
        );
      } else {
        if (item.isHide){
          return false;
        }
        buttonObjs.push(
          <Button type='primary' onClick={item.callBackFn} key={`${item.title}`}>{item.title}</Button>
        );
      }
    });
      return (
      <div className={prefixCls}>
        {searchTopObjs.length!==0||buttonObjs.length!==0?
          <div className={s.searchTop} style={(configObj.style&&configObj.style.searchTop)?configObj.style.searchTop:null}>
            {searchTopObjs}
            {buttonObjs}
          </div> : null}
        <div className={s.tableWrapper} style={(configObj.style&&configObj.style.tableWrapper)?configObj.style.tableWrapper:null}>
          <Table dataSource={dataSource} columns={configObj.columns} pagination={false} rowClassName={this.getRowClassName} noborder/>
          <div className={s.pageControl}>
            <div>{dataSource.length?<Pagination onChange={this.handlePageChange} defaultPageSize={pageSize} pageSize={pageSize} pageSizeOptions={['10', '20', '30', '50']} showSizeChanger onShowSizeChange={this.handleShowSizeChange} current={pageNum} defaultCurrent={1} showQuickJumper total={totalCount} showTotal={total => `共 ${total}条记录`}/> : null}</div>
          </div>
        </div>
      </div>
    );
  };
  componentDidMount(){
    const configObj = this.props.config;
    (configObj.paramList||[]).forEach((item) => {
      if (item.url){
        this.getSearchParam(item);
      }  else  {
        this.state[item.param] = this.getFinalData(item.type,item.value,item.passValueArr,item.passNameArr);
      }
    });
      this.searchList(true, 1, this.state.pageSize);
  };

}