import React from 'react';

import styles from './Footer.module.css';

const Footer = (props) => {
  return <div className={styles.Footer}>{props.text}</div>;
};

export default Footer;
