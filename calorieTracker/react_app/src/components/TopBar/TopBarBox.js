import React from 'react';

import styles from './TopBarBox.module.css';

const TopBarBox = (props) => {
  return <div className={styles.TopBarBox}>{props.children}</div>;
};

export default TopBarBox;
