/**
 * @Author: Zhengfeng.Yao <yzf>
 * @Date:   2017-07-03 16:37:08
 * @Last modified by:   yzf
 * @Last modified time: 2017-07-04 11:37:30
 */
/* eslint-disable */
import React from 'react';
import ReactDOM from 'react-dom';
import { Row, Col } from '../../grid';
import Icon from '../../icon';
import Button from '../../button';

const MOUNT_NODE = document.getElementById('app');

function renderBasic(Table) {
  const columns = [{
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    render: text => <a href="#">{text}</a>,
  }, {
    title: 'Age',
    dataIndex: 'age',
    key: 'age',
  }, {
    title: 'Address',
    dataIndex: 'address',
    key: 'address',
  }, {
    title: 'Action',
    key: 'action',
    render: (text, record) => (
      <span>
        <a href="#">Action 一 {record.name}</a>
        <span className="td-divider" />
        <a href="#">Delete</a>
        <span className="td-divider" />
        <a href="#" className="td-dropdown-link">
          More actions <Icon type="unfold" />
        </a>
      </span>
    ),
  }];

  const data = [{
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
  }];
  return <Table columns={columns} dataSource={data} />;
}

function renderJSX(Table) {
  const { Column, ColumnGroup } = Table;

  const data = [{
    key: '1',
    firstName: 'John',
    lastName: 'Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
  }, {
    key: '2',
    firstName: 'Jim',
    lastName: 'Green',
    age: 42,
    address: 'London No. 1 Lake Park',
  }, {
    key: '3',
    firstName: 'Joe',
    lastName: 'Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park'
  }];
  return (
    <Table dataSource={data}>
      <ColumnGroup title="Name">
        <Column
          title="First Name"
          dataIndex="firstName"
          key="firstName"
        />
        <Column
          title="Last Name"
          dataIndex="lastName"
          key="lastName"
        />
      </ColumnGroup>
      <Column
        title="Age"
        dataIndex="age"
        key="age"
      />
      <Column
        title="Address"
        dataIndex="address"
        key="address"
      />
      <Column
        title="Action"
        key="action"
        render={(text, record) => (
          <span>
            <a href="#">Action 一 {record.name}</a>
            <span className="td-divider" />
            <a href="#">Delete</a>
            <span className="td-divider" />
            <a href="#" className="td-dropdown-link">
              More actions <Icon type="unfold" />
            </a>
          </span>
        )}
      />
    </Table>
  );
}

function renderSelectAndBordered(Table) {
  const columns = [{
    title: 'Name',
    dataIndex: 'name',
    render: text => <a href="#">{text}</a>,
    filters: [
      { text: 'Joe', value: 'Joe' },
      { text: 'Jim', value: 'Jim' },
    ]
  }, {
    title: 'Age',
    dataIndex: 'age',
  }, {
    title: 'Address',
    dataIndex: 'address',
  }];
  const data = [{
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
    name: 'Disabled User',
    age: 99,
    address: 'Sidney No. 1 Lake Park',
  }];

  // rowSelection object indicates the need for row selection
  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    },
    getCheckboxProps: record => ({
      disabled: record.name === 'Disabled User',    // Column configuration not to be checked
    }),
  };
  return <Table rowSelection={rowSelection} columns={columns} dataSource={data} bordered/>;
}

function renderSortAndFilter(Table) {
  const data = [{
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

  const App = class extends React.Component {
    state = {
      filteredInfo: null,
      sortedInfo: null,
    };
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
      let { sortedInfo, filteredInfo } = this.state;
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
      return (
        <div>
          <div className="table-operations">
            <Button onClick={this.setAgeSort}>Sort age</Button>
            <Button onClick={this.clearFilters}>Clear filters</Button>
            <Button onClick={this.clearAll}>Clear filters and sorters</Button>
          </div>
          <Table columns={columns} dataSource={data} onChange={this.handleChange} bordered/>
        </div>
      );
    }
  }

  return <App />;
}

function renderExpanded(Table) {
  const columns = [
    { title: 'Name', dataIndex: 'name', key: 'name' },
    { title: 'Age', dataIndex: 'age', key: 'age' },
    { title: 'Address', dataIndex: 'address', key: 'address' },
    { title: 'Action', dataIndex: '', key: 'x', render: () => <a href="#">Delete</a> },
  ];

  const data = [
    { key: 1, name: 'John Brown', age: 32, address: 'New York No. 1 Lake Park', description: 'My name is John Brown, I am 32 years old, living in New York No. 1 Lake Park.' },
    { key: 2, name: 'Jim Green', age: 42, address: 'London No. 1 Lake Park', description: 'My name is Jim Green, I am 42 years old, living in London No. 1 Lake Park.' },
    { key: 3, name: 'Joe Black', age: 32, address: 'Sidney No. 1 Lake Park', description: 'My name is Joe Black, I am 32 years old, living in Sidney No. 1 Lake Park.' },
  ];
  return (
    <Table
      columns={columns}
      expandedRowRender={record => <p>{record.description}</p>}
      dataSource={data}
    />
  );
}

// 测试table滚动 效果
function renderScrollTable (Table) {
  const columns = [
    { title: '性别', dataIndex: '性别', key: '性别', fixed: 'left', width: 80 },
    { title: '会员', dataIndex: '会员卡', key: '会员卡', fixed: 'left', width: 80
     // onHeaderCell: (record) => {
     //    return {
     //      onClick: () => {
     //        console.log('aaa', record);
     //      }
     //    }
     //  }
      // onCellClick: (record) => {
      //   console.log('onCellClick', record);
      // }
    },
    // { title: '3', dataIndex: '3', key: '3' },
  ];
  let item = {
    '性别': '性别',
    '会员卡': '会员',
  };
  for (let i = 0; i < 29; i++) {
    item[i] = 1000000 * (i + 1);
    columns.push({ title: i, dataIndex: i, key: i + 12, fixed: i === 28 ?  'right' : false , width: 80 });
  }
  let data = [];
  for (let j = 0; j < 12; j++) {
    data.push({...item, id: `${j + 1}`});
  }
  // console.log('data', data, columns);
  // const columns = [
  //   { title: 'Full Name', width: 100, dataIndex: 'name', key: 'name', fixed: 'left' },
  //   { title: 'Age', width: 100, dataIndex: 'age', key: 'age', fixed: 'left' },
  //   { title: 'Column 1', dataIndex: 'address', key: '1', width: 150 },
  //   { title: 'Column 2', dataIndex: 'address', key: '2', width: 150 },
  //   { title: 'Column 3', dataIndex: 'address', key: '3', width: 150 },
  //   { title: 'Column 4', dataIndex: 'address', key: '4', width: 150 },
  //   { title: 'Column 5', dataIndex: 'address', key: '5', width: 150 },
  //   { title: 'Column 6', dataIndex: 'address', key: '6', width: 150 },
  //   { title: 'Column 7', dataIndex: 'address', key: '7', width: 150 },
  //   { title: 'Column 8', dataIndex: 'address', key: '8' },
  //   {
  //     title: 'Action',
  //     key: 'operation',
  //     fixed: 'right',
  //     width: 100,
  //     render: () => <a href="javascript:;">action</a>,
  //   },
  // ];
  //
  // const data = [];
  // for (let i = 0; i < 100; i++) {
  //   data.push({
  //     key: i,
  //     name: `Edrward ${i}`,
  //     age: 32,
  //     address: `London Park no. ${i}`,
  //   });
  // }
  // return (
  //   <div  style={{ width: 1292, height: 418, margin: 24 }}>
  //     <Table columns={columns} dataSource={data} scroll={{ x: 1500, y: 300 }} bordered pagination={false} />
  //   </div>
  // )
  return (
    <div style={{ width: 1200, height: 200, margin: 24 }}>
      <Table
        columns={columns}
        dataSource={data}
        rowKey='id'
        scroll={{ x: 2400, y: 500 }}
        pagination={false}
        bordered
      />
    </div>
  );
}

let render = () => {
  let Table = require('../index').default;
  function Demo() {
    const style = { padding: 5 };
    return (
      <div className="td">
        <Row>
          <Col span={11} style={style}>
            {renderBasic(Table)}
          </Col>
          <Col span={11} style={style}>
            {renderJSX(Table)}
          </Col>
        </Row>
        <Row>
          <Col span={11} style={style}>
            {renderSelectAndBordered(Table)}
          </Col>
          <Col span={11} style={style}>
            {renderSortAndFilter(Table)}
          </Col>
        </Row>
        <Row>
          <Col span={11} style={style}>
            {renderExpanded(Table)}
          </Col>
          <Col span={11} style={style}>
          </Col>
        </Row>
        <Row>
          <Col span={11} style={style}>
            {renderScrollTable(Table)}
          </Col>
        </Row>
      </div>
    );
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
