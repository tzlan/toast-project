import React, { useState } from 'react';
import { Navigation } from '../navigation/navigation';
import styles from './dashboard.module.css';

interface Entry {
  id: number;
  person: string;
  date: string;
  description: string;
  status: string;
}

const renderTableRows = (entries: Entry[]) => {
  return entries.map((entry) => (
    <tr key={entry.id} className={entry.id ? styles.selectedRow : ''}>
      <td>{entry.person}</td>
      <td>{entry.date}</td>
      <td>{entry.description}</td>
      <td>{entry.status}</td>
    </tr>
  ));
};

export const Dashboard: React.FC = () => {
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

  return (
    <div>
      <Navigation />
      <div className={styles.container}>
        <h1 className={styles.title}>🍷 Welcome User of Golden Toast 🍪</h1>
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
            <tbody>{renderTableRows(entries)}</tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
