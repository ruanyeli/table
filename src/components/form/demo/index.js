/**
 * @Author: Zhengfeng.Yao <yzf>
 * @Date:   2017-06-15 15:30:38
 * @Last modified by:   yzf
 * @Last modified time: 2017-06-19 15:11:09
 */

import React from 'react';
import ReactDOM from 'react-dom';
import Form from '../index';
import Input from '../../input';
import Button from '../../button';
import Select from '../../select';
import Dialog from '../../dialog';
import Radio from '../../radio';
import DatePicker from '../../date-picker';
import Col from '../../col';

const RadioGroup = Radio.RadioGroup
const Textarea = Input.Textarea;
const Option = Select.Option;
const FormItem = Form.Item;
const FormControl = Form.Control;

const MOUNT_NODE = document.getElementById('app');

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 }
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 14 }
  }
};

class Demo extends React.Component {
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        alert(`userName: ${values.userName}`);
      }
    });
  };

  render() {
    return (
      <Form>
        <FormItem
          {...formItemLayout}
          label="Fail"
          validateStatus="error"
          help="Should be combination of numbers & alphabets"
        >
          <FormControl name="userName" rules={[{ required: true, message: '请输入用户名!' }]}>
            <Input placeholder="unavailable choice" id="error" />
          </FormControl>
        </FormItem>

        <FormItem
          {...formItemLayout}
          label="Warning"
          validateStatus="warning"
        >
          <Input placeholder="Warning" id="warning" />
        </FormItem>

        <FormItem
          {...formItemLayout}
          label="Validating"
          hasFeedback
          validateStatus="validating"
          help="The information is being validated..."
        >
          <Input placeholder="I'm the content is being validated" id="validating" />
        </FormItem>

        <FormItem
          {...formItemLayout}
          label="Success"
          hasFeedback
          validateStatus="success"
        >
          <Input placeholder="I'm the content" id="success" />
        </FormItem>

        <FormItem
          {...formItemLayout}
          label="Warning"
          hasFeedback
          validateStatus="warning"
        >
          <Input placeholder="Warning" id="warning" />
        </FormItem>

        <FormItem
          {...formItemLayout}
          label="Fail"
          hasFeedback
          validateStatus="error"
          help="Should be combination of numbers & alphabets"
        >
          <Input placeholder="unavailable choice" id="error" />
        </FormItem>

        <FormItem
          label="inline"
          labelCol={{
            xs: { span: 24 },
            sm: { span: 5 }
          }}
          wrapperCol={{
            xs: { span: 24 },
            sm: { span: 19 }
          }}
          help
        >
          <Col span={6}>
            <FormItem validateStatus="error" help="Please select the correct date">
              <DatePicker />
            </FormItem>
          </Col>
          <Col span={1}>
            <p className="td-form-split">-</p>
          </Col>
          <Col span={6}>
            <FormItem>
              <DatePicker />
            </FormItem>
          </Col>
        </FormItem>
      </Form>
    );
  }
}

const DemoForm = Form.create()(Demo);

@Form.create()
class Demo1 extends React.Component {
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        alert(`userName: ${values.userName}`);
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div>
      <Form onSubmit={this.handleSubmit}>
        <FormItem label="前置" {...formItemLayout}>
          <FormControl name="userName" rules={[{ required: true, message: '请输入用户名!' }]}>
            <Input placeholder="请输入..."/>
          </FormControl>
        </FormItem>
        <FormItem label="前置" {...formItemLayout}>
          {
            getFieldDecorator('test', {})(
              <Select>
                <Option value="1111">1122</Option>
                <Option value="1112">1111</Option>
                <Option value="11223">111</Option>
              </Select>
            )
          }
        </FormItem>
        <FormItem label="前置" {...formItemLayout}>
          {
            getFieldDecorator('test1', {})(
              <RadioGroup>
                <Radio value={11}>radio11</Radio>
                <Radio value={22}>radio22</Radio>
                <Radio value={33}>radio33</Radio>
              </RadioGroup>
            )
          }
        </FormItem>
        <FormItem label="前置" {...formItemLayout}>
          <Input />
        </FormItem>
        <FormItem>
          <Button type="primary" htmlType="submit">
            确定
          </Button>
        </FormItem>
      </Form>
      </div>
    );
  }
}

let render = () => {
  ReactDOM.render(<div>
    <DemoForm />
    <Demo1 />
  </div>, MOUNT_NODE);
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
