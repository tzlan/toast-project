import { useState } from 'react';
import styles from './admin-new-toast.module.css';

export const AdminNewToast = () => {
  const [idSoldier, setIdSoldier] = useState('');
  const [dateToast, setdateToast] = useState('');
  const [hourToast, setHourToast] = useState('');
  const [descriptionToast, setDescriptionToast] = useState('');
  const [selectedOption, setSelectedOption] = useState('');
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  const users = [
    { value: '1', label: 'Tomer' },
    { value: '2', label: 'Nadav' },
    { value: '3', label: 'Shaun' },
    { value: '4', label: 'Aurel' },
    { value: '5', label: 'Inbar' },
    { value: '6', label: 'Ethan' },
    { value: '6', label: 'Bohad' },
  ];
  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(event.target.value);
    console.log(selectedOption);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Welcome Admin ! Make a new toast 🍷</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        <label className={styles.label}>Soldier</label>
        <select
          value={selectedOption}
          onChange={handleSelectChange}
          className={styles.select}
        >
          <option value="" disabled>
            Soldier name
          </option>
          {users.map((user) => (
            <option key={user.value} value={user.value}>
              {user.label}
            </option>
          ))}
        </select>

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
            Description
          </label>
          <input
            type="text"
            id="description"
            value={descriptionToast}
            onChange={(e) => setDescriptionToast(e.target.value)}
            className={styles.input}
            required
          />
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
