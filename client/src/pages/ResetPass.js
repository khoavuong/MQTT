import React, { useState } from "react";
import styled from "styled-components";
import iot from "../api/iot";
import { useHistory } from "react-router-dom";
import {
  Card,
  CardBody,
  Col,
  Button,
  Form,
  FormGroup,
  Input,
  Spinner,
  Label,
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

export const ResetPass = (props) => {
  const [isShowAlert, setIsShowAlert] = useState(false);
  const [resText, setResText] = useState("");
  const [isMatch, setIsMatch] = useState(true);
  const [loading, setLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const history = useHistory();

  async function formSubmit(event) {
    event.preventDefault();
    const data = new FormData(event.target);
    // console.log(data.get("email"));
    if (data.get("password") !== data.get("confirmPassword")) setIsMatch(false);
    else
      try {
        setIsMatch(true);
        setLoading(true);
        const res = await iot.put(
          `/api/auth/reset-password/${props.match.params.resetPasswdToken}`,
          {
            password: data.get("password"),
          }
        );
        console.log(res);
        setLoading(false);
        setResText(res.data.message);
        setIsSuccess(true);
        setIsShowAlert(true);
      } catch (error) {
        console.log(error.response);
        setLoading(false);
        setResText(error.response.data.message);
        setIsSuccess(false);
        setIsShowAlert(true);
      }
  }
  return (
    <FormWrapper>
      <Card style={{ backgroundColor: "#edf4ff", width: "600px" }}>
        <CardBody>
          <h1>Reset your password</h1>
          <p>Please type your new password.</p>

          <Form onSubmit={formSubmit}>
            <FormGroup row>
              <Col>
                <Input
                  name="password"
                  id="password"
                  autoComplete="off"
                  type="password"
                />
              </Col>
            </FormGroup>
            <Label>Confirm:</Label>
            <FormGroup row>
              <Col>
                <Input
                  name="confirmPassword"
                  id="confirmPassword"
                  autoComplete="off"
                  type="password"
                />
              </Col>
            </FormGroup>
            {isMatch ? null : (
              <p style={{ color: "red" }}>Passwords do not match.</p>
            )}

            <Button type="submit" color="primary" outline>
              Submit
            </Button>
            {loading ? <Spinner></Spinner> : null}
          </Form>
        </CardBody>
      </Card>
      <Alert
        isOpen={isShowAlert}
        handleClose={() => {
          // setIsShowAlert(false);
          history.push("/signin");
        }}
        handleSubmit={() => {
          // setIsShowAlert(false);
          history.push("/signin");
        }}
        text={resText}
        title={isSuccess ? "Success" : "Fail"}
        submitButtonText="Done"
      />
    </FormWrapper>
  );
};
