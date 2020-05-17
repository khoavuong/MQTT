import React from 'react';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import {makeStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import userimage from '../../assets/user.png';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
    root: {
      maxWidth: '80%',
      margin: 'auto',
      marginTop: '50px',
      height: '70vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    },
    media: {
      height: '100px',
      paddingTop: '10.25%', // 16:9
      width: '100px',
      borderRadius: '50%'
    },
    avatar: {
      backgroundColor: red[500],
    },
    content:{
      width: '50%'
    },
    field:{
      display: 'flex',
      justifyContent: 'space-between',
      paddingTop: '10px'
    }
  }));

  const UserInfo =(props)=> {
    const classes = useStyles();
    return(
        <Card className={classes.root}>
            <CardMedia
            className={classes.media}
            image={userimage}
            title="Avatar"
            />
            <div>
                <Typography gutterBottom variant="h5" component="h2">
                  Admin
                </Typography>
              </div>
            
            <CardContent className={classes.content}>
              
              <div className={classes.field}>
                <Typography variant="body2" component="p">
                  Full name:
                </Typography>
                <Typography variant="body2" component="p">
                  admin
                </Typography>
              </div>
              <div className={classes.field}>
                <Typography variant="body2" component="p">
                  Username:
                </Typography>
                <Typography variant="body2" component="p">
                  admin
                </Typography>
              </div>
              <Button size="small" color="primary">
              Change Password
            </Button>
              <div className={classes.field}>
                <Typography variant="body2" component="p">
                  Role:
                </Typography>
                <Typography variant="body2" component="p">
                  admin
                </Typography>
              </div>
            
            </CardContent>
            <Button size="small" color="primary">
              Add user...
            </Button>
            
        </Card>
    );  
}

export default UserInfo;