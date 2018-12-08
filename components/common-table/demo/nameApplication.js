import React, { Component } from 'react';
import s from '../style';
import Select from '../../select';
import Input from '../../input';
const Option = Select.Option;
const partnerCodeList = [
  {
    value:'partnercode1',name:'合作方1'
  },{
    value:'partnercode2',name:'合作方2'
  }
];
const partnerCodeMap = {
  'partnercode1':[
    {
      name:'app11',
      displayName:'应用11',
    },
    {
      name:'app12',
      displayName:'应用12',
    }
  ],
  'partnercode2':[
    {
      name:'app21',
      displayName:'应用21',
    },
    {
      name:'app22',
      displayName:'应用22',
    }
  ]
};
export default class NameApplication extends Component {
  constructor(props){
    super(props);
    this.state = {
      partnerCode:'',
      appName:''
    };
    const {componentUrlObj} = props;
    componentUrlObj.nameApplication = this.getComponentUrl.bind(this);
  }
  getComponentUrl = () => {
    const name = this.name.input.value;
    return `&partnerCode=${this.state.partnerCode}&appName=${this.state.appName}&name=${name}`;
  };
  // 选择select
  valueSelect = (value, name) => {
    this.state.appName = '';
    let stateObj = {};
    stateObj[name] = value;
    this.setState(stateObj);
  };

  render () {
    const {partnerCode, appName} = this.state;
    return (
      <div style={{display:'inline-block', verticalAlign: 'top'}}>
        <div className={s.searchTopDiv} key="partnercodediv">
          <Select defaultValue=''  value={partnerCode} style={{ width:  130 }} onChange={(value)=>this.valueSelect(value, 'partnerCode')} className={s.topSelect} placeholder="选择合作方">
            <Option value=''>全部合作方</Option>
            {(partnerCodeList||[]).map((prop) => {
              return <Option value={prop.value} key={prop.value+'partnerCode'}>{prop.name}</Option>;
            })}
          </Select>
        </div>
        <div className={s.searchTopDiv} key="appnamediv">
          <Select defaultValue=''  value={appName} style={{ width:  130 }} onChange={(value)=>this.valueSelect(value, 'appName')} className={s.topSelect} placeholder="选择应用名">
            <Option value=''>全部应用</Option>
            {(partnerCodeMap[partnerCode]||[]).map((prop) => {
              return <Option value={prop.name} key={prop.value+'appName'}>{prop.displayName}</Option>;
            })}
          </Select>
        </div>
        <div className={s.searchTopDiv} key={`namediv`}>
          <Input type='text' ref={name => this.name = name} style={{ width: 130 }} maxLength={60}/>
        </div>
      </div>
    );
  };
}
