import React, { Component, PropTypes } from 'react';

export default class FilterBar extends Component {
  static propTypes = {
    filterTopic: PropTypes.string.isRequired,
    updateFilterTopic: PropTypes.func.isRequired,
    filterDateRange: PropTypes.number.isRequired,
    updateFilterDateRange: PropTypes.func.isRequired,
  };

  render() {
    return (
      <nav class="event-filter">
        <div class="container">
          <section>
            <label for="topicfil">{ this.props.filterTopic }</label>
            <select id="topicfil">
              <option selected="selected" value="all">All Topics</option>
              <option value="1">Big Data</option>
              <option value="2">Cloud Computing</option>
              <option value="3">Consumerization of IT</option>
              <option value="4">Data Center Efficiency</option>
              <option value="5">Desktop Virtualization</option>
              <option value="6">Embedded</option>
              <option value="7">High Performance Computing</option>
              <option value="8">Internet of Things</option>
              <option value="9">Manageability</option>
              <option value="10">Mobility</option>
              <option value="11">Retail</option>
              <option value="12">Security</option>
              <option value="13">Virtualization</option>
            </select>
          </section>
          <section>
            <label for="datefil">{ this.props.filterDateRange }</label>
            <select id="datefil">
              <option selected="selected" value="all">All Times</option>
              <option value="0">next 2 weeks</option>
              <option value="1">next month</option>
              <option value="2">next 2 months</option>
              <option value="3">next 3 months</option>
              <option value="6">next 6 months</option>
            </select>
          </section>
          <section class="action">
            <button class="intel blue">View Topics</button>
          </section>
        </div>
      </nav>
    )
  }
}
