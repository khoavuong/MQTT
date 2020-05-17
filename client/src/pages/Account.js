import React from "react";
import SideBar from "../components/SideBar/SideBar";
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import EqualizerIcon from '@material-ui/icons/Equalizer';
import ToysIcon from '@material-ui/icons/Toys';
import {Route} from 'react-router-dom';
import UserInfo from '../components/UserInfo/UserInfo';
import style from './Account.module.css';

const items = [
  {name: "userInformation", label: "User Info", Icon: AccountCircleIcon, url: "/account/info"},
  "divider",
  {
    name: "statistic",
    label: "Activity Logs",
    Icon: EqualizerIcon,
    items: [
      {
        name: "generalLogs",
        label: "General Logs",
        
      },
      {
        name: "detailedLogs",
        label: "Detailed Logs",
        
      }
    ]
  },
  "divider",
  {
    name: "manageDevices",
    label: "Manage Devices",
    Icon: ToysIcon,
    
  }
];

export const Account = (props) => {
  console.log(props);
  return (
    <div className={style.Account}>
      <div className={style.SideBar}>
        <SideBar items = {items} {...props}/>
      </div>
      <div className={style.Page}>
        <Route path="/account/info" component={UserInfo}/>
      </div>
      
    </div>
    );
};
