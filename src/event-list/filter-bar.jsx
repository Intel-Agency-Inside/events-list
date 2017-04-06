import React, { Component, PropTypes } from 'react';

export default class FilterBar extends Component {
  static propTypes = {
    filters: PropTypes.array,
    filterValue: PropTypes.number,
    updateFilterValue: PropTypes.func.isRequired,
    dateRange: PropTypes.number,
    updateDateRange: PropTypes.func.isRequired,
  };

  render() {
    return (
      <nav className="event-filter">
        <div className="container">
          <section>
            <label htmlFor="topicfil">{ this.props.filterTopic }</label>
            <select value={this.props.filterValue} onChange={this.props.updateFilterValue}>
              { this.props.filters && this.props.filters.map((filter, index) => 
                <option key={index} value={index}>{filter}</option>
              ) }
            </select>
          </section>
          <section>
            <label htmlFor="datefil">{ this.props.filterDateRange }</label>
            <select id="datefil" value={this.props.dateRange} onChange={this.props.updateDateRange}>
              <option value="0">All Times</option>
              <option value="1209600000">next 2 weeks</option>
              <option value="2678400000">next month</option>
              <option value="5356800000">next 2 months</option>
              <option value="8035200000">next 3 months</option>
              <option value="16070400000">next 6 months</option>
            </select>
          </section>
          <section className="action">
            <button className="intel blue">View Topics</button>
          </section>
        </div>
      </nav>
    )
  }
}
