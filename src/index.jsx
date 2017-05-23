import React from 'react';
import {
  render
} from 'react-dom';
import {
  AppContainer
} from 'react-hot-loader';
import EventList from './event-list/event-list.jsx';

const appDOMNode = document.getElementById('eventListApp');
const dataUrl = appDOMNode.getAttribute('data-url');
const futureItemsLabel = appDOMNode.getAttribute('data-future-items-label');
const pastItemsLabel = appDOMNode.getAttribute('data-past-items-label');

render(
  <AppContainer>
    <EventList
      dataUrl={dataUrl}
      pastItemsLabel={pastItemsLabel}
      futureItemsLabel={futureItemsLabel}
    />
  </AppContainer>,
  appDOMNode
);

if (module && module.hot) {
  module.hot.accept('./event-list/event-list.jsx', () => {
    const EventList = require('./event-list/event-list.jsx').default;
    render(
      <AppContainer>
        <EventList
          dataUrl={dataUrl}
          pastItemsLabel={pastItemsLabel}
          futureItemsLabel={futureItemsLabel}
        />
      </AppContainer>,
      appDOMNode
    );
  });
}
