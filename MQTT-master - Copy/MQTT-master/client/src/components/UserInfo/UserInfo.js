import React, { useState } from "react";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import userimage from "../../assets/user.png";
import Button from "@material-ui/core/Button";
import Aus from "../../hoc/Aus";
import Modal from "../Modal/Modal";
import SetPass from "../SetPass/SetPass";
import AddUser from "../AddUser/AddUser";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: "100%",
    margin: "auto",
    marginTop: "10px",
    marginBottom: "0px",
    height: "70vh",
    width: '100vh',
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    borderWidth: "5px",
    zIndex: "50",
    borderColor: "black",
  },
  media: {
    height: "100px",
    marginTop: "60px",
    paddingTop: "10.25%", // 16:9
    width: "100px",
    borderRadius: "100%",
  },
  avatar: {
    backgroundColor: red[500],
  },
  content: {
    width: "50%",
  },
  field: {
    display: "flex",
    justifyContent: "space-between",
    paddingTop: "10px",
  },
}));

const UserInfo = (props) => {
  const classes = useStyles();
  const [changePasswd, setChangePasswd] = useState(false);
  const [isAddUser, setIsAddUser] = useState(false);
  let modalChild = null;

  function cancelModalHandler() {
    setChangePasswd(false);
    setIsAddUser(false);
  }

  function changePasswdHandler() {
    setChangePasswd(true);
  }

  function addUserHandler() {
    props.login()
  }

  if (changePasswd) {
    modalChild = <SetPass modalClosed={cancelModalHandler} />;
  } else if (isAddUser) {
    modalChild = <AddUser modalClosed={cancelModalHandler} />;
  }

  return (
    <Aus>
      <Modal show={changePasswd || isAddUser} modalClosed={cancelModalHandler}>
        {modalChild}
      </Modal>

      <Card className={classes.root}>
        <CardMedia className={classes.media} image={userimage} title="Avatar" />
        <div>
          <Typography gutterBottom variant="h5" component="h2">
            Admin
          </Typography>
        </div>

        <CardContent className={classes.content}>
          <div className={classes.field}>
            <Typography variant="body2" component="h3">
              Full name:
            </Typography>
            <Typography variant="body2" component="h3">
              admin
            </Typography>
          </div>
          <div className={classes.field}>
            <Typography variant="body2" component="h3">
              Username:
            </Typography>
            <Typography variant="body2" component="h3">
              admin
            </Typography>
          </div>
          <Button size="small" color="primary" onClick={changePasswdHandler}>
            Change Password
          </Button>
          <div className={classes.field}>
            <Typography variant="body2" component="h3">
              Role:
            </Typography>
            <Typography variant="body2" component="h3">
              admin
            </Typography>
          </div>
        </CardContent>
        <Button size="small" color="primary" onClick={addUserHandler}>
          Add user...
        </Button>
      </Card>
    </Aus>
  );
};

export default UserInfo;
