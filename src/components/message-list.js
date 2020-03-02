import React, { Fragment } from 'react'
import Button from '@material-ui/core/Button'
import { Divider, Grid, Toolbar, Typography, Container } from '@material-ui/core';
import Api from '../api'
import { Message } from './message';
import { CustomSnackbar } from './custom-snackbar';



class MessageList extends React.PureComponent {
  constructor(...args) {
    super(...args)
    this.state = this.props.messages || {
      errors: [],
      warnings: [],
      info: [],
      error: ''
    }
  }

  api = new Api({
    messageCallback: (message) => {
      this.messageCallback(message)
    },
  })

  componentDidMount() {
    this.api.start()
  }

  messageCallback(message) {
    const { errors, warnings, info } = this.state
    if(message.priority === 1) {
      this.setState({
        errors: [
          message,
          ...errors
        ],
        error: message.message
      });
    } else if(message.priority === 2) {
      this.setState({
        warnings: [
          message,
          ...warnings
        ]
      });
    } else if(message.priority === 3) {
      this.setState({
        info: [
          message,
          ...info
        ]
      });
    } else {
      throw new Error('Invalid Message Type');
    }
  }

  handleClick = () => {
    const isApiStarted = this.api.isStarted()
    if (isApiStarted) {
      this.api.stop()
    } else {
      this.api.start()
    }
    this.forceUpdate()
  }

  handleClose = () => {
    this.setState({
      ...this.state,
      error: ''
    });
  }

  clearMessages = () => {
    this.setState({
      errors: [],
      warnings: [],
      info: [],
      error: ''
    });
  }

  clearSingleMessage = (messageId, messagePrio) => {
    const {errors, warnings, info} = this.state;
    switch(messagePrio) {
      case 1:
        const filteredErrors = errors.filter(error => {
          return error.id !== messageId;
        });
        this.setState({
          errors: filteredErrors
        });
        break;
      case 2: 
        const filteredWarnings = warnings.filter(warning => {
          return warning.id !== messageId;
        });
        this.setState({
          warnings: filteredWarnings
        });
        break;
      case 3: 
        const filteredInfo = info.filter(info => {
          return info.id !== messageId;
        });
        this.setState({
          info: filteredInfo
        });
        break;
      default:
        throw new Error('Invalid Priority Type');
    }
  }

  renderList = (messages) => {
    return (
      <Fragment>
        {messages.map(message => <Message key={message.id} message={message} clear={this.clearSingleMessage}/>)}
      </Fragment>
    )
  }

  render() {
    const isApiStarted = this.api.isStarted()
    const { errors, warnings, info, error } = this.state;
    return (
      <Fragment>
        <Toolbar>
          <Typography variant="h5">
            React Coding Challenge
          </Typography>
        </Toolbar>
        <Divider />
        <Toolbar>
          <Grid container spacing={2} justify="center">
            <Grid item>
              <Button
                variant="contained"
                onClick={this.handleClick}
              >
                {isApiStarted ? 'Stop Messages' : 'Start Messages'}
              </Button>
            </Grid>
              <Grid item>
                <Button variant="contained" onClick={this.clearMessages} data-testid="clearAll">Clear Messages</Button>
              </Grid>
          </Grid>
        </Toolbar>
        <Container>
          <Grid container spacing={2} justify="center">
            <Grid item xs={4}>
              <Typography variant="h6">
                Error Type 1
              </Typography>
              <Typography variant="body2">
                {`Count ${errors.length}`}
              </Typography>{this.renderList(errors)}
            </Grid>
            <Grid item xs={4}>
              <Typography variant="h6">
                Warning Type 2
              </Typography>
              <Typography variant="body2">
                {`Count ${warnings.length}`}
              </Typography>
              {this.renderList(warnings)}
            </Grid>
            <Grid item xs={4}>
              <Typography variant="h6">
                Info Type 3
              </Typography>
              <Typography variant="body2">
                {`Count ${info.length}`}
              </Typography>
              {this.renderList(info)}
            </Grid>
          </Grid>
        </Container>
        <CustomSnackbar error={error} handleClose={this.handleClose} />
      </Fragment>
    )
  }
}

export default MessageList
