import React, { Component } from 'react';
import "./index.less";
import Icon from './component/icon/index';
import Loading from './component/loading/index';
import Checkbox from './component/checkbox/index';
import Radio from './component/radio.back/radio';
import Table from './component/table/index';

const CheckboxGroup = Checkbox.CheckboxGroup;

const Column = Table.Column;
const ColumnGroup = Table.ColumnGroup;

const checkboxOptions1 = ["Tom", "Sham", "Jack", "Mac"];
const checkboxOptions2 = [
  { label: "Tom", value: "Tom" },
  { label: "Sham", value: "Sham" },
  { label: "Jack", value: "Jack" },
  { label: "Mac", value: "Mac" }
];

const dataSource = [{
  key: '1',
  seqId: '1500537541872152S170C295D6830048',
  eventType: '登陆事件',
  occurTime: '2017-07-20 15:59:01'
}, {
  key: '2',
  seqId: '1500537409406188S170C295D7848529',
  eventType: '登陆事件',
  occurTime: '2017-07-20 15:56:49'
}];

const columns = [{
  title: 'Sequence ID',
  dataIndex: 'seqId',
  key: 'seqId',
  render: seqId => <a href="#">{seqId}</a>,
}, {
  title: '事件类型',
  dataIndex: 'eventType',
  key: 'eventType',
}, {
  title: '发生时间',
  dataIndex: 'occurTime',
  key: 'occurTime',
}];

const dataSource1 = [{
  key: '1',
  seqId: '1500537541872152S170C295D6830048',
  eventType: '登陆事件',
  occurTime: '2017-07-20 15:59:01'
}, {
  key: '2',
  seqId: '1500537409406188S170C295D7848529',
  eventType: '登陆事件',
  occurTime: '2017-07-20 15:56:49'
}];

const columns1 = [{
  title: 'Sequence ID',
  dataIndex: 'seqId',
  key: 'seqId',
  render: seqId => <a href="#">{seqId}</a>,
}, {
  title: '事件类型',
  dataIndex: 'eventType',
  key: 'eventType',
}, {
  title: '发生时间',
  dataIndex: 'occurTime',
  key: 'occurTime',
}];

const dataSource2 = [{
  key: '1',
  seqId: '1500537541872152S170C295D6830048',
  eventType: '登陆事件',
  occurTime: '2017-07-20 15:59:01',
  description: 'description'
}, {
  key: '2',
  seqId: '1500537409406188S170C295D7848529',
  eventType: '登陆事件',
  occurTime: '2017-07-20 15:56:49',
  description: 'description'
}];

const columns2 = [{
  title: 'Sequence ID',
  dataIndex: 'seqId',
  key: 'seqId',
  render: seqId => <a href="#">{seqId}</a>,
}, {
  title: '事件类型',
  dataIndex: 'eventType',
  key: 'eventType',
}, {
  title: '发生时间',
  dataIndex: 'occurTime',
  key: 'occurTime',
}];


const columns3 = [
  { title: 'seqId', width: 300, dataIndex: 'seqId', key: 'seqId', fixed: 'left' },
  { title: 'occurTime', width: 200, dataIndex: 'occurTime', key: 'occurTime', fixed: 'left' },
  { title: 'Column 1', dataIndex: 'eventType', key: '1' },
  { title: 'Column 2', dataIndex: 'eventType', key: '2' },
  { title: 'Column 3', dataIndex: 'eventType', key: '3' },
  { title: 'Column 4', dataIndex: 'eventType', key: '4' },
  { title: 'Column 5', dataIndex: 'eventType', key: '5' },
  { title: 'Column 6', dataIndex: 'eventType', key: '6' },
  { title: 'Column 7', dataIndex: 'eventType', key: '7' },
  { title: 'Column 8', dataIndex: 'eventType', key: '8' },
  {
    title: 'Action',
    key: 'operation',
    fixed: 'right',
    width: 100,
    render: () => <a href="#">action</a>,
  },
];

const dataSource3 = [{
  key: '1',
  seqId: '1500537541872152S170C295D6830048',
  eventType: '登陆事件',
  occurTime: '2017-07-20 15:59:01'
}, {
  key: '2',
  seqId: '1500537409406188S170C295D7848529',
  eventType: '借款事件',
  occurTime: '2017-07-20 15:56:49'
}];


const columns4 = [{
  title: 'Name',
  dataIndex: 'name',
  key: 'name',
  width: 100,
  fixed: 'left',
  filters: [{
    text: 'Joe',
    value: 'Joe',
  }, {
    text: 'John',
    value: 'John',
  }],
  onFilter: (value, record) => record.name.indexOf(value) === 0,
}, {
  title: 'Other',
  children: [{
    title: 'Age',
    dataIndex: 'age',
    key: 'age',
    width: 200,
    sorter: (a, b) => a.age - b.age,
  }, {
    title: 'Address',
    children: [{
      title: 'Street',
      dataIndex: 'street',
      key: 'street',
      width: 200,
    }, {
      title: 'Block',
      children: [{
        title: 'Building',
        dataIndex: 'building',
        key: 'building',
        width: 100,
      }, {
        title: 'Door No.',
        dataIndex: 'number',
        key: 'number',
        width: 100,
      }],
    }],
  }],
}, {
  title: 'Company',
  children: [{
    title: 'Company Address',
    dataIndex: 'companyAddress',
    key: 'companyAddress',
    width: 160,
  }, {
    title: 'Company Name',
    dataIndex: 'companyName',
    key: 'companyName',
  }],
}, {
  title: 'Gender',
  dataIndex: 'gender',
  key: 'gender',
  width: 60,
  fixed: 'right',
}];

const dataSource4 = [];
for (let i = 0; i < 100; i++) {
  dataSource4.push({
    key: i,
    name: 'John Brown76575647564',
    age: i + 1,
    street: 'Lake Par45645645654k',
    building: 'C',
    number: 2035434543546456,
    companyAddress: 'Lake Street 4213122',
    companyName: 'SoftLake Co',
    gender: 'M' + i,
  });
}//

const dataSource5 = [{
  key: '1',
  seqId: '1500537541872152S170C295D6830048',
  eventType: '登陆事件',
  occurTime: '2017-07-20 15:59:01',
  endTime: '2017-07-30 15:30:11'
}, {
  key: '2',
  seqId: '1500537409406188S170C295D7848529',
  eventType: '登陆事件',
  occurTime: '2017-07-20 15:56:49',
  endTime: '2017-07-26 15:32:14'
}];

const eventTypes = {
  Login: '登陆事件',
  Loan: '借款事件'
};

const dataSource6 = [{
  key: '1',
  seqId: 'xxx1',
  eventType: 'Login',
  occurTime: '2017-07-20 15:59:01'
}, {
  key: '2',
  seqId: 'xxx2',
  eventType: 'Login',
  occurTime: '2017-07-20 15:56:49'
}, {
  key: '3',
  seqId: 'xxx3',
  eventType: 'Loan',
  occurTime: '2017-07-20 15:53:21'
}, {
  key: '4',
  seqId: 'xxx4',
  eventType: 'Login',
  occurTime: '2017-07-20 14:59:14'
}, {
  key: '5',
  seqId: 'xxx1',
  eventType: 'Login',
  occurTime: '2017-07-20 15:59:01'
}, {
  key: '6',
  seqId: 'xxx2',
  eventType: 'Login',
  occurTime: '2017-07-20 15:56:49'
}, {
  key: '7',
  seqId: 'xxx3',
  eventType: 'Loan',
  occurTime: '2017-07-20 15:53:21'
}, {
  key: '8',
  seqId: 'xxx4',
  eventType: 'Login',
  occurTime: '2017-07-20 14:59:14'
}, {
  key: '9',
  seqId: 'xxx1',
  eventType: 'Login',
  occurTime: '2017-07-20 15:59:01'
}, {
  key: '10',
  seqId: 'xxx2',
  eventType: 'Login',
  occurTime: '2017-07-20 15:56:49'
}, {
  key: '11',
  seqId: 'xxx3',
  eventType: 'Loan',
  occurTime: '2017-07-20 15:53:21'
}, {
  key: '12',
  seqId: 'xxx4',
  eventType: 'Login',
  occurTime: '2017-07-20 14:59:14'
}];

const columns6 = [{
  title: 'Sequence ID',
  dataIndex: 'seqId',
  key: 'seqId',
  filters: [{
    text: 'xxx1',
    value: 'xxx1'
  }, {
    text: 'xxx2',
    value: 'xxx2'
  }, {
    text: 'xxx3',
    value: 'xxx3'
  }, {
    text: 'xxx4',
    value: 'xxx4'
  }],
  filterMultiple: false,
  onFilter: (value, record) => record.seqId.indexOf(value) === 0,
  sorter: (a, b) => a.seqId > b.seqId ? 1 : (a.seqId == b.seqId ? 0 : -1),
}, {
  title: '事件类型',
  dataIndex: 'eventType',
  key: 'eventType',
  filters: Object.keys(eventTypes).map(key => ({
    text: eventTypes[key],
    value: key
  })),
  render: type => eventTypes[type],
  onFilter: (value, record) => (record.eventType || eventTypes[record.eventType]).indexOf(value) === 0
}, {
  title: '发生时间',
  dataIndex: 'occurTime',
  key: 'occurTime',
  sorter: (a, b) => (new Date(a.occurTime).getTime()) - (new Date(b.occurTime).getTime())
}];


const renderContent = (value, row, index) => {
  const obj = {
    children: value,
    props: {},
  };
  if (index === 4) {
    obj.props.colSpan = 0;
  }
  return obj;
};

const columns7 = [{
  title: 'Name',
  dataIndex: 'name',
  render: (text, row, index) => {
    if (index < 4) {
      return <a href="#">{text}</a>;
    }
    return {
      children: <a href="#">{text}</a>,
      props: {
        colSpan: 5,
      },
    };
  },
}, {
  title: 'Age',
  dataIndex: 'age',
  render: renderContent,
}, {
  title: 'Home phone',
  colSpan: 2,
  dataIndex: 'tel',
  render: (value, row, index) => {
    const obj = {
      children: value,
      props: {},
    };
    if (index === 2) {
      obj.props.rowSpan = 2;
    }
    // These two are merged into above cell
    if (index === 3) {
      obj.props.rowSpan = 0;
    }
    if (index === 4) {
      obj.props.colSpan = 0;
    }
    return obj;
  },
}, {
  title: 'Phone',
  colSpan: 0,
  dataIndex: 'phone',
  render: renderContent,
}, {
  title: 'Address',
  dataIndex: 'address',
  render: renderContent,
}];

const dataSource7 = [{
  key: '1',
  name: 'John Brown',
  age: 32,
  tel: '0571-22098909',
  phone: 18889898989,
  address: 'New York No. 1 Lake Park',
}, {
  key: '2',
  name: 'Jim Green',
  tel: '0571-22098333',
  phone: 18889898888,
  age: 42,
  address: 'London No. 1 Lake Park',
}, {
  key: '3',
  name: 'Joe Black',
  age: 32,
  tel: '0575-22098909',
  phone: 18900010002,
  address: 'Sidney No. 1 Lake Park',
}, {
  key: '4',
  name: 'Jim Red',
  age: 18,
  tel: '0575-22098909',
  phone: 18900010002,
  address: 'London No. 2 Lake Park',
}, {
  key: '5',
  name: 'Jake White',
  age: 18,
  tel: '0575-22098909',
  phone: 18900010002,
  address: 'Dublin No. 2 Lake Park',
}];

const dataSource8 = [{
  key: '1',
  seqId: '1500537541872152S170C295D6830048',
  eventType: '登陆事件',
  occurTime: '2017-07-20 15:59:01'
}, {
  key: '2',
  seqId: '1500537409406188S170C295D7848529',
  eventType: '登陆事件',
  occurTime: '2017-07-20 15:56:49'
}, {
  key: '3',
  seqId: '1500537386207434S170C295D7093772',
  eventType: '登陆事件',
  occurTime: '2017-07-20 15:53:21'
}, {
  key: '4',
  seqId: '1500537333687432S170C295A3171879',
  eventType: '登陆事件',
  occurTime: '2017-07-20 14:59:14'
}];

const columns8 = [{
  title: 'Sequence ID',
  dataIndex: 'seqId',
  key: 'seqId',
  render: seqId => <a href="#">{seqId}</a>,
}, {
  title: '事件类型',
  dataIndex: 'eventType',
  key: 'eventType',
}, {
  title: '发生时间',
  dataIndex: 'occurTime',
  key: 'occurTime',
}];

const rowSelection = {
  onChange: (selectedRowKeys, selectedRows) => {
    console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
  },
  getCheckboxProps: record => ({
    disabled: record.seqId === '1500537333687432S170C295A3171879',
  }),
};


const columns9 = [{
  title: 'Name',
  dataIndex: 'name',
  key: 'name',
  width: '40%',
}, {
  title: 'Age',
  dataIndex: 'age',
  key: 'age',
  width: '30%',
}, {
  title: 'Address',
  dataIndex: 'address',
  key: 'address',
}];

const dataSource9 = [{
  key: 1,
  name: 'John Brown sr.',
  age: 60,
  address: 'New York No. 1 Lake Park',
  children: [{
    key: 11,
    name: 'John Brown',
    age: 42,
    address: 'New York No. 2 Lake Park',
  }, {
    key: 12,
    name: 'John Brown jr.',
    age: 30,
    address: 'New York No. 3 Lake Park',
    children: [{
      key: 121,
      name: 'Jimmy Brown',
      age: 16,
      address: 'New York No. 3 Lake Park',
    }],
  }, {
    key: 13,
    name: 'Jim Green sr.',
    age: 72,
    address: 'London No. 1 Lake Park',
    children: [{
      key: 131,
      name: 'Jim Green',
      age: 42,
      address: 'London No. 2 Lake Park',
      children: [{
        key: 1311,
        name: 'Jim Green jr.',
        age: 25,
        address: 'London No. 3 Lake Park',
      }, {
        key: 1312,
        name: 'Jimmy Green sr.',
        age: 18,
        address: 'London No. 4 Lake Park',
      }],
    }],
  }],
}, {
  key: 2,
  name: 'Joe Black',
  age: 32,
  address: 'Sidney No. 1 Lake Park',
}];

// rowSelection objects indicates the need for row selection


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value1: ["Tom", "Mac"],
      value2: ["Mac"]
    };
  }

  onCheckboxGroupChange1 = v => {
    console.log(v);
    this.setState({ value1: v })
  }
  onCheckboxGroupChange2 = v => {
    console.log(v);
    this.setState({ value2: v })
  }

  render() {
    const CheckboxGroup = Checkbox.CheckboxGroup;
    console.log('icon');
    return (
      <div className="App">
        <Icon type="link" />
        <Icon type="loading" />
        <Icon type="more" />
        <Loading text="请稍后" size="large" />
        <CheckboxGroup defaultValue={[1]} onChange={this.onChange}>
          <Checkbox value={1}>测试1</Checkbox>
          <Checkbox value={2}>测试2</Checkbox>
          <Checkbox value={3}>测试3</Checkbox>
        </CheckboxGroup>
        <CheckboxGroup value={this.state.value1} options={checkboxOptions1} onChange={this.onCheckboxGroupChange1} />
        <CheckboxGroup value={this.state.value2} options={checkboxOptions2} onChange={this.onCheckboxGroupChange2} />
        <Radio value={1} checked={true}>radio</Radio>
        <Radio value={2}>radio2</Radio>
        <Table columns={columns} dataSource={dataSource} />
        <Table
          columns={columns1}
          dataSource={dataSource1}
          bordered
          title={() => 'Header'}
          footer={() => 'Footer'}
        />
        <Table
          columns={columns2}
          expandedRowRender={record => <p>{record.description}</p>}
          dataSource={dataSource2}
        />

        <Table
          columns={columns3}
          dataSource={dataSource3}
          scroll={{ x: 1300 }}
        />
        <Table
          columns={columns4}
          dataSource={dataSource4}
          bordered
          size="middle"
          scroll={{ x: '130%', y: 240 }}
        />
        <Table dataSource={dataSource5}>
          <Column title="Sequence ID" dataIndex="seqId" key="seqId" />
          <Column title="事件类型" dataIndex="eventType" key="eventType" />
          <ColumnGroup title="时间">
            <Column title="发生时间" dataIndex="occurTime" key="occurTime" />
            <Column title="结束时间" dataIndex="endTime" key="endTime" />
          </ColumnGroup>
        </Table>
        <Table
          columns={columns6}
          dataSource={dataSource6}
          pagination={{ pageSize: 20 }}
          scroll={{ y: 205 }}
          lazyload
        />
        <Table columns={columns7} dataSource={dataSource7} bordered />
        <Table rowSelection={rowSelection} columns={columns8} dataSource={dataSource8} />
        <Table columns={columns9} rowSelection={rowSelection} dataSource={dataSource9} />

      </div>
    );
  }
}

export default App;