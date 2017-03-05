import React from 'react';
import cx from 'classnames';

import styles from './styles.scss';

class Marker extends React.Component {
  render() {
    return (
      <div className={
        cx(
          styles.marker,
          styles[this.props.bgColor],
          styles[this.props.size]
        )
      } onClick={this.props.onClick}>
        <img src={this.props.icon} alt="" />
      </div>
    );
  }
}

export default Marker;
