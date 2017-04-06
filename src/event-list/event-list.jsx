import React, { Component, PropTypes } from 'react';
import Papa from 'papaparse';
import eventCSV from 'file-loader!../../assets/data/events.csv';
import { List } from 'immutable';
import EventItem from './event-item.jsx';
import FilterBar from './filter-bar.jsx';
import styles from './event-list.scss';

// if data's not flowing and you think someone
// changed the header line in the xls try updating
// this convenience object
const dataHeaderBindings = {
  title: 'Event Name',
  description: 'Desc',
  time: 'Start Date',
  cta: 'CTA',
  url: 'Link',
  filter: 'Filter',
};

export default class EventList extends Component {
  constructor() {
    super();
    this.state = {
      events: [],
      filters: [],
      filterValue: 0,
      dateRange: 0,
    };
  }

  componentDidMount() {
    Papa.parse(eventCSV, {
      download: true,
      header: true,
      error: err => { throw new Error(err) },
      complete: results => {
        // using a filterHash to read and dedupe filters
        // as they are read from items in the CSV
        const filterHash = { 'All Topics': true };
        const events = results.data.map(event => {
          if (event[dataHeaderBindings.filter]) {
            filterHash[event[dataHeaderBindings.filter]] = true;
          }
          return {
            title: event[dataHeaderBindings.title],
            description: event[dataHeaderBindings.description],
            time: new Date(event[dataHeaderBindings.time]),
            cta: event[dataHeaderBindings.cta],
            url: event[dataHeaderBindings.url],
            filter: event[dataHeaderBindings.filter],
          };
        }).sort((eventA, eventB) => eventA.time - eventB.time).reverse();
        const filters = Object.keys(filterHash).sort();
        this.setState({ events, filters });
      }
    });
  }

  // All events from the CSV are stored in this.state.events.
  // getEventGroup takes that sorted array of events, filters
  // it by the filterExpression param, additionally filters
  // by the date range and topic selected by the user, then
  // if any events meet the criteria it returns a JSX group
  // with a title and <EventItem> components for each item
  // in the filtered array.
  getEventGroup({ title, filterExpression }) {
    const events = this.state.events
      // past or future
      .filter(filterExpression)
      // topic filter 
      .filter(event => {
        if (this.state.filterValue === 0) {
          return true;
        }
        return event.filter === this.state.filters[this.state.filterValue];
      })
      // dateRange filter
      .filter(event => {
        if (this.state.dateRange === 0) {
          return true;
        }
        const rangeTarget = Date.now() + this.state.dateRange;
        return Date.now() < event.time && event.time < rangeTarget;
      })
      .map((event, index) => <EventItem key={index} {...event} />);
    if (events.length) {
      return (
        <div>
          <h2>{ title }</h2>
          { events }
        </div>
      );
    }
  }

  updateFilterValue(event) {
    this.setState({
      filterValue: parseInt(event.target.value)
    });
  }

  updateDateRange(event) {
    this.setState({
      dateRange: parseInt(event.target.value)
    });
  }

  render() {
    return (
      <div className={ styles.EventList }>
        <FilterBar
          filters={ this.state.filters }
          filterValue={ this.state.filterValue }
          updateFilterValue={ event => this.updateFilterValue(event) }
          dateRange={ this.state.dateRange }
          updateDateRange={ event => this.updateDateRange(event) }/>
        <div className="container">
          { this.getEventGroup({
            title: 'Future Events',
            filterExpression: event => Date.now() < event.time
          }) }
          { this.getEventGroup({
            title: 'Past Events',
            filterExpression: event => Date.now() > event.time
          }) }
        </div>
      </div>
    )
  }
}
