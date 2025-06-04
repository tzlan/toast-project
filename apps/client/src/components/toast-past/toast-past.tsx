import React from 'react';
import { Navigation } from '../navigation/navigation';
import styles from './toast-past.module.css';
import { useGetPastToastsQuery } from '../../store/api/toasts.api'; // Importe le hook pour les toasts passés
import { useGetUsersQuery } from '../../store/api/users.api'; // Importe le hook pour les utilisateurs
import { Toast } from '../../types/toast'; // Assurez-vous que le chemin est correct
import { User } from '../../types/users'; // Assurez-vous que le chemin est correct

// Fonction pour formater la date (reprise de Dashboard.tsx)
const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const options: Intl.DateTimeFormatOptions = {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hourCycle: 'h23'
  };
  return date.toLocaleString('fr-FR', options).replace(':', ' h ');
};

const renderTableRows = (toasts: Toast[], users: User[]) => {
  if (!toasts || toasts.length === 0) {
    return null;
  }

  // Crée une map pour un accès rapide aux utilisateurs par leur ID
  const usersMap = new Map<string, User>();
  users.forEach(user => usersMap.set(user.id, user));

  return toasts.map((toast) => {
    // Trouvez l'utilisateur correspondant au userId du toast
    const user = usersMap.get(toast.userId);
    // Affiche le nom et prénom, ou 'Utilisateur inconnu' si non trouvé
    const userName = user ? `${user.firstName} ${user.lastName}` : 'Unknown User';

    return (
      <tr key={toast.id}>
        <td>{userName}</td> {/* Affiche le nom et prénom de l'utilisateur */}
        <td>{formatDate(toast.date)}</td> {/* Appelle la fonction de formatage de date */}
        <td>{toast.description}</td>
      </tr>
    );
  });
};

export const ToastPast: React.FC = () => {
  const { data: toasts, isLoading: isLoadingToasts } = useGetPastToastsQuery(); // Récupère les toasts passés
  const { data: users, isLoading: isLoadingUsers } = useGetUsersQuery(); // Récupère tous les utilisateurs

  // Combine les états de chargement
  const isLoading = isLoadingToasts || isLoadingUsers;

  // Affiche un message de chargement pendant la récupération des données
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
            <tbody>{renderTableRows(toasts || [], users || [])}</tbody> {/* Passe les toasts et les utilisateurs */}
          </table>
          {(!toasts || toasts.length === 0) && (
            <p className={styles.noData}>No past toasts found.</p>
          )}
        </div>
      </div>
    </div>
  );
};