import { useState } from 'react';
import styles from './admin-edit-user.module.css';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { Navigation } from '../navigation/navigation';
import { useForm, SubmitHandler } from 'react-hook-form';

type UserFormInputs = {
  idSoldier: string;
  familyNameSoldier: string;
  personalName: string;
  password: string;
  role: string | null;
};

export const AdminEditUser = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [selectedButton, setSelectedButton] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<UserFormInputs>({
    defaultValues: {
      idSoldier: '',
      familyNameSoldier: '',
      personalName: '',
      password: '',
      role: null,
    },
  });

  const onSubmit: SubmitHandler<UserFormInputs> = (data) => {
    
    console.log(data);
    console.log('Selected role:', selectedButton);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleButtonClick = (buttonType: string) => {
    if (selectedButton === buttonType) {
      setSelectedButton(null);
    } else {
      setSelectedButton(buttonType);
      setValue('role', buttonType); 
    }
  };

  return (
    <div>
      <Navigation />
      <div className={styles.container}>
        <h1 className={styles.title}>Edit user ✍🏼</h1>
        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
          <div className={styles.formGroup}>
            <label htmlFor="idSoldier" className={styles.label}>
              Soldier Id
            </label>
            <input
              type="number"
              id="idSoldier"
              className={styles.input}
              {...register('idSoldier', { required: true })}
            />
            {errors.idSoldier && (
              <span className={styles.error}>This field is required</span>
            )}
          </div>
          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label htmlFor="familyNameSoldier" className={styles.label}>
                Family Name
              </label>
              <input
                type="text"
                id="familyNameSoldier"
                className={styles.input}
                {...register('familyNameSoldier', { required: true })}
              />
              {errors.familyNameSoldier && (
                <span className={styles.error}>This field is required</span>
              )}
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="personalName" className={styles.label}>
                Personal Name
              </label>
              <input
                type="text"
                id="personalName"
                className={styles.input}
                {...register('personalName', { required: true })}
              />
              {errors.personalName && (
                <span className={styles.error}>This field is required</span>
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
              {...register('password', { required: true })}
            />
            <span className={styles.eye} onClick={togglePasswordVisibility}>
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
            {errors.password && (
              <span className={styles.error}>This field is required</span>
            )}
          </div>

          <div className={styles.buttonGroup}>
            <button
              type="button" 
              className={`${styles.buttonAdmin} ${
                selectedButton === 'persona'
                  ? styles.buttonGray
                  : styles.buttonRed
              }`}
              onClick={() => handleButtonClick('persona')}
            >
              Persona
            </button>

            <button
              type="button"
              className={`${styles.buttonAdmin} ${
                selectedButton === 'criminal'
                  ? styles.buttonGray
                  : styles.buttonYellow
              }`}
              onClick={() => handleButtonClick('criminal')}
            >
              Criminal
            </button>

            <button
              type="button" 
              className={`${styles.buttonAdmin} ${styles.buttonOrange}`}
              onClick={() => handleButtonClick('admin')}
            >
              Admin
            </button>
          </div>

          <button type="submit" className={styles.button}>
            Update
          </button>
        </form>
      </div>
    </div>
  );
};
