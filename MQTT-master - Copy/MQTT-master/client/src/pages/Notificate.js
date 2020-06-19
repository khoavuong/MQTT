import React from "react";
import DevicesList from '../components/DevicesList'
import { Layout, Menu , Avatar, Modal, Switch, Row, Col, Button} from 'antd';
import { Form, Input, DatePicker, InputNumber, Select, Radio} from 'antd';
import { PlusCircleOutlined, CheckOutlined, CloseOutlined} from '@ant-design/icons';
import { Link } from "react-router-dom";
import moment from 'moment';
import InitForm from '../components/InitForm'
import Slidebar from "../components/Slidebar";
import NoticeList from "../components/NoticeList";
const { Header, Footer, Sider, Content } = Layout;

class Notificate extends React.Component {
    state = { 
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
      s
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
            <Layout>
                <Slidebar itemClicked = "3"/>
                <Layout>
                    <Header style={{background : '#fff', padding: 0, fontSize: 28,
                                        textAlign: 'center', margin: 12, color : 'lightblue'}}>
                        Notice Board
                    </Header>


                    <Content style={{ margin: '0px 16px', padding: 0, background: '#fff', minHeight: 280 }}>
                        {/* // data =  */}
                        <span>
                            <NoticeList/>
                        </span>
                    </Content>
                    <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
                </Layout>
            </Layout>
            
        );
    }
}

export default Notificate

// ReactDOM.render(<SiderDemo />, mountNode);
