import React from 'react';
import Select from '../index';
import Form from '../../form';
const Option = Select.Option;
const FormItem = Form.Item;
@Form.create()
export default class Basic extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      arr: ['10', '20', '30', 'zhifang.zhou'],
      value: '10'
    }
  }
  handleChange = value => {
    this.setState({value});
  }
  render() {
    const { value, arr } = this.state;
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 12 }
    };
    return (
      <div>
        {/* <Select placeholder='请选择' style={{ width: 120 }} defaultValue={value} size='small'>
          {
            arr.map((item, index) => <Option value={item} key={item}>{item}条／页</Option>)
          }
        </Select> */}
        <Form>
          <FormItem
                label="事件类型"
                {...formItemLayout}
              >
                {
                  getFieldDecorator('value', {
                    initialValue: value,
                    rules: [{ required: true, message: '请选择事件类型!' }]
                  })(
                    <Select placeholder='请选择' showSearch>
                      {
                        arr.map((item, index) => <Option value={item} key={`${item}_${index}`}>{item}条／页</Option>)
                      }
                    </Select>
                  )
                }
              </FormItem>
        </Form>
      </div>
    )
  }
}
