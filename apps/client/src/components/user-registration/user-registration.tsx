import { useState } from 'react';
import styles from './user-registration.module.css';

export const UserRegistration = () => {
  const [idSoldier, setIdSoldier] = useState('');
  const [familyNameSoldier, setfamilyNameSoldier] = useState('');
  const [nameSoldier, setnameSoldier] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordShown, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Join the Toast Club</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formRow}>
          <div className={styles.formGroup}>
            <label htmlFor="Id Soldier" className={styles.label}>
              Soldier Id
            </label>
            <input
              type="text"
              id="idSoldier"
              value={idSoldier}
              onChange={(e) => {
                const value = e.target.value;
                if (/^\d*$/.test(value)) setIdSoldier(value); 
              }}
              className={styles.input}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="password" className={styles.label}>
              First name
            </label>
            <input
              type="text"
              id="nameSoldier"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={styles.input}
              required
            />
          </div>
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="familyNameSoldier" className={styles.label}>
            Last Name
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

        <label htmlFor="password" className={styles.label}>
          Password
        </label>
        <input
          type={isPasswordShown ? 'text' : 'password'}
          id="nameSoldier"
          value={nameSoldier}
          onChange={(e) => setnameSoldier(e.target.value)}
          className={styles.input}
          required
        />

        <button type="submit" className={styles.button}>
          Join the toast club
        </button>
      </form>
    </div>
  );
};
