import React from 'react';
import { Container, Toolbar, Typography, Divider, Button, Grid} from '@material-ui/core';

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false
    }
  }

  componentDidCatch() {
    this.setState({
      hasError: true
    });
  }

  tryAgain = () => {
    window.location.reload();
  }

  render() {
    if (this.state.hasError) {
      return (
        <Container>
          <Toolbar>
            <Typography variant="h5">SOMETHING WENT WRONG</Typography>
          </Toolbar>
          <Divider />
          <Toolbar>
            <Grid 
              container 
              spacing={0} 
              justify="center">
              <Grid item>
                <Button 
                  variant="contained"
                  onClick={this.tryAgain}>
                  Reload
                </Button>
              </Grid>
            </Grid>
          </Toolbar>
        </Container>
      );
    }

    return this.props.children;
  }
}