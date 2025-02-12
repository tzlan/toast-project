
import { useState } from 'react'
import styles from './user_registration.module.css'

const user_registration = () => {
  const [idSoldier, setIdSoldier] = useState('');
  const [password, setPassword] = useState('');

  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Id soldier -- >', idSoldier);
    console.log('Password --> ', password);
    // next backend t'a capté
  };

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
     

        </div>
        
        <button type="submit" className={styles.button}>
          Login
        </button>


      
        <div className={styles.forgotPassword}>
          <a href="/create-account">Create accogfdgfdunt</a>
        </div>


      </form>
    </div>
  );
};





