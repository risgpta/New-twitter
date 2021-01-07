import React,{useState,useEffect} from 'react';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import {openSnackbar} from '../actions/miscAction';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: '0%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));

function CustomizedSnackbars(props) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  useEffect(() => {
    console.log(props.openData);
    if(props.openData.msg)
    {
      setOpen(true);
    }
  }, [props.openData])

  return (
    <div className={classes.root}>
      <Snackbar open={open} autoHideDuration={2500} onClose={handleClose}>
        {
          props.openData.type === 0 ?
          <Alert onClose={handleClose} severity="error">
          {props.openData.msg}
          </Alert>
          :
          props.openData.type === 1 ?
          <Alert onClose={handleClose} severity="success">
          {props.openData.msg}
          </Alert>
          :
          props.openData.type === 2 ?
          <Alert onClose={handleClose} severity="warning">
          {props.openData.msg}
          </Alert>
          :
          props.openData.type === 3 ?
          <Alert onClose={handleClose} severity="info">
          {props.openData.msg}
          </Alert>
          :
          <Alert onClose={handleClose} severity="info">
          {'Loading...'}
          </Alert>
        }
      </Snackbar>
    </div>
  );
}

const mapStateToProps = (state) => ({
  success : state.loginReducer.done, 
  openData : state.miscActionReducer.open,
});

const mapDispatchToProps = (dispatch) => {
  return {
      openSnackbar: (payload) => dispatch(openSnackbar(payload)),
  };
};

export default connect(mapStateToProps,mapDispatchToProps)(CustomizedSnackbars);