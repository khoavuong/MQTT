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

export const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const history = useHistory();
  if (localStorage.getItem("accessToken")) return <Redirect to="/" />;

  const toSignIn = () => {
    history.push("/signin");
  };

  const formSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    iot
      .post("/api/auth/register", {
        name,
        email,
        password,
      })
      .then((res) => {
        history.push("/signin");
      })
      .catch((err) => {
        const errMsg = err.response.data.message;
        setError(errMsg);
      });
  };

  return (
    <FormWrapper>
      <Card style={{ backgroundColor: "#edf4ff", width: "600px" }}>
        <CardBody>
          <h1>Join us</h1>
          <p>Start managing devices easily.</p>
          {error && <ErrorMessage message={error} />}

          <Form onSubmit={formSubmit}>
            <FormGroup row>
              <Col>
                <Input
                  name="name"
                  id="name"
                  placeholder="Your name"
                  autoComplete="off"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                />
              </Col>
            </FormGroup>

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
            <p>
              Passwords must contain at least 1 upper case letter, 1 lower case
              letter and one number OR special charracter.
            </p>
            <hr style={{ backgroundColor: "black" }} />

            <Button type="submit" color="primary" block>
              Sign Up
            </Button>

            <Button color="danger" block onClick={toSignIn}>
              Return to Sign in
            </Button>
          </Form>
        </CardBody>
      </Card>
    </FormWrapper>
  );
};
