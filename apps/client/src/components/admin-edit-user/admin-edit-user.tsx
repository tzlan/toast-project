import { useState } from 'react';
import styles from './admin-edit-user.module.css';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { Navigation } from '../navigation/navigation';
export const AdminEditUser = () => {
  const [idSoldier, setIdSoldier] = useState('');
  const [familyNameSoldier, setfamilyNameSoldier] = useState('');
  const [personalName, setpersonalName] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [selectedButton, setSelectedButton] = useState<string | null>(null);
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleButtonClick = (buttonType: string) => {
    if (selectedButton === buttonType) {
      setSelectedButton(null);
    } else setSelectedButton(buttonType);
  };

  return (
    <div>
      <Navigation />
      <div className={styles.container}>
        <h1 className={styles.title}>Edit user ✍🏼</h1>
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formGroup}>
            <label htmlFor="Id Soldier" className={styles.label}>
              Soldier Id
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
          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label htmlFor="familyNameSoldier" className={styles.label}>
                Family Name
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
              <label htmlFor="" className={styles.label}>
                Personal Name
              </label>
              <input
                type="text"
                id="nameSoldier"
                value={personalName}
                onChange={(e) => setpersonalName(e.target.value)}
                className={styles.input}
                required
              />
            </div>
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="password" className={styles.label}>
              Password
            </label>
            <input
              type={showPassword ? 'text' : 'password'}
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={styles.input}
              required
            />
            <span className={styles.eye} onClick={togglePasswordVisibility}>
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          <div className={styles.buttonGroup}>
            <button
              className={`${styles.buttonAdmin} ${
                selectedButton === 'criminal'
                  ? styles.buttonGray
                  : styles.buttonRed
              }`}
              onClick={() => handleButtonClick('persona')}
            >
              Persona
            </button>

            <button
              className={`${styles.buttonAdmin} ${
                selectedButton === 'persona'
                  ? styles.buttonGray
                  : styles.buttonYellow
              }`}
              onClick={() => handleButtonClick('criminal')}
            >
              Criminal
            </button>

            <button
              className={`${styles.buttonAdmin} ${styles.buttonOrange}`}
              onClick={() => handleButtonClick('admin')}
            >
              Admin
            </button>
          </div>

          <button type="submit" className={styles.button}>
            Update
          </button>
        </form>
      </div>
    </div>
  );
};
