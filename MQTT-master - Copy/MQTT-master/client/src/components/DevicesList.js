import React from 'react'
import reqwest from 'reqwest';
import { List, Avatar, Button, Skeleton, Modal, Switch, Row, Col, Input, Select, InputNumber} from 'antd';
import { CloseOutlined, CheckOutlined } from '@ant-design/icons';
import InitForm from './InitForm';
import moment from 'moment';

const count = 2;
const fakeDataUrl = `https://randomuser.me/api/?results=${count}&inc=name,gender,email,nat&noinfo`;

class DevicesList extends React.Component {

  state = {
    initLoading: true,
    loading: false,
    data: [],
    list: [],
    list_: [{id : 0, name : 'Device A', type: 0, date: moment('2020/01/01'), temp : 20, humid: null, wind : null, active : true},
    {id : 1,name : 'Device B', type: 1, date: moment('2020/01/01'), temp : null, humid: 100, wind : null, active : true},
    {id : 2,name : 'Device C', type: 2, date: moment('2020/01/01'), temp : null, humid: null, wind : 1, active : true},
  {id : 10,name : 'Device D', type: 0, date: moment('2020/01/01'), temp : 22, humid: null, wind : null, active : false},
  {id : 11,name : 'Device E', type: 1, date: moment('2020/01/01'), temp : null, humid: 90, wind : null, active : false},
  {id : 12,name : 'Device F', type: 2, date: moment('2020/01/01'), temp : null, humid: null, wind : 2, active : false}
  ],
  visiable: -1,
};
  showModal = (event) => {
    var id = event.target.value;
    var index = this.find(id, this.state.list_);
    var item = this.state.list_[index];
    this.setState({
      visiable: item.id,
    });
    console.log(item)
  };

  handleOk = () => {
    this.setState({ loadingModal: true });
    setTimeout(() => {
      this.setState({ loadingModal: false, visible: false });
    }, 3000);
  };

  handleCancel = () => {
    this.setState({ visiable: -1 });
  };

  componentDidMount() {
    this.getData(res => {
      this.setState({
        initLoading: false,
        data: res.results,
        list: res.results,
      });
    });
  }

  getData = callback => {
    reqwest({
      url: fakeDataUrl,
      type: 'json',
      method: 'get',
      contentType: 'application/json',
      success: res => {
        callback(res);
      },
    });
  };

  onLoadMore = () => {
    this.setState({
      loading: true,
      list: this.state.data.concat([...new Array(count)].map(() => ({ loading: true, name: {} }))),
    });
    this.getData(res => {
      const data = this.state.data.concat(res.results);
      this.setState(
        {
          data,
          list: data,
          loading: false,
        },
        () => {
          window.dispatchEvent(new Event('resize'));
        },
      );
    });
  };

  find = (id, list_) =>{
    var i = 0;    
    while (i < list_.length && parseInt(list_[i].id) != id) {
      i++;
    }
    return i !== list_.length ? i : -1;
 
  }

  handleDelete = (item) => {

    var id = item.target.value;
    var index;
  
    index = this.find(id, this.state.list_);
    const newlist = [].concat(this.state.list_) // Clone array with concat or slice(0)
    newlist.splice(index, 1);
    this.setState({list_: newlist});   
    console.log(this.state.list_)

  }
    //

  argu = (item) => {

    return (
      {
        id : 0, 
        name : 'Device X', 
        type: 0, 
        date: moment(), 
        temp : 20, 
        humid: null,
        wind : null, 
        active : true 
      }
    )
    }

  render() {
    const { initLoading, loading, list_ } = this.state;
    const loadMore =
      !initLoading && !loading ? (
        <div
          style={{
            textAlign: 'center',
            marginTop: 12,
            height: 32,
            lineHeight: '32px',
          }}
        >
          <Button onClick={this.onLoadMore}>loading more</Button>
        </div>
      ) : null;

    return (

      <List
        className="loadmore-list"
        loading={initLoading}
        itemLayout="horizontal"
        loadMore={loadMore}
        dataSource={list_}
        renderItem={item => (
          <List.Item>
            <Skeleton avatar title={false} loading={item.loading} active>
              <List.Item.Meta
                avatar={
                  <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                }
                title={item.name}
                description = {"type : " + item.type + ", date : " + item.date}
              />
            </Skeleton>
            <td style = {{width : '10px'}}></td>
            <Button onClick = {this.showModal} value = {item.id}>
                  Manage
            </Button>
            
            <td style = {{width : '10px'}}></td>
            <span>|</span>
            <Button type="link" style = {{textAlign : 'left'}} onClick = {this.handleDelete} value = {item.id}>
                  Delete
            </Button>

            <Modal
              visible={this.state.visiable == item.id}
              title="Device Configure"
              onOk={this.handleOk}
              onCancel={this.handleCancel}
              footer={[
                <Button key="back" onClick={this.handleCancel}>
                  Return
                </Button>,
                <Button key="submit" type="primary" loading={this.state.loadingModal} onClick={this.handleOk}>
                  Submit
                </Button>,
              ]}
            >
                <Row>
                  <Col span={12}>Hoạt động</Col>
                  <Col span={12} style = {{textAlign :'left'}}>
                    <Switch
                        checkedChildren={<CheckOutlined />}
                        unCheckedChildren={<CloseOutlined />}
                        defaultChecked = {item.active}
                    />
                  </Col>
                </Row>
                
                <InitForm starter = {"DeviceList"} item = {item}/>
                  
          </Modal>
        
          </List.Item>
        
        )}
      />

    );
  }
}

export default DevicesList;

// ReactDOM.render(<InfiniteListExample />, mountNode);

