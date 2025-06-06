import { Link, useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import styles from './login.module.css';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useLoginMutation } from '../../store/api/users.api';
import { AxiosError } from 'axios';
import { useDispatch } from 'react-redux';
import { setUser } from '../../store/api/auth/auth.slice';

export const Login = () => {
  const [idSoldier, setIdSoldier] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [login, { isLoading, error, isSuccess }] = useLoginMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    try {
      const result = await login({
        soldierId: parseInt(idSoldier),
        password,
      }).unwrap();

      if (result && result.user) {
        dispatch(setUser(result.user));
        navigate('/dashboard');
      } else {
        setErrorMessage('Login failed. Invalid server response.');
      }
    } catch (err) {
      const apiError = err as AxiosError<{ message?: string; error?: string; statusCode?: number }>;
      
      if (apiError.response && apiError.response.data) {
        setErrorMessage(apiError.response.data.message || 'An unexpected error occurred.');
      } else if (apiError.request) {
        setErrorMessage('Unable to connect to server. Please check your connection.');
      } else {
        setErrorMessage('An unknown error occurred during login.');
      }
    }
  };

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
            type="text"
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

        {isLoading && <p className={styles.loadingMessage}>Logging in...</p>}
        {errorMessage && <p className={styles.errorMessage}>{errorMessage}</p>}
        {isSuccess && !errorMessage && !isLoading && (
          <p className={styles.successMessage}>Redirecting...</p>
        )}

        <button type="submit" className={styles.button} disabled={isLoading}>
          {isLoading ? 'Loading' : 'Login'}
        </button>

        <div className={styles.createAccount}>
          <Link to="/user-registration">Create an account</Link>
        </div>
      </form>
    </div>
  );
};