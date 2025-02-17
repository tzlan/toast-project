import React from 'react';
import styles from './not-found.module.css';

export const NotFound = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>404</h1>
      <h2 className={styles.subtitle}>😬 Page not found 🍷</h2>
      <p className={styles.message}>The page you are looking for does not exist</p>
    </div>
  );
};
