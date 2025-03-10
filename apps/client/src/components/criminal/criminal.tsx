import React from 'react';
import { Navigation } from '../navigation/navigation';
import styles from './criminal.module.css';

interface Entry {
  id: number;
  person: string;
}

const renderTableRows = (entries: Entry[]) => {
  return entries.map((entry) => (
    <tr key={entry.id}>
      <td>{entry.person}</td>
    </tr>
  ));
};

export const Criminal: React.FC = () => {
  const entries: Entry[] = [
    {
      id: 1,
      person: 'Tomer',
    },
    {
      id: 2,
      person: 'Aurel',
    },
    {
      id: 3,
      person: 'Ethan',
    },
  ];

  return (
    <div>
      <Navigation />
      <div className={styles.container}>
        <h1 className={styles.title}>⚠️ Welcome to criminal table ⚠️</h1>

        <div className={styles.tablesContainer}>
          <div className={styles.form}>
            <h2 className={styles.tableTitle}>Personanograta</h2>
            <table className={styles.tab}>
              <thead>
                <tr>
                  <th>Person</th>
                </tr>
              </thead>
              <tbody>{renderTableRows(entries)}</tbody>
            </table>
          </div>

          <div className={styles.form}>
            <h2 className={styles.tableTitle}>Criminal</h2>
            <table className={styles.tab}>
              <thead>
                <tr>
                  <th>Person</th>
                </tr>
              </thead>
              <tbody>{renderTableRows(entries)}</tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
