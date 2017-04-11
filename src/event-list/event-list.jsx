import React, { Component, PropTypes } from 'react';
import Papa from 'papaparse';
import qs from 'query-string';
import EventGroup from './event-group.jsx';
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
  static propTypes = {
    dataUrl: PropTypes.string.isRequired,
  };

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
    Papa.parse(this.props.dataUrl, {
      download: true,
      header: true,
      error: err => {
        throw new Error(err)
      },
      complete: results => {
        // hashing filters to dedupe them as they
        // are read in from the csv file
        const filterHash = {
          'All Topics': true
        };
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
        }).sort((eventA, eventB) => eventA.time - eventB.time);
        const filters = Object.keys(filterHash).sort();
        filters.forEach((filter, index) => filterHash[filter] = index);
        const qsFilter = qs.parse(location.search).filter;
        this.setState({
          events,
          filters,
          filterValue: filterHash[this.qsFilter] ? filterHash[this.qsFilter] : 0,
        });
      }
    });
  }

  // All events from the CSV are stored in this.state.events.
  // getFilteredEvents takes that sorted array of events, filters
  // it by the filterExpression param, additionally filters
  // by the date range and topic selected by the user, and
  // returns the filtered array
  getFilteredEvents(filterExpression) {
    return this.state.events
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
      });
  }

  getFutureEvents() {
    return this.getFilteredEvents(event => Date.now() < event.time);
  }

  getPastEvents() {
    return this.getFilteredEvents(event => Date.now() > event.time);
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

  clearFilters() {
    const zeroValueEvent = {
      target: {
        value: 0
      }
    };
    this.updateFilterValue(zeroValueEvent);
    this.updateDateRange(zeroValueEvent);
  }

  render() {
    const futureEvents = this.getFutureEvents();
    const pastEvents = this.getPastEvents();
    return (
      <div className={ styles.EventList }>
        <FilterBar
          filters={ this.state.filters }
          filterValue={ this.state.filterValue }
          updateFilterValue={ event => this.updateFilterValue(event) }
          dateRange={ this.state.dateRange }
          clearFilters={ () => this.clearFilters() }
          updateDateRange={ event => this.updateDateRange(event) }/>
        <div className="container">
          <EventGroup
            title="Future Events"
            events={ futureEvents }
            limit={ 5 }
          />
          <EventGroup
            title="Past Events"
            events={ pastEvents }
            limit={ 5 }
          />
          { pastEvents.length + futureEvents.length === 0 &&
            <div className={ styles.NoMatch }>
              <h2>No Matching Events</h2>
              <p>Ooops, it doesn't look like any events match your search. Try changing the filter settings or clearing the filters with the button below.</p>
              <p><button onClick={ () => this.clearFilters() }>Clear Filters</button></p>
            </div>
          }
        </div>
      </div>
    )
  }
}
