import React, { Component, PropTypes } from 'react';
import EventItem from './event-item.jsx';
import styles from './event-list.scss';

export default class EventList extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    events: PropTypes.array.isRequired,
    limit: PropTypes.number,
  };

  constructor(props) {
    super(props);
    this.limit = props.limit || 5;
    this.state = {
      limit: this.limit
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.events && this.props.events.length !== nextProps.events.length) {
      this.setState({
        limit: this.limit
      });
    }
  }

  increaseLimit() {
    this.setState({
      limit: this.state.limit + 5
    });
  }

  render() {
    if (this.props.events.length === 0) {
      return false;
    }
    return (
      <div>
        <h2>{ this.props.title }</h2>
        {
          this.props.events.map((event, index) => {
            if (index < this.state.limit) {
              return <EventItem key={index} {...event}/>;
            }
          })
        }
        { this.props.events.length > this.state.limit &&
            <div className={ styles.loadMore }>
              <button
                onClick={ () => this.increaseLimit() }>
                Load More
              </button>
            </div>
        }
      </div>
    )
  }
}
