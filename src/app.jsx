import React from 'react';
import EventList from './event-list/event-list.jsx';
import '../styles/index.scss';

export default class App extends React.Component {
  render() {
    return (
      <div>
        <EventList/>
      </div>
    )
  }
}
