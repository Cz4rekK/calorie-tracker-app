import React from 'react';

import styles from './AddContainer.module.css';

const AddContainer = (props) => {
  return (
    <div className={styles.AddContainer}>
      <div className={styles.Title}>{props.title}</div>
      <div className={styles.Content}>{props.children}</div>
    </div>
  );
};

export default AddContainer;
