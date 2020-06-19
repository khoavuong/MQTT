import React from "react";
import DevicesList from '../components/DevicesList'
import { Layout, Menu , Avatar, Modal, Switch, Row, Col, Button} from 'antd';
import { Form, Input, DatePicker, InputNumber, Select, Radio, } from 'antd';
import { BrowserRouter as Router, Route, Link, NavLink } from "react-router-dom";
import { UserOutlined, NotificationOutlined, PlusCircleOutlined, CheckOutlined, CloseOutlined, UsbOutlined} from '@ant-design/icons';
import moment from 'moment';
import InitForm from './InitForm'
const { Header, Sider, Content } = Layout;





class Slidebar extends React.Component {

    state = {
        ic : this.props.itemClicked,
        addDialogShowUp: false,
        value : 1
    };

    showModal = () => {
        this.setState({
            addDialogShowUp: true,
        });
      };
    
    handleOk = () => {
        this.setState({ loadingModal: true });
        setTimeout(() => {
          this.setState({ loadingModal: false, addDialogShowUp: false });
        }, 3000);
      };
    
    handleCancel = () => {
        this.setState({ addDialogShowUp: false });
      };
    
    handleOnClick = () => {
        console.log("??")
      };
    
    onClickMenuItem = (item, key) =>{
    }

    onChange = e => {
        console.log('radio checked', e.target.value);
        this.setState({
          value: e.target.value,
        });
      };

    render() {
        const radioStyle = {
            display: 'block',
            height: '30px',
            lineHeight: '30px',
        };
        const { value } = this.state;
        return (
                <Sider
                    trigger={null}

                    theme = "light"
                >
                    <div className="logo" />
                    <div style = {{textAlign: 'center', height : '1000', margin : '60px 0 10px 0'}}>
                        <Avatar size={64} icon={<UserOutlined />} />
                    </div>
                    
                    <div style = {{textAlign: 'center', color : '#000'}}
                    >
                        abc@gmail.com
                    </div>


                    <Menu style = {{margin : '60px 0 0 0'}}
                        theme="light" mode="inline" 
                        defaultSelectedKeys = {this.state.ic}
                        >
                        
                        
                        <Menu.Item key="1"
                            >
                            <UsbOutlined />
                            <span>Device </span>
                            <Link to="/device" />
                        </Menu.Item>

                        <Menu.Item key="2"
                            >
                            <UserOutlined />
                            User
                            <Link to="/account" />
                               
                        </Menu.Item>

                        <Menu.Item key="3"
                            >
                            <NotificationOutlined />
                            Notificate
                            <Link to="/notificate"/>
                        </Menu.Item>
                    </Menu>
                </Sider>
       
        );
    }
}

export default Slidebar

// ReactDOM.render(<SiderDemo />, mountNode);
