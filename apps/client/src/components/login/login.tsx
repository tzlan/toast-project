//rafce
import ReactDOM from "react-dom/client";
import React, { useState } from 'react';
import styles from './login.module.css'; 
import { FaEye, FaEyeSlash } from 'react-icons/fa';


export const Login = () => {
  const [idSoldier, setIdSoldier] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Id soldier -- >', idSoldier);
    console.log('Password --> ', password);
    // next backend t'a capté
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>GOLDEN TOAST</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formGroup}>
          <label htmlFor="Id Soldier" className={styles.label}>
            Id Soldier
          </label>
          <input
            type="id"
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
            
            <span className={styles.eye}
            onClick={togglePasswordVisibility}>
             {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
              
        </div>
        
        <button type="submit" className={styles.button}>
          Login
        </button>


      
        <div className={styles.forgotPassword}>
          <a href="/create-account">Create account</a>
        </div>


      </form>
    </div>
  );
};




