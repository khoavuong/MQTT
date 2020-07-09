import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import iot from "../api/iot";
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
import Alert from "../components/FormPasswordChange/Alert";

const FormWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
  background-color: #434e5e;
`;

export const ForgotPassword = (props) => {
  const [isShowAlert, setIsShowAlert] = useState(false);
  const [resText, setResText] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  async function formSubmit(event) {
    event.preventDefault();
    const data = new FormData(event.target);
    console.log(data.get("email"));
    console.log(history);
    try {
      setLoading(true);
      const res = await iot.post("/api/auth/reset-password", {
        email: data.get("email"),
      });
      setLoading(false);
      setResText(res.data.message);
      setIsShowAlert(true);
    } catch (error) {
      console.log(error);
    }
  }

  function toSignIn() {
    history.push("/signin");
  }

  return (
    <FormWrapper>
      <Card style={{ backgroundColor: "#edf4ff", width: "600px" }}>
        <CardBody>
          <h1>Forgot password</h1>
          <p>Please fill in your email</p>

          <Form onSubmit={formSubmit}>
            <FormGroup row>
              <Col>
                <Input
                  name="email"
                  id="email"
                  placeholder="Your email"
                  autoComplete="off"
                />
              </Col>
            </FormGroup>

            <Button type="submit" color="primary" outline>
              Send
            </Button>
            {loading ? <Spinner></Spinner> : null}
            <Button color="link" onClick={toSignIn}>
              Return to signin
            </Button>
          </Form>
        </CardBody>
      </Card>
      <Alert
        isOpen={isShowAlert}
        handleClose={() => setIsShowAlert(false)}
        handleSubmit={() => setIsShowAlert(false)}
        text={resText}
        title="We will send a mail with instructions for you to reset your password."
        submitButtonText="Done"
      />
    </FormWrapper>
  );
};
