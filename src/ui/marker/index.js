import React from 'react';

import deposit from '../icons/deposit.svg';

import styles from './styles.scss';

class Marker extends React.Component {
  render() {
    return (
      <div className={styles.marker} onClick={this.props.onClick}>
        <img src={deposit} alt="" />
      </div>
    );
  }
}

export default Marker;
