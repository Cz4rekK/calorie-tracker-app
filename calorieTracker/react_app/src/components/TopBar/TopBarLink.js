import React from 'react';

import styles from './TopBarLink.module.css';

const TopBarLink = (props) => {
  return (
    <div>
      <button style={props.style} onClick={props.onClick} className={styles.TopBarLink}>
        {props.title}
      </button>
    </div>
  );
};

export default TopBarLink;
