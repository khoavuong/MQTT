import React from "react";
import DevicesList from '../components/DevicesList'
import { Layout, Menu , Avatar, Modal, Switch, Row, Col, Button} from 'antd';
import { Form, Input, DatePicker, InputNumber, Select, Radio} from 'antd';
import { UserOutlined, PlusCircleOutlined, CheckOutlined, CloseOutlined} from '@ant-design/icons';
import { Link } from "react-router-dom";
import moment from 'moment';
import InitForm from '../components/InitForm'
import Slidebar from "../components/Slidebar";
const { Header, Sider, Content } = Layout;

class Device extends React.Component {
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
            <Layout
                aria-orientation = "horizontal">
                <Slidebar/>
                <Layout>
                    <Header style={{background : '#fff', padding: 0, fontSize: 28,
                                        textAlign: 'center', margin: 12, color : 'lightblue'}}>
                        Device Manager
                    </Header>
                        <div className="trigger"  
                        style = {{margin: '24px 12px', textAlign : 'center'}} 
                        >
                                <Button size = "large" type = "primary" onClick={this.showModal}
                                    style = {{width : '600px'}}
                                >
                                    <PlusCircleOutlined />
                                     Add a device observer
                                </Button>
                        </div>
                        <Modal
                            visible={this.state.addDialogShowUp}
                            title="Device Configure"
                            onOk={this.handleOk}
                            onCancel={this.handleCancel}
                            footer={[
                                
                              ]}
                            >
                            <Row>
                            <Col span={12}>Complete the initialize form</Col>

                            </Row>
                        
                          <div>
                            <InitForm close={this.handleCancel}/>
                            
                          </div>
                            
                        </Modal>

                    <Content style={{ margin: '0px 16px', padding: 0, background: '#fff', minHeight: 280 }}>
                        {/* // data =  */}
                        <span>
                            <DevicesList/>
                        </span>
                    </Content>
                </Layout>
            </Layout>
            
        );
    }
}

export default Device

// ReactDOM.render(<SiderDemo />, mountNode);
