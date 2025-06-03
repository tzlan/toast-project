import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import styles from './user-registration.module.css';
import { useCreateUserMutation } from '../../store/api/users.api';
import { CreateUserDto } from '../../types/users';

type RegistrationFormInputs = CreateUserDto;

export const UserRegistration = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<RegistrationFormInputs>({
    defaultValues: {
      soldierId: undefined,
      firstName: '',
      lastName: '',
      password: '',
    },
  });

  const [isPasswordShown, setShowPassword] = useState(false);

  const [
    createUser,
    { isLoading },
  ] = useCreateUserMutation();

  const onSubmit: SubmitHandler<RegistrationFormInputs> = async (data) => {
    try {
      await createUser(data).unwrap();
      toast.success('Registration successful! Redirecting to dashboard...', {
        position: 'top-right',
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });
      reset();
      setTimeout(() => {
        navigate('/dashboard');
      }, 2000);
    } catch (err: any) {
      console.error('Registration failed:', err);
      const errorMessage = err?.data?.message || 'Registration failed. Please try again.';
      toast.error(`Error: ${errorMessage}`, {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div className={styles.container}>
      <ToastContainer />
      <h1 className={styles.title}>Join the Toast Club</h1>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <div className={styles.formRow}>
          <div className={styles.formGroup}>
            <label htmlFor="soldierId" className={styles.label}>
              Soldier Id
            </label>
            <input
              type="number"
              id="soldierId"
              {...register('soldierId', {
                required: 'Soldier Id is required.',
                valueAsNumber: true,
              })}
              className={styles.input}
            />
            {errors.soldierId && (
              <span className={styles.error}>{errors.soldierId.message}</span>
            )}
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="firstName" className={styles.label}>
              First name
            </label>
            <input
              type="text"
              id="firstName"
              {...register('firstName', { required: 'First name is required.' })}
              className={styles.input}
            />
            {errors.firstName && (
              <span className={styles.error}>{errors.firstName.message}</span>
            )}
          </div>
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="lastName" className={styles.label}>
            Last Name
          </label>
          <input
            type="text"
            id="lastName"
            {...register('lastName', { required: 'Last Name is required.' })}
            className={styles.input}
          />
          {errors.lastName && (
            <span className={styles.error}>{errors.lastName.message}</span>
          )}
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="password" className={styles.label}>
            Password
          </label>
          <div className={styles.passwordInputContainer}>
            <input
              type={isPasswordShown ? 'text' : 'password'}
              id="password"
              {...register('password', { required: 'Password is required.' })}
              className={styles.input}
            />
            <span
              className={styles.eye}
              onClick={togglePasswordVisibility}
            >
              {isPasswordShown ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
          {errors.password && (
            <span className={styles.error}>{errors.password.message}</span>
          )}
        </div>

        <button type="submit" className={styles.button} disabled={isLoading}>
          {isLoading ? 'Joining...' : 'Join the toast club'}
        </button>
      </form>
    </div>
  );
};