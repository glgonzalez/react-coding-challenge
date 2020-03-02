import React from 'react';
import ReactDOM from 'react-dom';
import MessageList from './components/message-list';
import {ErrorBoundary} from './components/error-boundary';

const NewApp = require('./components/message-list').default

function renderApp(App) {
  ReactDOM.render(
  <ErrorBoundary>
    <App />
  </ErrorBoundary>, document.getElementById('root'));
}

renderApp(MessageList)

if (module.hot) {
  module.hot.accept('./components/message-list', () => {
    renderApp(NewApp)
  })
}
