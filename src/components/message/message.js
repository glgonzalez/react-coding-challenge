import React from 'react';
import { makeStyles, Paper, Grid, Button, Typography } from '@material-ui/core';

const useStyles = makeStyles({
  errors: {
    backgroundColor: '#F56236',
    maxWidth: '400px',
    padding: '20px',
    margin: '5px'
  },
  warnings: {
    backgroundColor: '#FCE788',
    maxWidth: '400px',
    padding: '20px',
    margin: '5px'
  },
  info: {
    backgroundColor: '#88FCA3',
    maxWidth: '400px',
    padding: '20px',
    margin: '5px'
  }
});

export const Message = ({message, clear}) => {
  const classes = useStyles();

  const getMessageStyle = (messagePrio) => {
    let style = {};
    switch (messagePrio) {
      case 1:
        style = classes.errors;
        break;
      case 2: 
        style = classes.warnings;
        break;
      case 3:
        style = classes.info;
        break;
      default:
        throw new Error('Invalid Priority');
    }

    return style;
  }

  return (
    <Paper classes={{root: getMessageStyle(message.priority)}}>
      <Grid container justify="center">
        <Grid item xs={9}>{message.message}</Grid>
        <Grid item xs={3}>
          <Button onClick={() => clear(message.id, message.priority)}>clear</Button>
        </Grid>
      </Grid>
    </Paper>
  );
}