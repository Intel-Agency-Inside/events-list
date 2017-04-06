import React, { Component, PropTypes } from 'react';
import dateFormat from 'dateformat';
import plusSign from '../../assets/svgs/event-list/plus_sign.svg';
import minusSign from '../../assets/svgs/event-list/minus_sign.svg';
import styles from './event-item.scss';

export default class EventItem extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    time: PropTypes.instanceOf(Date).isRequired,
    cta: PropTypes.string,
    url: PropTypes.string,
  };

  constructor(props) {
    super(props);
    this.state = {
      showInfo: false,
    };
  }

  getMoreInfoButton() {
    if (!this.props.description) { return false; }
    return this.state.showInfo ? (
      <button className={ styles.eventItemExpander } onClick={ () => this.toggleInfo() }>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 75 75"><path d="M57.4 37.5c0-1.3-1.1-2.3-2.3-2.3H19.9c-1.3 0-2.3 1.1-2.3 2.3s1.1 2.3 2.3 2.3h35.2c1.3 0 2.3-1 2.3-2.3zM37.5 4.7c-18 0-32.8 14.8-32.8 32.8s14.8 32.8 32.8 32.8 32.8-14.8 32.8-32.8S55.5 4.7 37.5 4.7zm0 70.3C16.9 75 0 58.1 0 37.5S16.9 0 37.5 0 75 16.9 75 37.5 58.1 75 37.5 75z"/></svg>
        <span>Show Less</span>
      </button>
    ) : (
      <button className={ styles.eventItemExpander } onClick={ () => this.toggleInfo() }>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 75 75"><path d="M57.4 37.5c0-1.3-1.1-2.3-2.3-2.3H19.9c-1.3 0-2.3 1.1-2.3 2.3s1.1 2.3 2.3 2.3h35.2c1.3 0 2.3-1 2.3-2.3zM39.8 55.1V19.9c0-1.3-1.1-2.3-2.3-2.3s-2.3 1.1-2.3 2.3v35.2c0 1.3 1.1 2.3 2.3 2.3s2.3-1 2.3-2.3zM37.5 4.7c-18 0-32.8 14.8-32.8 32.8s14.8 32.8 32.8 32.8 32.8-14.8 32.8-32.8S55.5 4.7 37.5 4.7zm0 70.3C16.9 75 0 58.1 0 37.5S16.9 0 37.5 0 75 16.9 75 37.5 58.1 75 37.5 75z"/></svg>
        <span>Additional Information</span>
      </button>
    );
  }

  toggleInfo() {
    this.setState({
      showInfo: !this.state.showInfo
    });
  }

  render() {
    return (
      <div className={ styles.EventItem }>

        <header>
          <time>{ dateFormat(this.props.time, "mmmm dS, yyyy") }</time>
          <div className={ styles.title }>
            <h4>{ this.props.title }</h4>
            { this.getMoreInfoButton() }
          </div>
          <div className={ styles.action }>
            <a href={ this.props.url }><button>{ this.props.cta || 'See Event' }</button></a>
          </div>
        </header>

        { this.props.description &&
          <div className={ styles.moreInfo } style={{ maxHeight: this.state.showInfo ? 350 : 0 }}>
            <p>{ this.props.description }</p>
          </div>
        }
      </div>
    )
  }
}
