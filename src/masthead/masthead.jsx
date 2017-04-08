import React, { Component, PropTypes } from 'react';
import styles from './masthead.scss';

export default class Masthead extends Component {
  render() {
    return (
      <div className={ styles.masthead }>
        <figure></figure>
        <div className={ styles.container + ' container' }>
          <h1>Intel Online Events</h1>
          <p>Intel-hosted webinars give you the chance to learn about innovative technologies, new products, and evolving trends—from the comfort of your own desk.</p>
        </div>
      </div>
    )
  }
}
