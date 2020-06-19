
import React, { useState } from 'react';
import { Row, Col, Button } from 'antd';
import { Form, Input, DatePicker, InputNumber, Select, Radio, Switch} from 'antd';
import { DownOutlined, UpOutlined } from '@ant-design/icons';
import ReactDOM from'react-dom';
import moment from 'moment';
import { Link } from 'react-router-dom';


const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};
const validateMessages = {
  required: '${label} is required!',
  types: {
    number: '${label} is not a validate number!',
  },
  number: {
    range: '${label} must be between ${min} and ${max}',
  },
};
class InitForm extends React.Component {
  state = 
  {
    radioValue : 0
  }

  onRadioChange = e => {
    console.log('radio checked', e.target.value);
    this.setState({
      radioValue: e.target.value,
    });
  };

  formRef = React.createRef();

  componentDidMount() {
    
  }

  

  
  render() {
    const radioStyle = {
      display: 'block',
      height: '30px',
      lineHeight: '30px',
    };

    const onFinish = values => {
      console.log(values);
      this.props.Close();
      
    };
    
    return (
        <Form {...layout} name="nest-messages" onFinish={onFinish} validateMessages={validateMessages}>          
            <Form.Item label="Type of Device" name='device_type'>
              <Radio.Group onChange={//event => setValue(event.target.value)
              this.onRadioChange
            } value={this.state.radioValue}
              defaultValue = {0}
              initialValues={{
                device_type : this.state.radioValue,
                device_date : moment(),
                device_active : true
                }} 
              >
                  <Radio style={radioStyle} value={0}>
                  Temp
                  </Radio>
                  <Radio style={radioStyle} value={1}>
                  Humid
                  </Radio>
                  <Radio style={radioStyle} value={2}>
                  Wind
                  </Radio>
              </Radio.Group>
            </Form.Item>
            
            <Form.Item
              name='device_name'
              label="Name"
              rules={[
                  {
                    required: true,
                    message: 'Input something!',
                  },
                ]}
              >
              <Input />
            </Form.Item>
            
            <Form.Item label="Ngày tạo" name = 'device_date'>
              <DatePicker 
                defaultValue = {moment()}
                format={'YYYY/MM/DD'}
                va
              />

            </Form.Item>
            <Form.Item 
                name = 'device_temp'
                label="Nhiệt độ"
                rules={this.state.radioValue === 0 ? [
                  {
                    required : true,
                    type: 'number',
                    message : 'This is not right!',
                    transform : (value) => {
                      return Number(value)
                    },
                    min: 0,
                    max: 99,
                  },
                ]
                :
                []}>
                <span>
                  <InputNumber
                  disabled = {this.state.radioValue !== 0}
                  />
                  <td style = {{width : '10px'}}></td>
                  đơn vị
                </span>

            </Form.Item>

            <Form.Item 
                name = 'device_humid'
                label="Độ ẩm"
                rules={this.state.radioValue === 1 ?[
                  {
                    required : true,
                    type: 'number',
                    message : 'This is not right!',
                    transform : (value) => {
                      return Number(value)
                    },
                    min: 0,
                    max: 99,
                  },
                ]
                :
                []}
              >
                <span>
                  <InputNumber
                  disabled = {this.state.radioValue !== 1}
                  />
                  <td style = {{width : '10px'}}></td>
                  đơn vị
                </span>

            </Form.Item>

            <Form.Item
                name = 'device_wind'
                label="Sức gió"
                  rules={[
                    {
                      required : this.state.radioValue === 2
                    },
                  ]}
                >
              <Select
                disabled = {this.state.radioValue !== 2}
              >
                <Select.Option value = "1"> Level 1 </Select.Option>
                <Select.Option value = "2"> Level 2</Select.Option>
              </Select>
            </Form.Item>

            <Form.Item name = 'device_active'
            label = "Hoạt động ngay">
              <Switch defaultChecked/>
                </Form.Item>

            <div style = {{textAlign : 'right'}}>
              <Button type="primary" htmlType="submit" style = {{width : '60%', paddingRight :'8px'}}>
                Submit
              </Button>
            </div>


        </Form>
    );
 }
};



export default InitForm; 

ReactDOM.render(<InitForm />, document.getElementById("root"));