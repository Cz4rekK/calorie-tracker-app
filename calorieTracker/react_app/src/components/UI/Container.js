import React from 'react';

import styles from './Container.module.css';

const Container = (props) => {
  return (
    <div className={styles.Container} style={{ position: props.position, marginRight: props.marginRight }}>
      {props.children}
    </div>
  );
};

export default Container;
