import React from 'react';
import styles from './not-found.module.css';
import { Navigation } from '../navigation/navigation';

export const NotFound = () => {
  return (
    <div>
      <Navigation />
      <div className={styles.container}>
        <h1 className={styles.title}>404</h1>
        <h2 className={styles.subtitle}>😬 Page not found 🍷</h2>
        <p className={styles.message}>
          The page you are looking for does not exist
        </p>
      </div>
    </div>
  );
};
