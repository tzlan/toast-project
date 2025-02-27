// Importation des modules nécessaires
import { Link } from 'react-router-dom';
import React, { useState } from 'react';
import styles from './login.module.css';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

export const Login = () => {
  const [idSoldier, setIdSoldier] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {};

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>GOLDEN TOAST</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formGroup}>
          <label htmlFor="idSoldier" className={styles.label}>
            Soldier Id
          </label>
          <input
            type="text" // Correction du type d'entrée
            id="idSoldier"
            value={idSoldier}
            onChange={(e) => setIdSoldier(e.target.value)}
            className={styles.input}
            required
          />
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

        <button type="submit" className={styles.button}>
          Login
        </button>

        <div className={styles.forgotPassword}>
          <Link to="/user-registration">Create account</Link>
        </div>
      </form>
    </div>
  );
};
