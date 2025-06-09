import React, { useState, useEffect } from 'react';
import styles from './admin-edit-user.module.css';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { Navigation } from '../navigation/navigation';
import { useForm, SubmitHandler } from 'react-hook-form';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import {
  useAdminEditUserMutation,
  useGetUsersQuery,
} from '../../store/api/users.api';
import { User } from '../../types/users';

type UserFormInputs = {
  selectedUserId: string;
  firstName: string;
  lastName: string;
  password?: string;
  role: 'PERSONA_NON_GRATA' | 'CRIMINAL' | 'ADMIN' | null;
};

export const AdminEditUser: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [selectedButton, setSelectedButton] =
    useState<UserFormInputs['role']>(null);

  const currentUserId = useSelector((state: RootState) => state.auth.user?.id);
  const isAdmin = useSelector((state: RootState) => state.auth.user?.isAdmin);

  const {
    data: users,
    isLoading: areUsersLoading,
    isError: isUsersError,
    refetch: refetchUsers,
  } = useGetUsersQuery();
  const [adminEditUser, { isLoading: isUpdatingUser }] =
    useAdminEditUserMutation();

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    watch,
    formState: { errors },
  } = useForm<UserFormInputs>({
    defaultValues: {
      selectedUserId: '',
      firstName: '',
      lastName: '',
      password: '',
      role: null,
    },
  });

  const selectedUserIdValue = watch('selectedUserId');
  const watchRole = watch('role');

  useEffect(() => {
    if (!areUsersLoading && !isUsersError && users) {
      let userToLoad: User | undefined;

      if (isAdmin === false && currentUserId) {
        setValue('selectedUserId', currentUserId);
        userToLoad = users.find((user) => user.id === currentUserId);
      } else if (selectedUserIdValue) {
        userToLoad = users.find((user) => user.id === selectedUserIdValue);
      } else {
        reset();
        setSelectedButton(null);
        return;
      }

      if (userToLoad) {
        setValue('firstName', userToLoad.firstName || '');
        setValue('lastName', userToLoad.lastName || '');
        const roleUpperCase = (userToLoad.status?.toUpperCase() ||
          null) as UserFormInputs['role'];
        setValue('role', roleUpperCase);
        setSelectedButton(roleUpperCase);
      }
    }
  }, [
    selectedUserIdValue,
    users,
    setValue,
    reset,
    currentUserId,
    isAdmin,
    areUsersLoading,
    isUsersError,
  ]);

  const onSubmit: SubmitHandler<UserFormInputs> = async (data) => {
    if (isAdmin === false && data.selectedUserId !== currentUserId) {
      toast.error("Not authorized to modify other users.");
      return;
    }

    if (!data.selectedUserId) {
      toast.error('Please select a user.');
      return;
    }

    if (isAdmin && !data.role) {
      toast.error('Please select a role.');
      return;
    }

    if (isAdmin === false && !data.role) {
      toast.error('Error: User role not defined.');
      return;
    }

    const updatePayload: Partial<User> = {
      firstName: data.firstName,
      lastName: data.lastName,
      status: data.role,
    };

    if (data.password) {
      updatePayload.password = data.password;
    }

    try {
      await adminEditUser({
        id: data.selectedUserId,
        userData: updatePayload,
      }).unwrap();

      toast.success('User updated! 🎉');
      await refetchUsers();

      reset();
      setSelectedButton(null);

      if (isAdmin === false && currentUserId) {
        setValue('selectedUserId', currentUserId);
        const userToEditAfterUpdate = users?.find(
          (user) => user.id === currentUserId
        );
        if (userToEditAfterUpdate) {
          setValue('firstName', userToEditAfterUpdate.firstName || '');
          setValue('lastName', userToEditAfterUpdate.lastName || '');
          const roleUpperCase = (userToEditAfterUpdate.status?.toUpperCase() ||
            null) as UserFormInputs['role'];
          setValue('role', roleUpperCase);
          setSelectedButton(roleUpperCase);
        }
      }
    } catch (error: any) {
      const errorMessage =
        error?.data?.message || 'Update failed.';
      toast.error(`Error: ${errorMessage}`);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleButtonClick = (buttonType: UserFormInputs['role']) => {
    if (selectedButton === buttonType) {
      setSelectedButton(null);
      setValue('role', null, { shouldValidate: true });
    } else {
      setSelectedButton(buttonType);
      setValue('role', buttonType, { shouldValidate: true });
    }
  };

  return (
    <div>
      <Navigation />
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <div className={styles.container}>
        <h1 className={styles.title}>Edit User ✍🏼</h1>
        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
          <div className={styles.formGroup}>
            <label htmlFor="selectedUser" className={styles.label}>
              Select user
            </label>
            {areUsersLoading && <p>Loading user</p>}
            {isUsersError && (
              <p className={styles.error}>
                Error loading users.
              </p>
            )}
            {!areUsersLoading && !isUsersError && (
              <select
                id="selectedUser"
                className={styles.input}
                {...register('selectedUserId', {
                  required: 'Select user',
                })}
                disabled={isAdmin === false}
              >
                {isAdmin ? (
                  <>
                    <option value="">-- Select soldier --</option>
                    {users?.map((user) => (
                      <option key={user.id} value={user.id}>
                        {user.firstName} {user.lastName} (ID: {user.soldierId})
                      </option>
                    ))}
                  </>
                ) : (
                  users
                    ?.filter((user) => user.id === currentUserId)
                    .map((user) => (
                      <option key={user.id} value={user.id}>
                        {user.firstName} {user.lastName} (ID: {user.soldierId})
                      </option>
                    ))
                )}
              </select>
            )}
            {errors.selectedUserId && (
              <span className={styles.error}>
                {errors.selectedUserId.message}
              </span>
            )}
          </div>

          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label htmlFor="firstName" className={styles.label}>
                First Name
              </label>
              <input
                type="text"
                id="firstName"
                className={styles.input}
                {...register('firstName', { required: 'First name required' })}
              />
              {errors.firstName && (
                <span className={styles.error}>{errors.firstName.message}</span>
              )}
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="lastName" className={styles.label}>
                Last Name
              </label>
              <input
                type="text"
                id="lastName"
                className={styles.input}
                {...register('lastName', {
                  required: 'Last name required',
                })}
              />
              {errors.lastName && (
                <span className={styles.error}>{errors.lastName.message}</span>
              )}
            </div>
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="password" className={styles.label}>
              Password
            </label>
            <input
              type={showPassword ? 'text' : 'password'}
              id="password"
              className={styles.input}
              {...register('password')}
            />
            <span className={styles.eye} onClick={togglePasswordVisibility}>
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
            {errors.password && (
              <span className={styles.error}>{errors.password.message}</span>
            )}
          </div>

          {isAdmin && (
            <div className={styles.buttonGroup}>
              <input
                type="hidden"
                {...register('role', {
                  required: 'Select status',
                })}
              />
              <button
                type="button"
                className={`${styles.buttonAdmin} ${
                  selectedButton === 'PERSONA_NON_GRATA'
                    ? styles.buttonGray
                    : styles.buttonRed
                }`}
                onClick={() => handleButtonClick('PERSONA_NON_GRATA')}
              >
                Persona
              </button>
              <button
                type="button"
                className={`${styles.buttonAdmin} ${
                  selectedButton === 'CRIMINAL'
                    ? styles.buttonGray
                    : styles.buttonYellow
                }`}
                onClick={() => handleButtonClick('CRIMINAL')}
              >
                Criminal
              </button>
              <button
                type="button"
                className={`${styles.buttonAdmin} ${styles.buttonOrange}`}
                onClick={() => handleButtonClick('ADMIN')}
              >
                Admin
              </button>
            </div>
          )}
          {isAdmin && errors.role && (
            <span className={styles.error}>{errors.role.message}</span>
          )}

          <button
            type="submit"
            className={styles.button}
            disabled={isUpdatingUser || areUsersLoading}
          >
            {isUpdatingUser ? 'Updating...' : 'Update'}
          </button>
        </form>
      </div>
    </div>
  );
};