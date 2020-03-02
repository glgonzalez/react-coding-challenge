import React, { Fragment } from 'react'
import Button from '@material-ui/core/Button'
import { Divider, Grid, Toolbar, Typography, Container } from '@material-ui/core';
import Api from '../api'
import { CustomSnackbar } from './custom-snackbar';
import { MessageGrid } from './message-grid';



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
    const { errors, warnings, info } = this.state;
    switch(message.priority) {
      case 1: 
        this.setState({
          errors: [
            message,
            ...errors
          ],
          error: message.message
        });
        break;
      case 2: 
        this.setState({
          warnings: [
            message,
            ...warnings
          ]
        });
        break;
      case 3: 
        this.setState({
          info: [
            message,
            ...info
          ]
        });
        break;
      default:
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

  render() {
    const isApiStarted = this.api.isStarted()
    const { 
      errors, 
      warnings, 
      info, 
      error } = this.state;
    return (
      <Fragment>
        <Toolbar>
          <Typography variant="h5">
            React Coding Challenge
          </Typography>
        </Toolbar>
        <Divider />
        <Toolbar>
          <Grid 
            container 
            spacing={2} 
            justify="center">
            <Grid item>
              <Button
                variant="contained"
                onClick={this.handleClick}
              >
                {isApiStarted ? 'Stop Messages' : 'Start Messages'}
              </Button>
            </Grid>
              <Grid item>
                <Button 
                  variant="contained" 
                  onClick={this.clearMessages} 
                  data-testid="clearAll">Clear Messages</Button>
              </Grid>
          </Grid>
        </Toolbar>
        <Container>
          <MessageGrid 
            errors={errors} 
            warnings={warnings} 
            info={info} 
            clear={this.clearSingleMessage}/>
        </Container>
        <CustomSnackbar error={error} handleClose={this.handleClose} />
      </Fragment>
    )
  }
}

export default MessageList
