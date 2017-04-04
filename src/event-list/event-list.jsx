import React, {Component, PropTypes} from 'react';
import EventItem from './event-item.jsx';
import FilterBar from './filter-bar.jsx';

export default class EventList extends Component {
  constructor() {
    super();
    this.state = {
      filterTopic: undefined,
      filterDateRange: undefined,
      events: [],
    };
  }
  updateCurrentTopic() {
  }
  updateFilterDateRange() {
  }
  getUpcomingEvents() {
  }
  getPastEvents() {
  }
  render() {
    return (
      <div className="intel-event-list">
        <FilterBar
          filterTopic={ this.state.currentTopic }
          updateFilterTopic={ this.updateCurrentTopic }
          filterDateRange={ this.state.filterDateRange }
          updateFilterDateRange={ this.updateFilterDateRange }/>
        <div className="container">
          { this.getUpcomingEvents() }
          { this.getPastEvents() }
        </div>
      </div>
    )
  }
}
