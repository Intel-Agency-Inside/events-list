import React, {Component, PropTypes} from 'react';

export default class EventItem extends Component {
  static propTypes = {
    time: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    ctaUrl: PropTypes.string,
    ctaText: PropTypes.string,
    description: PropTypes.string.isRequired,
  };

  constructor() {
    super();
    this.state = {
      showInfo: false,
    };
  }

  toggleInfo() {
    this.setState({ showInfo: !this.props.showInfo });
  }

  render() {
    return (
      <div class="event-list-item">
        <header>
          <time>{ this.props.time }</time>
          <div class="title">
            <h4>{ this.props.title }</h4>
            <button class="event-item-expander" onClick={ this.toggleInfo() }>
              { this.state.showInfo ? (
              <div class="additional-info">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 75 75"><path d="M57.4 37.5c0-1.3-1.1-2.3-2.3-2.3H19.9c-1.3 0-2.3 1.1-2.3 2.3s1.1 2.3 2.3 2.3h35.2c1.3 0 2.3-1 2.3-2.3zM39.8 55.1V19.9c0-1.3-1.1-2.3-2.3-2.3s-2.3 1.1-2.3 2.3v35.2c0 1.3 1.1 2.3 2.3 2.3s2.3-1 2.3-2.3zM37.5 4.7c-18 0-32.8 14.8-32.8 32.8s14.8 32.8 32.8 32.8 32.8-14.8 32.8-32.8S55.5 4.7 37.5 4.7zm0 70.3C16.9 75 0 58.1 0 37.5S16.9 0 37.5 0 75 16.9 75 37.5 58.1 75 37.5 75z"/></svg>
                <span>Additional Information</span>
              </div>
              ) : (
              <div class="less-info">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 75 75"><path d="M57.4 37.5c0-1.3-1.1-2.3-2.3-2.3H19.9c-1.3 0-2.3 1.1-2.3 2.3s1.1 2.3 2.3 2.3h35.2c1.3 0 2.3-1 2.3-2.3zM37.5 4.7c-18 0-32.8 14.8-32.8 32.8s14.8 32.8 32.8 32.8 32.8-14.8 32.8-32.8S55.5 4.7 37.5 4.7zm0 70.3C16.9 75 0 58.1 0 37.5S16.9 0 37.5 0 75 16.9 75 37.5 58.1 75 37.5 75z"/></svg>
                <span>Show Less</span>
              </div>
              ) }
            </button>
          </div>
          <div class="action">
            <a href="{ this.props.ctaURL }"><button class="intel blue">{ this.props.ctaText }</button></a>
          </div>
        </header>
        <div class="more-info">
          <p>{ this.props.description }</p>
        </div>
      </div>
    )
  }
}
