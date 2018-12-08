---
order: 0
title:
  zh-CN: 校验
  en-US: Type
desc:
  zh-CN: 我们提供了 `validateStatus` `help` `hasFeedback` 等属性，你可以不需要使用 `Form.create`，自己定义校验的时机和内容。
  en-US: Type
---

## zh-CN

## en-US

There are `primary` button, `default` button, and `dashed` button in td-ui.

````jsx
import { Form, Button, Input, Col, DatePicker } from 'td-ui';

const FormItem = Form.Item;
const FormControl = Form.Control;

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 5 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 6 },
  },
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
              sm: { span: 5 },
            }}
            wrapperCol={{
              xs: { span: 24 },
              sm: { span: 19 },
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

ReactDOM.render(
  <DemoForm />
, mountNode);
````
