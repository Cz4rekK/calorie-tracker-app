import React from 'react';

import styles from './PlusButton.module.css';

const PlusButton = (props) => {
  return (
    <div className={styles.PlusButton}>
      <div onClick={props.onClick} className={styles.PlusSign}>
        {props.Add}
      </div>
    </div>
  );
};

export default PlusButton;
