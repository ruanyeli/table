import React from 'react';
import ReactDOM from 'react-dom';

/* eslint-disable no-unused-vars */
import zh_CN from '../zh_CN';
import en_US from '../en_US';
import LocaleProvider from '../index';
import Upload from '../../upload';
import Radio from '../../radio';
import Button from '../../button';
import Table from '../../table';
import Transfer from '../../transfer';
import Select from '../../select';
import Popconfirm from '../../popconfirm';
import Pagination from '../../pagination';

const Option = Select.Option;
const RadioButton = Radio.RadioButton;
const RadioGroup = Radio.RadioGroup;

let arr = [];
for (let i = 0; i < 1000; i++) {
  arr.push(i + '');
}

const MOUNT_NODE = document.getElementById('app');

const mockData = [];
for (let i = 0; i < 20; i++) {
  mockData.push({
    key: i.toString(),
    title: `content${i + 1}`,
    description: `description of content${i + 1}`,
    disabled: i % 3 < 1
  });
}
mockData[2].children = [{
  key: '2-0',
  title: `content2-0`
}, {
  key: '2-1',
  title: `content2-1`
}, {
  key: '2-2',
  title: `content2-2`,
  children: [{
    key: '2-2-0',
    title: `content2-2-0`
  }, {
    key: '2-2-1',
    title: `content2-2-1`
  }]
}]
mockData[4].children = [{
  key: '4-0',
  title: `content4-0`
}, {
  key: '4-1',
  title: `content4-1`
}]

const tableData = [{
  key: '1',
  name: 'John Brown',
  age: 32,
  address: 'New York No. 1 Lake Park',
}, {
  key: '2',
  name: 'Jim Green',
  age: 42,
  address: 'London No. 1 Lake Park',
}, {
  key: '3',
  name: 'Joe Black',
  age: 32,
  address: 'Sidney No. 1 Lake Park',
}, {
  key: '4',
  name: 'Jim Red',
  age: 32,
  address: 'London No. 2 Lake Park',
}];

class Demo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 'zh_CN',
      dataSource: mockData,
      filteredInfo: null,
      sortedInfo: null,
    }
  }

  handleChange = (pagination, filters, sorter) => {
    console.log('Various parameters', pagination, filters, sorter);
    this.setState({
      filteredInfo: filters,
      sortedInfo: sorter,
    });
  }
  clearFilters = () => {
    this.setState({ filteredInfo: null });
  }
  clearAll = () => {
    this.setState({
      filteredInfo: null,
      sortedInfo: null,
    });
  }
  setAgeSort = () => {
    this.setState({
      sortedInfo: {
        order: 'descend',
        columnKey: 'age',
      },
    });
  }

  render() {
    const locale = this.state.value == 'zh_CN' ? zh_CN : en_US;
    let { dataSource, sortedInfo, filteredInfo } = this.state;
    sortedInfo = sortedInfo || {};
    filteredInfo = filteredInfo || {};
    const columns = [{
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      filters: [
        { text: 'Joe', value: 'Joe' },
        { text: 'Jim', value: 'Jim' },
      ],
      filteredValue: filteredInfo.name || null,
      onFilter: (value, record) => record.name.includes(value),
      sorter: (a, b) => a.name.length - b.name.length,
      sortOrder: sortedInfo.columnKey === 'name' && sortedInfo.order,
    }, {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
      sorter: (a, b) => a.age - b.age,
      sortOrder: sortedInfo.columnKey === 'age' && sortedInfo.order,
    }, {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
      filters: [
        { text: 'London', value: 'London' },
        { text: 'New York', value: 'New York' },
      ],
      filteredValue: filteredInfo.address || null,
      onFilter: (value, record) => record.address.includes(value),
      sorter: (a, b) => a.address.length - b.address.length,
      sortOrder: sortedInfo.columnKey === 'address' && sortedInfo.order,
      filterMultiple: false
    }];
    return <div>
      <div>
        <RadioGroup value={this.state.value} onChange={(e) => {
          this.setState({
            value: e.target.value
          });
        }}>
          <RadioButton value={'zh_CN'}>中文</RadioButton>
          <RadioButton value={'en_US'}>英文</RadioButton>
        </RadioGroup>
      </div>
      <LocaleProvider locale={locale}>
        <div>
          <Upload />
          <br/>

          <Transfer
            dataSource={dataSource}
            titles={['Source', 'Target']}
          />
          <br/>

          <div className="table-operations">
            <Button onClick={this.setAgeSort}>Sort age</Button>
            <Button onClick={this.clearFilters}>Clear filters</Button>
            <Button onClick={this.clearAll}>Clear filters and sorters</Button>
          </div>
          <Table columns={columns} dataSource={tableData} onChange={this.handleChange} bordered/>
          <br/>

          <Select showSearch isPage={{visibleCount: 30}} style={{ width: 120 }} size='small'>
            {
              arr.map((item, index) => <Option value={item} key={item}>{item}</Option>)
            }
          </Select>
          <br/>

          <Popconfirm placement="rightTop" onConfirm={()=>console.log('onConfirm')} onCancel={()=>console.log('onCancel')}>
            <Button type="default">delete</Button>
          </Popconfirm>
          <br />

          <Pagination showQuickJumper showSizeChanger defaultCurrent={2} total={500} />

        </div>
      </LocaleProvider>
    </div>
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
