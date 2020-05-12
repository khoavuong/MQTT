import React from "react";
import styled from "styled-components";
import { Button } from "antd";

const StickyWrapper = styled.div`
  position: sticky;
  top: 0;
  z-index: 10;
`;

const Content = styled.div`
  padding: 20px 50px 20px 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const HrBar = styled.hr`
  margin: 0;
  border: 0.3px solid black;
  opacity: 0.1;
  padding: 0;
`;

const Logo = styled.h1`
  margin: 0;
`;

const RightMenu = styled.div`
  display: flex;
`;

const NavBar = () => {
  return (
    <StickyWrapper>
      <Content>
        <Logo>Logo</Logo>
        <RightMenu>
          <Button type="primary" style={{ marginLeft: "20px" }}>
            Home
          </Button>
          <Button type="primary" style={{ marginLeft: "20px" }}>
            Account
          </Button>
        </RightMenu>
      </Content>
      <HrBar />
    </StickyWrapper>
  );
};

export default NavBar;
