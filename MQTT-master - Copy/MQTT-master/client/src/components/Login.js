import React from 'react';
import { Form, Input, Button, Checkbox } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

const INITIAL_STATE = {
    email: '',
    password: '',
    error: null,
  };
class LoginForm extends React.Component {
    
    constructor(props) {
        super(props);
     
        this.state = { ...INITIAL_STATE };
      }
     
    onChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    };

    componentDidMount() {
    }

    render () {

        const { email, password, error } = this.state;
 
        const isInvalid = password === '' || email === '';
        
        const onFinish = values => {
            var success = false
          /*
          TODO :SignInWithEmailAndPassword(email, password)
           variable: 
          email: strign
          password: string
          
          At this scope ready
         =====================================================
         
        */
            if (success)this.props.loginOK();
            this.props.close();
        };
        return (
            <Form
                name="normal_login"
                className="login-form"
                initialValues={{ remember: true }}
                onFinish={onFinish}
            >
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
                        prefix={<UserOutlined className="site-form-item-icon" />}
                        name="email"
                        value={email}
                        onChange={this.onChange}
                        type="text"
                        placeholder="Email Address"/>
                </Form.Item>
                <Form.Item
                    name="password_"
                    rules={[{ required: true, message: 'Please input your Password!' }]}
                >
                    <Input
                        prefix={<LockOutlined className="site-form-item-icon" />}
                        type="password"
                        placeholder="Password"
                        name="password"
                        value={password}
                        onChange={this.onChange}
                    />
                </Form.Item>
                <Form.Item>
                    <Form.Item name="remember" valuePropName="checked" noStyle>
                        <Checkbox>Remember me</Checkbox>
                    </Form.Item>

                    <a className="login-form-forgot" href="">
                        Forgot password
                    </a>
                </Form.Item>

                <Form.Item style = {{textAlign: 'right'}}>
                    <Button style = {{width: '100%'}}type="primary" htmlType="submit" className="login-form-button">
                        Log in
                    </Button>
                </Form.Item>
            </Form>
        );
    }
};
export default LoginForm
//ReactDOM.render(<LoginForm />, mountNode);