import React from "react";
import SideBar from "../components/SideBar/SideBar";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import EqualizerIcon from "@material-ui/icons/Equalizer";
import ToysIcon from "@material-ui/icons/Toys";
import { Route } from "react-router-dom";
import UserInfo from "../components/UserInfo/UserInfo";
import style from "./Account.module.css";
import NavBar from "../components/NavBar";
import { Redirect } from "react-router";
import GeneralLog from "../components/GeneralLog/GeneralLog";

const items = [
  {
    name: "userInformation",
    label: "User Info",
    Icon: AccountCircleIcon,
    url: "/account/info",
  },
  "divider",
  {
    name: "statistic",
    label: "Activity Logs",
    Icon: EqualizerIcon,
    items: [
      {
        name: "generalLogs",
        label: "General Logs",
        url: "/account/general-log",
      },
      {
        name: "detailedLogs",
        label: "Detailed Logs",
      },
    ],
  },
  "divider",
  {
    name: "manageDevices",
    label: "Manage Devices",
    Icon: ToysIcon,
  },
];

export const Account = (props) => {
  if (!localStorage.getItem("accessToken")) return <Redirect to="/signin" />;

  // console.log(props);
  return (
    <>
      <NavBar></NavBar>
      <div className={style.Account}>
        <div className={style.SideBar}>
          <SideBar items={items} {...props} />
        </div>
        <div className={style.Page}>
          <Route path="/account/info" component={UserInfo} />
          <Route path="/account/general-log" component={GeneralLog} />
        </div>
      </div>
    </>
  );
};
