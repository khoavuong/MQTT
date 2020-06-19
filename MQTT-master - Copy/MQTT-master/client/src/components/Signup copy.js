import React from 'react';
import {Form, Input, Tooltip, Cascader, Select,Row,Col,Checkbox,Button,AutoComplete,} from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';
import ReCAPTCHA from "react-google-recaptcha";


class SignupForm extends React.Component {

    componentDidMount() {
    }

    onChange(value) {
        console.log("Captcha value:", value);
      }
    
        

    render () {
        const onFinish = values => {
            this.props.close();
        };
        return (
            <Form
            name="register"
            onFinish={onFinish}
            initialValues={{
                residence: ['zhejiang', 'hangzhou', 'xihu'],
                prefix: '86',
            }}
            scrollToFirstError
            >
            <Form.Item
                name="email"
                label="E-mail"
                rules={[
                {
                    type: 'email',
                    message: 'The input is not valid E-mail!',
                },
                {
                    required: true,
                    message: 'Please input your E-mail!',
                },
                ]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                name="password"
                label="Password"
                rules={[
                {
                    required: true,
                    message: 'Please input your password!',
                },
                ]}
                hasFeedback
            >
                <Input.Password />
            </Form.Item>

            <Form.Item
                name="confirm"
                label="Confirm Password"
                dependencies={['password']}
                hasFeedback
                rules={[
                {
                    required: true,
                    message: 'Please confirm your password!',
                },
                ({ getFieldValue }) => ({
                    validator(rule, value) {
                    if (!value || getFieldValue('password') === value) {
                        return Promise.resolve();
                    }

                    return Promise.reject('The two passwords that you entered do not match!');
                    },
                }),
                ]}
            >
                <Input.Password />
            </Form.Item>


            <Form.Item
                name="residence"
                label="Habitual Residence"
                rules={[
                {
                    type: 'array',
                    required: true,
                    message: 'Please select your habitual residence!',
                },
                ]}
            >
            </Form.Item>

            <Form.Item
                name="phone"
                label="Phone Number"
                rules={[
                {
                    required: true,
                    message: 'Please input your phone number!',
                },
                ]}
            >
                <Input
                style={{
                    width: '100%',
                }}
                />
            </Form.Item>


            <Form.Item label="Captcha" extra="We must make sure that your are a human.">
                <Row gutter={8}>
                <ReCAPTCHA
                    sitekey="6LdKRqYZAAAAAA-WSfKtydDUWbkjdb_WYF9ztj3w"
                    onChange={this.onChange}
                />
                </Row>
            </Form.Item>

            <Form.Item
                name="agreement"
                valuePropName="checked"
                rules={[
                {
                    validator: (_, value) =>
                    value ? Promise.resolve() : Promise.reject('Should accept agreement'),
                },
                ]}
            >
                <Checkbox>
                I have read the <a href="">agreement</a>
                </Checkbox>
            </Form.Item>
            <Form.Item style = {{textAlign: 'center'}}>
                <Button style= {{align: 'center'}}type="primary" htmlType="Register" onClick = {this.onFinish}>
                Register
                </Button>
            </Form.Item>
            </Form>
        );
        };

};
export default SignupForm
//ReactDOM.render(<LoginForm />, mountNode);