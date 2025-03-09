import { useState } from 'react';
import styles from './new-toast.module.css';
import { Navigation } from '../navigation/navigation';

export const NewToast = () => {
  const [dateToast, setdateToast] = useState('');
  const [hourOfToast, setHourOfToast] = useState('');
  const [descriptionToast, setDescriptionToast] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <div>
      <Navigation />
      <div className={styles.container}>
        <h1 className={styles.title}>Make a new toast 🍷</h1>
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label htmlFor="password" className={styles.label}>
                Date
              </label>
              <input
                type="date"
                id="dateToast"
                value={dateToast}
                onChange={(e) => setdateToast(e.target.value)}
                className={styles.input}
                required
              />
            </div>
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="familyNameSoldier" className={styles.label}>
              Hour
            </label>
            <input
              type="time"
              id="hourOfToast"
              value={hourOfToast}
              onChange={(e) => setHourOfToast(e.target.value)}
              className={styles.input}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="description" className={styles.label}>
              Description
            </label>
            <input
              type="text"
              id="description"
              value={descriptionToast}
              onChange={(e) => setDescriptionToast(e.target.value)}
              className={styles.formImputDescription}
              required
            />
          </div>

          <button type="submit" className={styles.button}>
            New toaaaaaast 🥳
          </button>
        </form>
      </div>
    </div>
  );
};
