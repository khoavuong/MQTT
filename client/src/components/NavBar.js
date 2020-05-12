import React from "react";
import styled from "styled-components";
import { Layout, Menu } from "antd";
import { useHistory } from "react-router-dom";

const { Header } = Layout;

const Logo = styled.div`
  width: 120px;
  height: 31px;
  background: rgba(255, 255, 255, 0.2);
  margin: 16px 24px 16px 0;
  float: left;
`;

const NavBar = () => {
  const history = useHistory();

  return (
    <Header>
      <Logo></Logo>
      <Menu
        theme="dark"
        mode="horizontal"
        defaultSelectedKeys={[history.location.pathname]}
      >
        <Menu.Item
          key="/"
          onClick={() => {
            history.push("/");
          }}
        >
          Home
        </Menu.Item>
        <Menu.Item
          key="/account"
          onClick={() => {
            history.push("/account");
          }}
        >
          Account
        </Menu.Item>
      </Menu>
    </Header>
  );
};

export default NavBar;
