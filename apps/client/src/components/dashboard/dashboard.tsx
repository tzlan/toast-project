import React from 'react';
import { Navigation } from '../navigation/navigation';
import styles from './dashboard.module.css';
import { useGetToastsQuery } from '../../store/api/toasts.api';
import { useGetUsersQuery } from '../../store/api/users.api';
import { Toast } from '../../types/toast';
import { User } from '../../types/users';

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const options: Intl.DateTimeFormatOptions = {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hourCycle: 'h23',
  };

  return date.toLocaleString('en', options);
};

const getStatusClassName = (status: string) => {
  switch (status.toUpperCase()) {
    case 'ON TIME':
      return styles.statusOnTime;
    case 'CANCELED':
      return styles.statusCanceled;
    case 'DELAYED':
      return styles.statusDelayed;
    default:
      return '';
  }
};

const renderTableRows = (toasts: Toast[], users: User[]) => {
  if (!toasts || toasts.length === 0) {
    return null;
  }

  const usersMap = new Map<string, User>();
  users.forEach((user) => usersMap.set(user.id, user));

  return toasts.map((toast) => {
    const user = usersMap.get(toast.userId);
    const userName = user
      ? `${user.firstName} ${user.lastName}`
      : 'Unknown User';

    const statusClassName = getStatusClassName(toast.toastStatus);

    return (
      <tr key={toast.id} className={styles.selectedRow}>
        <td>{userName}</td>
        <td>{formatDate(toast.date)}</td>
        <td>{toast.description}</td>
        <td className={statusClassName}>{toast.toastStatus}</td>
      </tr>
    );
  });
};

export const Dashboard: React.FC = () => {
  const { data: toasts, isLoading: isLoadingToasts } = useGetToastsQuery();
  const { data: users, isLoading: isLoadingUsers } = useGetUsersQuery();

  const isLoading = isLoadingToasts || isLoadingUsers;

  if (isLoading) {
    return (
      <div>
        <Navigation />
        <div className={styles.container}>
          <h1 className={styles.title}>Loading... ⏳</h1>
          <p>Please wait</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Navigation />
      <div className={styles.container}>
        <h1 className={styles.title}>🍷 Welcome to Golden Toast 🍪</h1>
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
            <tbody>{renderTableRows(toasts || [], users || [])}</tbody>
          </table>
          {(!toasts || toasts.length === 0) && (
            <p className={styles.noData}>No toasts found</p>
          )}
        </div>
      </div>
    </div>
  );
};
