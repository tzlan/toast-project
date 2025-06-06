import { Navigation } from '../navigation/navigation';
import styles from './record-page.module.css';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import {
  useGetPersonalRecordQuery,
  useGetCurrentRecordQuery,
  useGetAllTimeRecordQuery,
} from '../../store/api/toasts.api';
import { useGetUsersQuery } from '../../store/api/users.api';
import { useEffect } from 'react';

export const RecordPage = () => {
  const currentUserId = useSelector((state: RootState) => state.auth.user?.id);
  const currentSoldierId = useSelector(
    (state: RootState) => state.auth.user?.soldierId
  );
  const isAdmin = useSelector((state: RootState) => state.auth.user?.isAdmin);
  const userFirstName = useSelector(
    (state: RootState) => state.auth.user?.firstName
  );

  useEffect(() => {
    if (currentSoldierId !== undefined && currentSoldierId !== null) {
      console.log('User logged in. Soldier ID:', currentSoldierId);
    } else {
      console.log('User is not logged in or Soldier ID is not available yet.');
    }
    if (isAdmin !== undefined && isAdmin !== null) {
      console.log('Is Admin:', isAdmin);
    }
  }, [currentSoldierId, isAdmin]);

  const { data: personalRecord, isLoading: isLoadingPersonalRecord } =
    useGetPersonalRecordQuery(currentUserId as string, {
      skip: !currentUserId,
    });
  const {
    data: currentPeriodRecordData,
    isLoading: isLoadingCurrentPeriodRecord,
  } = useGetCurrentRecordQuery();
  const { data: allTimeRecordData, isLoading: isLoadingAllTimeRecord } =
    useGetAllTimeRecordQuery();

  const { isLoading: isLoadingUsers } = useGetUsersQuery();

  const isLoading =
    isLoadingPersonalRecord ||
    isLoadingCurrentPeriodRecord ||
    isLoadingAllTimeRecord ||
    isLoadingUsers;

  if (isLoading) {
    return (
      <div>
        <Navigation />
        <div className={styles.container}>
          <h1 className={styles.title}>Loading Records ... ⏳</h1>
          <p>Please wait</p>
        </div>
      </div>
    );
  }

  const displayPersonalRecord =
    personalRecord !== undefined ? personalRecord : 0;
  const displayCurrentPeriodRecord =
    currentPeriodRecordData?.toastCountInPeriod !== undefined
      ? currentPeriodRecordData.toastCountInPeriod
      : 0;
  const displayAllTimeRecord =
    allTimeRecordData?.count !== undefined ? allTimeRecordData.count : 0;

  return (
    <div>
      <Navigation />
      <div className={styles.container}>
        <h1 className={styles.title}>🔥 Welcome to Record Board 🍷 </h1>

        {userFirstName && (
          <p className={styles.title}>
            Hello, {userFirstName}!{isAdmin && ` Vous êtes administrateur.`}
          </p>
        )}

        <div className={styles['stats-container']}>
          <div className={styles['stat-box']}>
            <h2 className={styles['stat-title']}>Period Score </h2>
            <p className={styles['stat-number']}>
              {displayCurrentPeriodRecord}
            </p>
          </div>
          <div className={styles['stat-box']}>
            <h2 className={styles['stat-title']}>All-Time Record</h2>
            <p className={styles['stat-number']}>{displayAllTimeRecord}</p>
          </div>
          <div className={styles['stat-box']}>
            <h2 className={styles['stat-title']}>Your Personal Score</h2>
            <p className={styles['stat-number']}>{displayPersonalRecord}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
