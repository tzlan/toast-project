import React, { useState } from 'react';
import { Navigation } from '../navigation/navigation';
import styles from './admin-dashboard.module.css';

interface Entry {
  id: number;
  person: string;
  date: string;
  description: string;
  status: string;
}

const renderTableRows = (
  entries: Entry[],
  selectedDeleteId: number | null,
  onSelectDelete: (id: number) => void
) => {
  return entries.map((entry) => (
    <tr
      key={entry.id}
      className={selectedDeleteId === entry.id ? styles.selectedRow : ''}
    >
      <td>{entry.person}</td>
      <td>{entry.date}</td>
      <td>{entry.description}</td>
      <td>{entry.status}</td>
      
        <button
          className={`${styles.deleteButton} ${
            selectedDeleteId === entry.id ? styles.selectedButton : ''
          }`}
          onClick={() => onSelectDelete(entry.id)}
        >
          Delete
        </button>
      
    </tr>
  ));
};

export const AdminDashboard: React.FC = () => {
  const [entries, setEntries] = useState<Entry[]>([
    {
      id: 1,
      person: 'Tomer',
      date: '1/01/2025',
      description: 'Birthday of Tomer',
      status: 'Pending',
    },
    {
      id: 2,
      person: 'Aurel',
      date: '22/02/2025',
      description: 'New job',
      status: 'On time',
    },
    {
      id: 3,
      person: 'Ethan',
      date: '15/03/2025',
      description: 'Finish project',
      status: 'Canceled',
    },
  ]);

  const [selectedDeleteId, setSelectedDeleteId] = useState<number | null>(null);

  const handleSelectDelete = (id: number) => {
    if (selectedDeleteId === id) setSelectedDeleteId(null);
    else setSelectedDeleteId(id);
  };

  const handleConfirmDelete = () => {
    if (selectedDeleteId !== null) {
      setEntries(entries.filter((entry) => entry.id !== selectedDeleteId));
      setSelectedDeleteId(null);
    }
  };

  return (
    <div>
      <Navigation />
      <div className={styles.container}>
        <h1 className={styles.title}>🍷 Welcome Admin of Golden Toast 🍪</h1>
        <div className={styles.form}>
          <table className={styles.tab}>
            <thead>
              <tr>
                <th>Person</th>
                <th>Date</th>
                <th>Description</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {renderTableRows(entries, selectedDeleteId, handleSelectDelete)}
            </tbody>
          </table>
          {selectedDeleteId !== null && (
            <button
              className={styles.confirmButton}
              onClick={handleConfirmDelete}
            >
              Are you sure to delete ?
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
