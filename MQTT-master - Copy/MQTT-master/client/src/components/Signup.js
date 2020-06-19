import React from 'react';
import {Form, Input, Tooltip, Cascader, Select,Row,Col,Checkbox,Button,AutoComplete,} from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';
import ReCAPTCHA from "react-google-recaptcha";


const INITIAL_STATE = {
    username: '',
    email: '',
    passwordOne: '',
    passwordTwo: '',
    error: null,
  };
    
class SignupForm extends React.Component {


    constructor(props) {
        super(props);
     
        this.state = { ...INITIAL_STATE };
    }

    onChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    };
     
    render () {
                
        const {
            username,
            email,
            passwordOne,
            passwordTwo,
            error,
        } = this.state;

        const onFinish = values => {
            var success = false
            console.log("email, passwordOne")
        
            /*
            TODO :SignUpWithEmailAndPassword(email, password)
            variable: 
            email: strign
            password: string
            username:string
            At this scope ready
            =====================================================
            
            */
            

            if (success)this.props.loginOK();
            
            this.props.close();
            };
        return (
            <Form
                name="register"
                onFinish={onFinish}
                scrollToFirstError
            >
            <Form.Item
                name="username_"
                label="Username"
                rules={[
                {
                    required: true,
                    message: 'Please input your E-mail!',
                },
                ]}
            >
                <Input 
                    name="username"
                    value={username}
                    onChange={this.onChange}
                    type="text"
                    placeholder="Full Name"
                    />
            </Form.Item>
            <Form.Item
                name="email_"
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
                <Input 
                    name="email"
                    value={email}
                    onChange={this.onChange}
                    type="text"
                    placeholder="Email Address"
                    />
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
                <Input.Password 
                    name="passwordOne"
                    value={passwordTwo}
                    onChange={this.onChange}
                    type="password"
                    placeholder="Password"
                    />
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
                <Input.Password 
                    name="passwordTwo"
                    value={passwordOne}
                    onChange={this.onChange}
                    type="password"
                    placeholder="Confirm Password"
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
                <Button style= {{align: 'center'}}type="primary" htmlType="Register" 
                onClick = {this.onFinish}>
                Register
                </Button>
            </Form.Item>
            {error && <p>{error.message}</p>}
            </Form>
     
            
        );
        };


};
export default SignupForm
//ReactDOM.render(<LoginForm />, mountNode);