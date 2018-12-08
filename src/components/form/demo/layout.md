---
order: 0
title:
  zh-CN: 表单布局
  en-US: Type
desc:
  zh-CN: 表单有三种布局。
  en-US: Type
---

## zh-CN

## en-US

````jsx
import { Form, Button, Input, Radio } from 'td-ui';

const FormItem = Form.Item;
const FormControl = Form.Control;
const RadioButton = Radio.RadioButton;
const RadioGroup = Radio.RadioGroup;

class Demo extends React.Component {
  constructor() {
    super();
    this.state = {
      formLayout: 'horizontal',
    };
  }
  handleFormLayoutChange = (e) => {
    this.setState({ formLayout: e.target.value });
    console.log(e.target.value);
  }
  render() {
    const { formLayout } = this.state;
    const formItemLayout = formLayout === 'horizontal' ? {
      labelCol: { span: 4 },
      wrapperCol: { span: 6 },
    } : null;
    const buttonItemLayout = formLayout === 'horizontal' ? {
      wrapperCol: { span: 14, offset: 4 },
    } : null;
    const { getFieldDecorator } = this.props.form; // 用法同Form.Control
    return (
      <div>
        <Form layout={formLayout}>
          <FormItem
            label="Form Layout"
            {...formItemLayout}
          >
            <FormControl name="formLayout" initialValue="horizontal">
              <RadioGroup onChange={this.handleFormLayoutChange}>
                <RadioButton value="horizontal">Horizontal</RadioButton>
                <RadioButton value="vertical">Vertical</RadioButton>
              </RadioGroup>
            </FormControl>
          </FormItem>
          <FormItem
            label="Field A"
            {...formItemLayout}
          >
            <FormControl name="formLayout1">
              <Input placeholder="input placeholder" />
            </FormControl>
          </FormItem>
          <FormItem
            label="Field B"
            {...formItemLayout}
          >
          { /*用法同Form.Control*/
            getFieldDecorator('formLayout2')(<Input placeholder="input placeholder" />)
          }
          </FormItem>
          <FormItem {...buttonItemLayout}>
            <Button type="primary">Submit</Button>
          </FormItem>
        </Form>
      </div>
    );
  }
}

const DemoForm = Form.create()(Demo);

ReactDOM.render(
  <DemoForm />
, mountNode);
````
