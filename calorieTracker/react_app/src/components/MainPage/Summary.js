import React from 'react';

import styles from './Summary.module.css';

const Summary = (props) => {
  return (
    <div className={styles.Container}>
      <div className={styles.Title}>Summary</div>
      <div className={styles.Content}>
        <div className={styles.Summary}>
          <div className={styles.SummaryTitle}>Total Kcal:</div>
          <div className={styles.SummaryValue}>
            {props.totalKcal}/{props.calorieGoal}
          </div>
        </div>
        <div className={styles.Summary}>
          <div className={styles.SummaryTitle}>Total Protein:</div>
          <div className={styles.SummaryValue}>
            {props.totalProtein}/{props.proteinGoal}
          </div>
        </div>
        <div className={styles.Summary}>
          <div className={styles.SummaryTitle}>Total Fat:</div>
          <div className={styles.SummaryValue}>
            {props.totalFat}/{props.fatGoal}
          </div>
        </div>
        <div className={styles.Summary}>
          <div className={styles.SummaryTitle}>Total Carbs:</div>
          <div className={styles.SummaryValue}>
            {props.totalCarbs}/{props.carbsGoal}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Summary;
