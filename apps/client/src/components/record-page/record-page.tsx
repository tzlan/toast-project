import styles from './record-page.module.css';
import { Navigation } from '../navigation/navigation';

export const RecordPage = () => {
  const entries = [
    { id: 1, person: 'Shaun', Record: '1' },
    { id: 2, person: 'Aurel', Record: '4' },
    { id: 3, person: 'Ethan', Record: '2' },
  ];

  return (
    <div>
      <Navigation />

      <div className={styles.container}>
        <h1 className={styles.title}>🔥 Welcome to Record Board 🍷</h1>
        <div className={styles.form}>
          <table className={styles.tab}>
            <thead>
              <tr>
                <th>Person</th>
                <th>Score</th>
              </tr>
            </thead>
            <tbody>
              {entries.map((entry) => (
                <tr key={entry.id}>
                  <td>{entry.person}</td>
                  <td>{entry.Record}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
