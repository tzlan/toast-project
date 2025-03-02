import styles from './record-page.module.css';

export const RecordPage = () => {
  const entries = [
    { id: 1, person: 'Shaun', Record: '1' },
    { id: 2, person: 'Aurel', Record: '4' },
    { id: 3, person: 'Ethan', Record: '2' },
  ];

  const monthRecord = 10;
  const everRecord = 25;
  const personalRecord = 3;

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>🔥 Welcome to record Board 🍷</h1>

      <div className={styles['stats-container']}>
        <div className={styles['stat-box']}>
          <h2 className={styles['stat-title']}>Month Record</h2>
          <p className={styles['stat-number']}>{monthRecord}</p>
        </div>
        <div className={styles['stat-box']}>
          <h2 className={styles['stat-title']}>Ever Record</h2>
          <p className={styles['stat-number']}>{everRecord}</p>
        </div>
        <div className={styles['stat-box']}>
          <h2 className={styles['stat-title']}>Personal Record</h2>
          <p className={styles['stat-number']}>{personalRecord}</p>
        </div>
      </div>

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
  );
};
