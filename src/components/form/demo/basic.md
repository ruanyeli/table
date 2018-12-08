---
order: 0
title:
  zh-CN: 基本用法
  en-US: Type
desc:
  zh-CN: 最基本的用法，展示了 dataSource、titles 以及回调函数 onChange 的用法。
  en-US: Type
---

## zh-CN

## en-US

There are `primary` button, `default` button, and `dashed` button in td-ui.

````jsx
import { Form, Button, Input } from 'td-ui';

const FormItem = Form.Item;
const FormControl = Form.Control;

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
    const { getFieldDecorator } = this.props.form; // 用法同Form.Control
    return (
      <Form onSubmit={this.handleSubmit} style={{width: 200}}>
        <FormItem>
        {
          getFieldDecorator('userName', { rules: [{ required: true, message: '请输入用户名!' }] })(<Input placeholder="请输入..."/>)
        }
        </FormItem>
        <FormItem>
          <Button type="primary" htmlType="submit">
            确定
          </Button>
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
