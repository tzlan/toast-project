import React from 'react';

import { Navigation } from '../navigation/navigation';

import styles from './toast-past.module.css';

import { useGetPastToastsQuery } from '../../store/api/toasts.api';

import { useGetUsersQuery } from '../../store/api/users.api';

import { Toast } from '../../types/toast';

import { User } from '../../types/users';

import { useSelector } from 'react-redux';

import { RootState } from '../../store';

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

  return date.toLocaleString('En', options);
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

    return (
      <tr key={toast.id}>
        <td>{userName}</td>

        <td>{formatDate(toast.date)}</td>

        <td>{toast.description}</td>
      </tr>
    );
  });
};

export const ToastPast: React.FC = () => {
  const { user, isAdmin } = useSelector((state: RootState) => state.auth);

  const { data: toasts, isLoading: isLoadingToasts } = useGetPastToastsQuery(
    isAdmin ? undefined : { userId: user?.id }
  );

  const { data: users, isLoading: isLoadingUsers } = useGetUsersQuery();

  const isLoading = isLoadingToasts || isLoadingUsers;

  if (isLoading) {
    return (
      <div>
        <Navigation />

        <div className={styles.container}>
          <h1 className={styles.title}>Loading HisToastry ... ⏳</h1>

          <p>Please wait</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Navigation />

      <div className={styles.container}>
        <h1 className={styles.title}>🔥 Welcome HisToastry 🍷</h1>

        <div className={styles.form}>
          <table className={styles.tab}>
            <thead>
              <tr>
                <th>User</th>

                <th>Date</th>

                <th>Description</th>
              </tr>
            </thead>

            <tbody>{renderTableRows(toasts || [], users || [])}</tbody>
          </table>

          {(!toasts || toasts.length === 0) && (
            <p className={styles.noData}>No past toasts found.</p>
          )}
        </div>
      </div>
    </div>
  );
};
