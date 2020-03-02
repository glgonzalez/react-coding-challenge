import React, { Fragment } from 'react';
import { Grid, Typography} from '@material-ui/core';
import { Message } from '../message';


export const MessageGrid = ({errors, warnings, info, clear}) => {
  const renderList = (messages) => {
    return (
      <Fragment>
        {messages.map(message => 
          <Message 
            key={message.id} 
            message={message} 
            clear={clear}/>)}
      </Fragment>
    )
  }

  return (
    <Grid container spacing={2} justify="center">
      <Grid item xs={4}>
        <Typography variant="h6">
          Error Type 1
        </Typography>
        <Typography variant="body2">
          {`Count ${errors.length}`}
        </Typography>{renderList(errors)}
      </Grid>
      <Grid item xs={4}>
        <Typography variant="h6">
          Warning Type 2
        </Typography>
        <Typography variant="body2">
          {`Count ${warnings.length}`}
        </Typography>
        {renderList(warnings)}
      </Grid>
      <Grid item xs={4}>
        <Typography variant="h6">
          Info Type 3
        </Typography>
        <Typography variant="body2">
          {`Count ${info.length}`}
        </Typography>
        {renderList(info)}
      </Grid>
    </Grid>
  );
}