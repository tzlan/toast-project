import { Navigation } from '../navigation/navigation';
import styles from './toast-past.module.css';

export const ToastPast = () => {
  const entries = [
    {
      id: 1,
      person: 'Tomer',
      date: '1/01/2025',
      description: 'Birthday of Tomer',
    },
    {
      id: 2,
      person: 'Aurel',
      date: '22/02/2025',
      description: 'New job',
    },
    {
      id: 3,
      person: 'Ethan',
      date: '15/03/2025',
      description: 'Finish projet',
    },
  ];

  return (
    <div>
      <Navigation />
      <div className={styles.container}>
        <h1 className={styles.title}>🔥 Welcome history toast 🍷</h1>
        <div className={styles.form}>
          <table className={styles.tab}>
            <thead>
              <tr>
                <th>Person</th>
                <th>Date</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              {entries.map((entry) => (
                <tr key={entry.id}>
                  <td>{entry.person}</td>
                  <td>{entry.date}</td>
                  <td>{entry.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
