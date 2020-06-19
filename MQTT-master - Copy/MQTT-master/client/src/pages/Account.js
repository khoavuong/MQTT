import React from "react";
import DevicesList from '../components/DevicesList'
import { Layout, Menu , Avatar, Modal, Switch, Row, Col, Button} from 'antd';
import { Form, Input, DatePicker, InputNumber, Select, Radio} from 'antd';
import { PlusCircleOutlined, CheckOutlined, CloseOutlined} from '@ant-design/icons';
import { Link } from "react-router-dom";
import moment from 'moment';
import InitForm from '../components/InitForm'
import Slidebar from "../components/Slidebar";
import pNoticeList from "../components/NoticeList";
import LoginForm from '../components/Login';
import SignupForm from "../components/Signup";
//
import UserInfo from '../components/UserInfo/UserInfo';
const { Header, Footer, Sider, Content } = Layout;

class Account extends React.Component {
    state = {
        username: "",
        email: "",
        user_signed_in: false,
        showLogin: false,
        showSignup: false,
        loadingModal: false, 
        value : 1
    };

    handleSignup = () => {
      this.setState({ showLogin: false, showSignup: true});
    }
    handleLogin = () => {
      this.setState({ showLogin: true, showSignup: false});
    }
    handleLoginOK = (value) => {
        this.setState({user_signed_in: true, showLogin: false, showSignup: false,
        username: value.username,
        email: value.email,
        });
    }
    handleOk = () => {
        this.setState({ loadingModal: true });
        setTimeout(() => {
          this.setState({ loadingModal: false, showLogin: false, showSignup: false });
        }, 3000);
      };
    
    handleCancel = () => {
        this.setState({ showLogin: false, showSignup: false});
      };
      s
    onClickMenuItem = (item, key) =>{
    }

  
    componentDidMount() {
    }

    render() {
        
        const { value } = this.state;
        return (
            <Layout>
                <Slidebar itemClicked = "2"/>
                <Layout>
                    <Modal
                        visible={this.state.showLogin}
                        title="Log In"
                        onOk={this.handleOk}
                        onCancel={this.handleCancel}
                        footer={[]}>
                        
                        <Row>
                            <Col span={12}>Complete the log in form</Col>

                        </Row>
                        
                        <div>
                            <LoginForm close={this.handleCancel} loginOK = {this.handleLoginOK}/>
                            
                        </div>
                            
                    </Modal>
                    <Modal
                        visible={this.state.showSignup}
                        title="Sign Up"
                        onOk={this.handleOk}
                        onCancel={this.handleCancel}
                        footer={[]}>
                        <Row>
                            <Col span={12}>Fill in the sign up form</Col>

                        </Row>
                        
                        <SignupForm close={this.handleCancel}/>
                        
                            
                    </Modal>

                    <div>
                        <UserInfo signup = {this.handleSignup} login = {this.handleLogin}/>

                    </div>
                    <div style = {{textAlign : 'center'}}>
                    <div>Did you have an account? </div>
                    <Button type="link" block textColor = {this.state.user_signed_in?'gray':'lightblue'} onClick = {this.handleLogin}>
                        Log In
                    </Button>
                    <span>or</span>
                    <Button type="link" block onClick = {this.handleSignup}>
                        Sign Up
                    </Button>
                    </div>

                    <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
            
                </Layout>
                </Layout>
            
        );
    }
}

export default Account

// ReactDOM.render(<SiderDemo />, mountNode);
