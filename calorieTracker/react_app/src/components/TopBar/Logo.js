import React from 'react';

import styles from './Logo.module.css';
import { Barbell } from 'phosphor-react';

const Logo = (props) => {
  return (
    <div className={styles.Logo}>
      <Barbell size={50} color="white" />
    </div>
  );
};

export default Logo;
