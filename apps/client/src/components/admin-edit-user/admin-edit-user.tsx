import React, { useState, useEffect } from 'react';
import styles from './admin-edit-user.module.css';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { Navigation } from '../navigation/navigation';
import { useForm, SubmitHandler } from 'react-hook-form';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
  role: 'PERSONA' | 'CRIMINAL' | 'ADMIN' | null;
};

export const AdminEditUser: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [selectedButton, setSelectedButton] =
    useState<UserFormInputs['role']>(null);

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

  useEffect(() => {
    if (selectedUserIdValue && users) {
      const userToEdit = users.find((user) => user.id === selectedUserIdValue);
      if (userToEdit) {
        setValue('firstName', userToEdit.firstName);
        setValue('lastName', userToEdit.lastName);
        // Conversion du rôle en majuscules si nécessaire
        const roleUpperCase =
          userToEdit.role?.toUpperCase() as UserFormInputs['role'];
        setValue('role', roleUpperCase);
        setSelectedButton(roleUpperCase);
      }
    } else {
      reset({
        selectedUserId: '',
        firstName: '',
        lastName: '',
        password: '',
        role: null,
      });
      setSelectedButton(null);
    }
  }, [selectedUserIdValue, users, setValue, reset]);

  const onSubmit: SubmitHandler<UserFormInputs> = async (data) => {
    console.log('🔍 Form data submitted:', data);

    if (!data.selectedUserId) {
      toast.error('Please select a user to modify.');
      return;
    }
    if (!data.role) {
      toast.error('Please select a role.');
      return;
    }

    const selectedUser = users?.find((user) => user.id === data.selectedUserId);
    console.log('👤 Selected user:', selectedUser);

    if (!selectedUser) {
      toast.error("The selected user's data was not found.");
      return;
    }

    const updatePayload: Partial<User> = {
      soldierId: selectedUser.soldierId,
      firstName: data.firstName,
      lastName: data.lastName,
      status: data.role,
    };

    if (data.password) {
      updatePayload.password = data.password;
    }

    console.log('📦 Update payload being sent:', updatePayload);
    console.log('🎯 Target user ID:', data.selectedUserId);

    try {
      toast.success('User updated successfully! 🎉');

      await refetchUsers();

      setTimeout(() => {
        const updatedUser = users?.find((u) => u.id === data.selectedUserId);
        console.log('🔄 User after refetch:', updatedUser);
      }, 1000);

      reset();
      setSelectedButton(null);
    } catch (error: any) {
      console.error('❌ Error while updating user:', error);
      console.error('❌ Error details:', error?.data);
      const errorMessage =
        error?.data?.message || 'Update failed. Please try again.';
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
              Select a user
            </label>
            {areUsersLoading && <p>Loading users...</p>}
            {isUsersError && (
              <p className={styles.error}>Error loading users.</p>
            )}
            {!areUsersLoading && !isUsersError && (
              <select
                id="selectedUser"
                className={styles.input}
                {...register('selectedUserId', {
                  required: 'Please select a user.',
                })}
              >
                <option value="">-- Select a soldier --</option>
                {users?.map((user) => (
                  <option key={user.id} value={user.id}>
                    {user.firstName} {user.lastName} (ID: {user.soldierId})
                  </option>
                ))}
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
                {...register('firstName', {
                  required: 'First name is required',
                })}
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
                  required: 'Last name is required',
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

          <div className={styles.buttonGroup}>
            <input
              type="hidden"
              {...register('role', { required: 'Please select a status' })}
            />
            <button
              type="button"
              className={`${styles.buttonAdmin} ${
                selectedButton === 'PERSONA'
                  ? styles.buttonGray
                  : styles.buttonRed
              }`}
              onClick={() => handleButtonClick('PERSONA')}
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
          {errors.role && (
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
