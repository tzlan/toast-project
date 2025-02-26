// apps/client/src/components/PrincipalDashboard.jsx
import { useState } from 'react';
import styles from './principal-dashboard.module.css';

export const PrincipalDashboard = () => {
  const entries = [
    { id: 1, person: 'Shaun', time: '10:30 AM', day: '14.11.2025' },
    { id: 2, person: 'Aurel', time: '2:15 PM', day: '19.10.2025' },
    { id: 3, person: 'Ethan', time: '5:45 PM', day: '20.09.2025' },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>✈️Welcome to Leader Board 🍷</h1>
      <div className={styles.form}>
        <table className={styles.tableau}>
          <thead>
            <tr>
              <th>Person</th>
              <th>Time</th>
              <th>Day</th>
            </tr>
          </thead>
          <tbody>
            {entries.map((entry) => (
              <tr key={entry.id}>
                <td>{entry.person}</td>
                <td>{entry.time}</td>
                <td>{entry.day}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PrincipalDashboard;
