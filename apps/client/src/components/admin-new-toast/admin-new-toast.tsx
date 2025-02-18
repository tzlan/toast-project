import { useState } from 'react'
import styles from './admin-new-toast.module.css'

export const AdminNewToast = () => {
  const [idSoldier, setIdSoldier] = useState('');
  const [dateToast, setdateToast] = useState('');
  const [familyNameSoldier, setfamilyNameSoldier] = useState('');
  const [nameSoldier, setnameSoldier] = useState('');
  const [hourToast, setHourToast] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  }; 

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Welcome Admin ! Make a new toast 🍷</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formRow}>
          <div className={styles.formGroup}>
            <label htmlFor="Id Soldier" className={styles.label}>
              Id Soldier
            </label>
            <input
              type="number"
              id="idSoldier"
              value={idSoldier}
              onChange={(e) => setIdSoldier(e.target.value)}
              className={styles.input}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="password" className={styles.label}>
             Name
            </label>
            <input
              type="text"
              id="nameSoldier"
              value={nameSoldier}
              onChange={(e) => setnameSoldier(e.target.value)}
              className={styles.input}
              required
            />
          </div>
        </div>

        <div className={styles.formRow}>
          <div className={styles.formGroup}>
            <label htmlFor="Id Soldier" className={styles.label}>
              Family name
            </label>
            <input
              type="text"
              id="familyNameSoldier"
              value={familyNameSoldier}
              onChange={(e) => setfamilyNameSoldier(e.target.value)}
              className={styles.input}
              required
            />
          </div>

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
            id="hourToast"
            value={hourToast}
            onChange={(e) => setHourToast(e.target.value)}
            className={styles.input}
            required
          />
        </div>        

        <button type="submit" className={styles.button}>
         New toaaaaaast 🥳
        </button>
      </form>
    </div>
  );

};