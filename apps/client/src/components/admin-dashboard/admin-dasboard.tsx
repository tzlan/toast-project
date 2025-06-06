import React, { useState } from 'react';
import { Navigation } from '../navigation/navigation';
import styles from './admin-dashboard.module.css';
import {
  useGetFutureToastsQuery,
  useDeleteToastMutation,
  useAdminEditToastMutation,
} from '../../store/api/toasts.api';
import { useGetUsersQuery } from '../../store/api/users.api';
import { Toast } from '../../types/toast';
import { User } from '../../types/users';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ToastStatus } from '../../lib/toasts-status.enum';

// Helper to format date
const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  const options: Intl.DateTimeFormatOptions = {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hourCycle: 'h23',
  };
  return date.toLocaleString('EN', options);
};

export const AdminDashboard: React.FC = () => {
  const {
    data: futureToastsData,
    isLoading: isLoadingFutureToasts,
    refetch: refetchFutureToasts,
  } = useGetFutureToastsQuery();
  const { data: users, isLoading: isLoadingUsers } = useGetUsersQuery();

  const [deleteToastMutation] = useDeleteToastMutation();
  const [adminEditToastMutation] = useAdminEditToastMutation();

  const [editingToastId, setEditingToastId] = useState('');
  const [editedDescription, setEditedDescription] = useState('');
  const [editedDate, setEditedDate] = useState('');
  const [editedTime, setEditedTime] = useState('');
  const [editedPlace, setEditedPlace] = useState('');
  const [editedStatus, setEditedStatus] = useState<ToastStatus>(
    ToastStatus.ON_TIME
  );

  const isLoading = isLoadingFutureToasts || isLoadingUsers;

  const handleDeleteToast = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this toast?')) {
      try {
        await deleteToastMutation(id).unwrap();
        toast.success('Toast deleted successfully!');
        refetchFutureToasts();
      } catch (err) {
        console.error('Failed to delete toast:', err);
        toast.error('Failed to delete toast.');
      }
    }
  };

  const handleEditClick = (toast: Toast) => {
    setEditingToastId(toast.id);
    setEditedDescription(toast.description);
    setEditedDate(new Date(toast.date).toISOString().split('T')[0]);
    setEditedTime(
      new Date(toast.date).toTimeString().split(' ')[0].substring(0, 5)
    );
    setEditedPlace(toast.place);
    setEditedStatus(toast.toastStatus);
  };

  const handleCancelEdit = () => {
    setEditingToastId('');
    resetEditState();
  };

  const handleSaveEdit = async (id: string) => {
    try {
      const combinedDateTime = new Date(`${editedDate}T${editedTime}:00Z`);
      await adminEditToastMutation({
        id,
        toastData: {
          description: editedDescription,
          date: combinedDateTime.toISOString(),
          place: editedPlace,
          toastStatus: editedStatus,
        },
      }).unwrap();
      toast.success('Toast updated successfully!');
      setEditingToastId('');
      refetchFutureToasts();
      resetEditState();
    } catch (err) {
      console.error('Failed to update toast:', err);
      toast.error('Failed to update toast.');
    }
  };

  const resetEditState = () => {
    setEditedDescription('');
    setEditedDate('');
    setEditedTime('');
    setEditedPlace('');
    setEditedStatus(ToastStatus.ON_TIME);
  };

  if (isLoading) {
    return (
      <div>
        <Navigation />
        <div className={styles.container}>
          <h1 className={styles.title}>Loading Admin Dashboard ... ⏳</h1>
          <p>Please wait</p>
        </div>
      </div>
    );
  }

  const futureToasts = futureToastsData || [];
  const allUsers = users || [];
  const usersMap = new Map<string, User>();
  allUsers.forEach((user) => usersMap.set(user.id, user));

  return (
    <div>
      <Navigation />
      <ToastContainer />
      <div className={styles.container}>
        <h1 className={styles.title}>🍷 Welcome Admin of Golden Toast 🍪</h1>
        <div className={styles.form}>
          <table className={styles.tab}>
            <thead>
              <tr>
                <th>Person</th>
                <th>Date</th>
                <th>Description</th>
                <th>Place</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {futureToasts.length === 0 ? (
                <tr>
                  <td colSpan={6} className={styles.noData}>
                    No future toasts found.
                  </td>
                </tr>
              ) : (
                futureToasts.map((toastItem) => {
                  const user = usersMap.get(toastItem.userId);
                  const userName = user
                    ? `${user.firstName} ${user.lastName}`
                    : 'Unknown User';
                  const isEditing = editingToastId === toastItem.id;

                  return (
                    <tr key={toastItem.id}>
                      <td>{userName}</td>
                      <td>
                        {isEditing ? (
                          <>
                            <input
                              type="date"
                              value={editedDate}
                              onChange={(e) => setEditedDate(e.target.value)}
                              className={styles.inlineInput}
                            />
                            <input
                              type="time"
                              value={editedTime}
                              onChange={(e) => setEditedTime(e.target.value)}
                              className={styles.inlineInput}
                            />
                          </>
                        ) : (
                          formatDate(toastItem.date)
                        )}
                      </td>
                      <td>
                        {isEditing ? (
                          <input
                            type="text"
                            value={editedDescription}
                            onChange={(e) =>
                              setEditedDescription(e.target.value)
                            }
                            className={styles.inlineInput}
                          />
                        ) : (
                          toastItem.description
                        )}
                      </td>
                      <td>
                        {isEditing ? (
                          <input
                            type="text"
                            value={editedPlace}
                            onChange={(e) => setEditedPlace(e.target.value)}
                            className={styles.inlineInput}
                          />
                        ) : (
                          toastItem.place
                        )}
                      </td>
                      <td>
                        {isEditing ? (
                          <select
                            value={editedStatus}
                            onChange={(e) =>
                              setEditedStatus(e.target.value as ToastStatus)
                            }
                            className={styles.inlineInput}
                          >
                            <option value="ON TIME">ON TIME</option>
                            <option value="DELAYED">DELAYED</option>
                            <option value="CANCELED">CANCELED</option>
                          </select>
                        ) : (
                          toastItem.toastStatus
                        )}
                      </td>
                      <td className={styles.actionsCell}>
                        {isEditing ? (
                          <>
                            <button
                              className={styles.saveButton}
                              onClick={() => handleSaveEdit(toastItem.id)}
                            >
                              Save
                            </button>
                            <button
                              className={styles.deleteButton}
                              onClick={handleCancelEdit}
                            >
                              Cancel
                            </button>
                          </>
                        ) : (
                          <>
                            <button
                              className={styles.editButton}
                              onClick={() => handleEditClick(toastItem)}
                            >
                              Edit
                            </button>
                            <button
                              className={styles.deleteButton}
                              onClick={() => handleDeleteToast(toastItem.id)}
                            >
                              Delete
                            </button>
                          </>
                        )}
                      </td>
                    </tr>
                  );
                }) 
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};


