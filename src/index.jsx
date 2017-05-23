import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import App from './app.jsx';

const appDOMNode = document.getElementById('eventListApp');
const dataUrl = appDOMNode.getAttribute('data-url');
const itemName = appDOMNode.getAttribute('data-itemName');

render( <AppContainer><App dataUrl={dataUrl} itemName={itemName}/></AppContainer>, appDOMNode);

if (module && module.hot) {
  module.hot.accept('./app.jsx', () => {
    const App = require('./app.jsx').default;
    render(
      <AppContainer>
        <App
          dataUrl={dataUrl}
          itemName={itemName}
        />
      </AppContainer>,
      appDOMNode
    );
  });
}
