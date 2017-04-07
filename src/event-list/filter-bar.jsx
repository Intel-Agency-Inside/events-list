import React, { Component, PropTypes } from 'react';
import styles from './filter-bar.scss';

export default class FilterBar extends Component {
  static propTypes = {
    filters: PropTypes.array,
    filterValue: PropTypes.number,
    updateFilterValue: PropTypes.func.isRequired,
    dateRange: PropTypes.number,
    updateDateRange: PropTypes.func.isRequired,
  };

  isFiltering() {
    const isFiltering = this.props.filterValue || this.props.dateRange;
    return !!isFiltering;
  }

  clearFilters() {
    if (this.isFiltering()) {
      const zeroValueEvent = {
        target: {
          value: 0
        }
      };
      this.props.updateFilterValue(zeroValueEvent);
      this.props.updateDateRange(zeroValueEvent);
    }
  }

  render() {
    return (
      <nav className={ styles.FilterBar }>
        <div className={ "container " + styles.Container }>
          <section>
            <label htmlFor="topic-select">Topics</label>
            <select id="topic-select" value={this.props.filterValue} onChange={this.props.updateFilterValue}>
              { this.props.filters && this.props.filters.map((filter, index) => 
                <option key={index} value={index}>{filter}</option>
              ) }
            </select>
          </section>
          <section>
            <label htmlFor="date-select">Times</label>
            <select id="date-select" value={this.props.dateRange} onChange={this.props.updateDateRange}>
              <option value="0">All Times</option>
              <option value="1209600000">next 2 weeks</option>
              <option value="2678400000">next month</option>
              <option value="5356800000">next 2 months</option>
              <option value="8035200000">next 3 months</option>
              <option value="16070400000">next 6 months</option>
            </select>
          </section>
          <section className={ styles.action }>
            <button
              onClick={ () => this.clearFilters() }
              disabled={ this.isFiltering() === false }>
              Clear Filters
            </button>
          </section>
        </div>
      </nav>
    )
  }
}
