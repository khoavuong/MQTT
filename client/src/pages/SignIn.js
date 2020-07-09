import React, { useState } from "react";
import { useHistory, Redirect } from "react-router-dom";
import {
  Card,
  CardBody,
  Col,
  Button,
  Form,
  FormGroup,
  Input,
  Spinner,
} from "reactstrap";
import styled from "styled-components";
import iot from "../api/iot";
import ErrorMessage from "../components/ErrorMessage";

const FormWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
  background-color: #434e5e;
`;

const MidSpinner = () => (
  <div
    style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      margin: "10px",
    }}
  >
    <Spinner></Spinner>
  </div>
);

export const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(null);

  const history = useHistory();
  if (localStorage.getItem("accessToken")) return <Redirect to="/" />;

  const toSignUp = () => {
    history.push("/signup");
  };

  const toForgotPassword = () => {
    history.push("/forgot-password");
  };

  const formSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(<MidSpinner />);
    iot
      .post("/api/auth/login", {
        email,
        password,
      })
      .then((res) => {
        localStorage.setItem("accessToken", res.data.data.accessToken);
        localStorage.setItem("username", res.data.data.user.name);
        localStorage.setItem("email", res.data.data.user.email);
        setLoading(null);
        history.push("/");
      })
      .catch((err) => {
        const errMsg = err.response.data.message;
        setLoading(null);
        setError(errMsg);
      });
  };

  return (
    <FormWrapper>
      <Card style={{ backgroundColor: "#edf4ff", width: "600px" }}>
        <CardBody>
          <h1>Hello!</h1>
          <p>Fill in your email and password to sign in.</p>
          {(error && <ErrorMessage message={error} />) || loading}

          <Form onSubmit={formSubmit}>
            <FormGroup row>
              <Col>
                <Input
                  name="email"
                  id="email"
                  placeholder="Your email"
                  autoComplete="off"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
              </Col>
            </FormGroup>

            <FormGroup row>
              <Col>
                <Input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Password"
                  autoComplete="off"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
              </Col>
            </FormGroup>

            <hr style={{ backgroundColor: "black" }} />

            <Button type="submit" color="primary" block>
              Sign In
            </Button>

            <Button color="link" onClick={toForgotPassword}>
              Forgot password?
            </Button>

            <Button color="danger" block onClick={toSignUp}>
              Don't have an account? Sign up now!!!
            </Button>
          </Form>
        </CardBody>
      </Card>
    </FormWrapper>
  );
};
