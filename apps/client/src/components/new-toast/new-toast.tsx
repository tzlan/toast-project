import styles from './new-toast.module.css';
import { Navigation } from '../navigation/navigation';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useCreateToastMutation } from '../../store/api/toasts.api';
import { CreateToastDto } from '../../types/toast';
import { useGetUsersQuery } from '../../store/api/users.api';
import { User } from '../../types/users';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ToastStatus } from '../../lib/toasts-status.enum';

type NewToastFormInputs = {
  dateToast: string;
  hourOfToast: string;
  descriptionToast: string;
  shtiaMakerId: string;
  place: string;
};

export const NewToast = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<NewToastFormInputs>({
    defaultValues: {
      dateToast: '',
      hourOfToast: '',
      descriptionToast: '',
      shtiaMakerId: '',
      place: '',
    },
  });

  const {
    data: users,
    isLoading: areUsersLoading,
    isError: isUsersError,
  } = useGetUsersQuery();

  const [createToast, { isLoading: isCreatingToast }] =
    useCreateToastMutation();

  const onSubmit: SubmitHandler<NewToastFormInputs> = async (data) => {
    if (!data.shtiaMakerId) {
      toast.error('🚨 Oops! Please select who will be making the shtia.');
      return;
    }
    if (!data.place) {
      toast.error("📍 Don't forget to specify the place!");
      return;
    }

    const combinedDateTime = `${data.dateToast}T${data.hourOfToast}:00`;

    const toastData: CreateToastDto = {
      userId: data.shtiaMakerId,
      date: new Date(combinedDateTime),
      description: data.descriptionToast,
      toastStatus: ToastStatus.ON_TIME,
      place: data.place,
    };

    try {
      await createToast(toastData).unwrap();
      toast.success('🎉 Awesome! Your toast has been created successfully!');
      setValue('dateToast', '');
      setValue('hourOfToast', '');
      setValue('descriptionToast', '');
      setValue('shtiaMakerId', '');
      setValue('place', '');
    } catch (error: any) {
      console.error('Failed to create toast:', error);
      const errorMessage =
        error?.data?.message || 'Unknown error while creating the toast.';
      toast.error(`❌ Something went wrong: ${errorMessage}`);
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
        <h1 className={styles.title}>Create a new "toast" 🍷</h1>
        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label htmlFor="shtiaMaker" className={styles.label}>
                Person making the shtia
              </label>
              {areUsersLoading && <p>Loading users...</p>}
              {isUsersError && (
                <p className={styles.error}>Error loading users.</p>
              )}
              {!areUsersLoading && !isUsersError && (
                <select
                  id="shtiaMaker"
                  {...register('shtiaMakerId', {
                    required: 'Please select a person.',
                  })}
                  className={styles.input}
                >
                  <option value="">-- Select a USER --</option>
                  {users?.map((user: User) => (
                    <option key={user.id} value={user.id}>
                      {user.firstName} {user.lastName} (ID: {user.soldierId})
                    </option>
                  ))}
                </select>
              )}
              {errors.shtiaMakerId && (
                <span className={styles.error}>
                  {errors.shtiaMakerId.message}
                </span>
              )}
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="dateToast" className={styles.label}>
                Date
              </label>
              <input
                type="date"
                id="dateToast"
                {...register('dateToast', { required: 'Date is required' })}
                className={styles.input}
              />
              {errors.dateToast && (
                <span className={styles.error}>{errors.dateToast.message}</span>
              )}
            </div>
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="hourOfToast" className={styles.label}>
              Time
            </label>
            <input
              type="time"
              id="hourOfToast"
              {...register('hourOfToast', { required: 'Time is required' })}
              className={styles.input}
            />
            {errors.hourOfToast && (
              <span className={styles.error}>{errors.hourOfToast.message}</span>
            )}
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="descriptionToast" className={styles.label}>
              Description
            </label>
            <input
              type="text"
              id="descriptionToast"
              {...register('descriptionToast', {
                required: 'Description is required',
              })}
              className={styles.formImputDescription}
            />
            {errors.descriptionToast && (
              <span className={styles.error}>
                {errors.descriptionToast.message}
              </span>
            )}
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="place" className={styles.label}>
              Place
            </label>
            <input
              type="text"
              id="place"
              {...register('place', { required: 'Place is required' })}
              className={styles.input}
            />
            {errors.place && (
              <span className={styles.error}>{errors.place.message}</span>
            )}
          </div>

          <button
            type="submit"
            className={styles.button}
            disabled={isCreatingToast || areUsersLoading}
          >
            {isCreatingToast ? 'Creating...' : 'New toast 🥳'}
          </button>
        </form>
      </div>
    </div>
  );
};
