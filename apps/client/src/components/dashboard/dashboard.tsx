import React from 'react';
import { Navigation } from '../navigation/navigation';
import styles from './dashboard.module.css';
import { useGetToastsQuery } from '../../store/api/toasts.api';
import { Toast } from '../../store/api/toasts.api';

const renderTableRows = (toasts: Toast[]) => {
  if (!toasts || toasts.length === 0) {
    return null;
  }

  return toasts.map((toast) => (
    <tr key={toast.id} className={styles.selectedRow}>
      <td>{toast.userId}</td>
      <td>{toast.date}</td>
      <td>{toast.description}</td>
      <td>{toast.toastStatus}</td>
    </tr>
  ));
};

export const Dashboard: React.FC = () => {
  const { data: toasts, isLoading } = useGetToastsQuery();

  if (isLoading) {
    return (
      <div>
        <Navigation />
        <div className={styles.container}>
          <h1 className={styles.title}>Charging of toasts... ⏳</h1>
          <p>Wait please</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Navigation />
      <div className={styles.container}>
        <h1 className={styles.title}>🍷 Welcome user of Golden Toast 🍪</h1>
        <div className={styles.form}>
          <table className={styles.tab}>
            <thead>
              <tr>
                <th>User</th>
                <th>Date</th>
                <th>Description</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>{renderTableRows(toasts || [])}</tbody>
          </table>
          {(!toasts || toasts.length === 0) && (
            <p className={styles.noData}>0 toast found</p>
          )}
        </div>
      </div>
    </div>
  );
};
