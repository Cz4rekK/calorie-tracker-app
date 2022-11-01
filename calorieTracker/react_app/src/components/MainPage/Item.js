import React from 'react';

import styles from './Item.module.css';

const Item = (props) => {
  return (
    <div className={styles.Container}>
      <div className={styles.Title}>{props.title}</div>
      <div className={styles.Content}>
        Kcal: {props.kcal} P: {props.protein} F: {props.fat} C: {props.carbs}
        {props.mealsTable && (
          <button className={styles.Button} onClick={props.openAddProdToMealDialog}>
            Add prod
          </button>
        )}
        <button onClick={props.onClick} className={styles.Button}>
          Delete
        </button>
      </div>
    </div>
  );
};

export default Item;
