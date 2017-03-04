import React from 'react';

import deposit from '../icons/deposit.svg';

import styles from './styles.scss';

class Marker extends React.Component {
  handleClick = () =>
    console.log('clicked');
  
  render() {
    return (
      <div className={styles.marker} onClick={this.handleClick}>
        <img src={deposit} alt="" />
      </div>
    );
  }
}

export default Marker;
