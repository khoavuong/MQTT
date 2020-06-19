import React from 'react'
import reqwest from 'reqwest';
import { List, Avatar, Button, Skeleton, Modal, Switch, Row, Col, Input, Select, InputNumber} from 'antd';
import { CloseOutlined, CheckOutlined } from '@ant-design/icons';
import InitForm from './InitForm';
import moment from 'moment';

const count = 2;
const fakeDataUrl = `https://randomuser.me/api/?results=${count}&inc=name,gender,email,nat&noinfo`;

class NoticeList extends React.Component {

  state = {
    initLoading: true,
    loading: false,
    data: [],
    list: [],
    list_: [{id : 0, date: moment('2020/01/01'), content: "Notice this notice"},
    {id : 1,date: moment('2020/01/01'), content: "Notice this notice"},
    {id : 2,date: moment('2020/01/01'), content: "Notice this notice"},
  {id : 10,date: moment('2020/01/01'), content: "Notice this notice"},
  {id : 11,date: moment('2020/01/01'), content: "Notice this notice"},
  {id : 12,date: moment('2020/01/01'), content: "Notice this notice"}
  ],
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
        className="notice-list"
        loading={initLoading}
        itemLayout="horizontal"
        loadMore={loadMore}
        dataSource={list_}
        renderItem={item => (
          <List.Item>
            
            <Skeleton avatar title={false} loading={item.loading} active>
              <List.Item.Meta
                style = {{marginLeft: 20}}
                
                title={item.content}
                description = {"date : " + item.date}
              />
            </Skeleton>
           
            <td style = {{width : '10px'}}></td>
            <span>|</span>
            <Button type="link" style = {{textAlign : 'left'}} onClick = {this.handleDelete} value = {item.id}>
                  Delete
            </Button>

            
          </List.Item>
        
        )}
      />

    );
  }
}

export default NoticeList;

// ReactDOM.render(<InfiniteListExample />, mountNode);

