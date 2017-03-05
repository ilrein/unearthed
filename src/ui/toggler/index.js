import React from 'react';

import { Checkbox } from 'semantic-ui-react';

import styles from './styles.scss';

const Toggler = ({ onToggleOperation, onToggleProject, onToggleConstruction }) =>
  <div className={styles.toggler}>
    <div className={styles.wrapper}>
      <p>Operation</p>
      <Checkbox slider onChange={onToggleOperation} />
    </div>
    <div className={styles.wrapper}>
      <p>Construction</p>
      <Checkbox slider onChange={onToggleConstruction} />
    </div>
    <div className={styles.wrapper}>
      <p>Exploration</p>
      <Checkbox slider onChange={onToggleProject} />
    </div>
  </div>;

export default Toggler;
