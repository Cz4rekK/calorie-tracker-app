import React from 'react';

import styles from './Welcome.module.css';

const Welcome = (props) => {
  return (
    <div className={styles.Welcome}>
      <h1>{props.message}</h1>
    </div>
  );
};

export default Welcome;
