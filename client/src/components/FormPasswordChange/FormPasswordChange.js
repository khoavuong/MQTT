import React, { Component } from "react";
import { Formik } from "formik";
import { object, ref, string } from "yup";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import iot from "../../api/iot";
import Spinner from "../Spinner/Spinner";
import Alert from "./Alert";

export default class FormPasswordChange extends Component {
  state = {
    passChangeSuccess: false,
    textRes: "",
  };

  _handleModalClose = () => {
    this.setState(() => ({
      passChangeSuccess: false,
    }));
    this.props.modalClosed();
  };

  _renderModal = () => {
    const onClick = () => {
      this.setState(() => ({ passChangeSuccess: false }));

      this.props.modalClosed();
    };
    return (
      <Alert
        isOpen={this.state.passChangeSuccess}
        onClose={this._handleModalClose}
        handleSubmit={onClick}
        title="Password Reset"
        text={this.state.textRes}
        submitButtonText="Done"
      />
    );
  };

  _handleSubmit = async ({
    currentPass,
    newPass,
    confirmPass,
    setSubmitting,
    resetForm,
  }) => {
    try {
      const res = await iot.put(
        "/api/users/change-password",
        {
          oldPassword: currentPass,
          newPassword: newPass,
        },
        {
          headers: {
            Authorization: localStorage.getItem("accessToken"),
            "Content-Type": "application/json",
          },
        }
      );
      // console.log(res);
      this.setState(() => ({
        passChangeSuccess: true,
        textRes: res.data.message,
      }));
      resetForm();
    } catch (error) {
      // console.log(error.response);
      this.setState(() => ({
        passChangeSuccess: true,
        textRes: error.response.data.message,
      }));
      resetForm();
    }
  };

  render() {
    return (
      <Formik
        initialValues={{
          currentPass: "",
          newPass: "",
          confirmPass: "",
        }}
        validationSchema={object().shape({
          currentPass: string().required("Current password is required"),
          newPass: string().required("New password is required"),
          confirmPass: string()
            .oneOf([ref("newPass")], "Passwords do not match")
            .required("Password is required"),
        })}
        onSubmit={(
          { currentPass, newPass, confirmPass },
          { setSubmitting, resetForm }
        ) =>
          this._handleSubmit({
            currentPass,
            newPass,
            confirmPass,
            setSubmitting,
            resetForm,
          })
        }
      >
        {(props) => {
          const {
            values,
            touched,
            errors,
            handleChange,
            handleBlur,
            handleSubmit,
            isValid,
            isSubmitting,
          } = props;
          return isSubmitting ? (
            <Spinner />
          ) : (
            <Paper className="form form--wrapper" elevation={10}>
              <form className="form" onSubmit={handleSubmit}>
                <FormControl fullWidth margin="dense">
                  <InputLabel
                    htmlFor="password-current"
                    error={Boolean(touched.currentPass && errors.currentPass)}
                  >
                    {"Current Password"}
                  </InputLabel>
                  <Input
                    id="password-current"
                    name="currentPass"
                    type="password"
                    value={values.currentPass}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={Boolean(touched.currentPass && errors.currentPass)}
                  />
                  <FormHelperText
                    error={Boolean(touched.currentPass && errors.currentPass)}
                  >
                    {touched.currentPass && errors.currentPass
                      ? errors.currentPass
                      : ""}
                  </FormHelperText>
                </FormControl>
                <FormControl
                  fullWidth
                  margin="dense"
                  error={Boolean(touched.newPass && errors.newPass)}
                >
                  <InputLabel
                    htmlFor="password-new"
                    error={Boolean(touched.newPass && errors.newPass)}
                  >
                    {"New Password"}
                  </InputLabel>
                  <Input
                    id="password-new"
                    name="newPass"
                    type="password"
                    value={values.newPass}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={Boolean(touched.newPass && errors.newPass)}
                  />
                  <FormHelperText
                    error={Boolean(touched.newPass && errors.newPass)}
                  >
                    {touched.newPass && errors.newPass ? errors.newPass : ""}
                  </FormHelperText>
                </FormControl>
                <FormControl
                  fullWidth
                  margin="dense"
                  error={Boolean(touched.confirmPass && errors.confirmPass)}
                >
                  <InputLabel
                    htmlFor="password-confirm"
                    error={Boolean(touched.confirmPass && errors.confirmPass)}
                  >
                    {"Confirm Password"}
                  </InputLabel>
                  <Input
                    id="password-confirm"
                    name="confirmPass"
                    type="password"
                    value={values.confirmPass}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={Boolean(touched.confirmPass && errors.confirmPass)}
                  />
                  <FormHelperText
                    error={Boolean(touched.confirmPass && errors.confirmPass)}
                  >
                    {touched.confirmPass && errors.confirmPass
                      ? errors.confirmPass
                      : ""}
                  </FormHelperText>
                </FormControl>
                <Button
                  type="submit"
                  variant="text"
                  color="primary"
                  disabled={Boolean(!isValid || isSubmitting)}
                  style={{ margin: "16px" }}
                >
                  {"Reset Password"}
                </Button>
              </form>
              {this._renderModal()}
            </Paper>
          );
        }}
      </Formik>
    );
  }
}
