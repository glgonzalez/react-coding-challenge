import React, { Fragment } from 'react';
import { makeStyles, IconButton, Snackbar, SnackbarContent } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles({
  root: {
    backgroundColor: '#F56236',
    width: '300px'
  }
});

export const CustomSnackbar = ({error, handleClose}) => {
  const classes = useStyles();
  return (
    <Snackbar 
      anchorOrigin={{vertical: 'top', horizontal: 'center'}}
      autoHideDuration={2000}
      open={!!error}
      onClose={handleClose}
    >
      <SnackbarContent 
        classes={{root: classes.root}}
        message={error}
        action={
          <Fragment>
            <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
              <CloseIcon fontSize="small" />
            </IconButton>
          </Fragment>
        }
      />
    </Snackbar>
  );
}