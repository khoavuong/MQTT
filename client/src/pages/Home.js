import React from "react";
import styled from "styled-components";
import { Chart } from "../components/Chart";
import { Controller } from "../components/Controller";
import NavBar from "../components/NavBar";
import { Redirect } from "react-router";

const Container = styled.div`
  margin: auto;
  width: 100%;
  max-width: 860px;
  padding: 20px;
  box-sizing: border-box;
`;

export const Home = () => {
  if (!localStorage.getItem("accessToken")) return <Redirect to="/signin" />;

  return (
    <>
      <NavBar></NavBar>
      <Container>
        <Controller></Controller>
        <br />
        <Chart></Chart>
      </Container>
    </>
  );
};
