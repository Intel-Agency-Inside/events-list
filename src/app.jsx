import React from 'react';
import EventList from './event-list/event-list.jsx';

export default class App extends React.Component {
  render() {
    return (
      <div>
        <EventList dataUrl={this.props.dataUrl}/>
      </div>
    )
  }
}
