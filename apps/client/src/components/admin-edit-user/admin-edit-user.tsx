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
  // const watchRole = watch('role'); // Non utilisé, peut être supprimé

  useEffect(() => {
    // Exécuter ce useEffect seulement quand les utilisateurs sont chargés et qu'il n'y a pas d'erreur
    if (!areUsersLoading && !isUsersError && users) {
      let userToLoad: User | undefined;
      let targetUserId: string | undefined = undefined;

      if (isAdmin === false && currentUserId) {
        // Si c'est un utilisateur simple, ciblez toujours son propre ID
        targetUserId = currentUserId;
        // On définit immédiatement la valeur du select pour l'utilisateur simple
        setValue('selectedUserId', currentUserId);
      } else if (selectedUserIdValue) {
        // Si c'est un admin ou si un ID est déjà sélectionné, utilisez l'ID sélectionné
        targetUserId = selectedUserIdValue;
      } else {
        // Réinitialiser si aucun utilisateur n'est sélectionné et ce n'est pas un non-admin qui arrive
        reset();
        setSelectedButton(null);
        return;
      }

      // Recherchez l'utilisateur ciblé
      userToLoad = users.find((user) => user.id === targetUserId);

      if (userToLoad) {
        setValue('firstName', userToLoad.firstName || '');
        setValue('lastName', userToLoad.lastName || '');
        // Assurez-vous que 'status' est bien le champ pour le rôle dans votre User type
        const roleUpperCase = (userToLoad.status?.toUpperCase() ||
          null) as UserFormInputs['role'];
        setValue('role', roleUpperCase);
        setSelectedButton(roleUpperCase);
      } else if (isAdmin === false && currentUserId) {
        // Si l'utilisateur simple n'est pas trouvé (ex: données pas encore disponibles),
        // réinitialiser ou gérer l'état en attente
        reset();
        setSelectedButton(null);
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
    // Si l'utilisateur n'est pas admin, il ne peut modifier que lui-même
    if (isAdmin === false && data.selectedUserId !== currentUserId) {
      toast.error('Non autorisé à modifier d\'autres utilisateurs.');
      return;
    }

    // `selectedUserId` sera toujours défini pour les non-admins grâce à `setValue` dans `useEffect`
    if (!data.selectedUserId) {
      toast.error('Veuillez sélectionner un utilisateur.');
      return;
    }

    // Le rôle n'est obligatoire que si c'est un admin ou si un rôle a été modifié
    // Simplification de la logique de validation du rôle
    if (isAdmin && !data.role) {
        toast.error('Veuillez sélectionner un rôle.');
        return;
    }

    // Le rôle pour un non-admin devrait déjà être prérempli et ne pas être modifiable.
    // Cette validation peut être plus souple si le rôle est juste une valeur d'affichage pour l'utilisateur.
    if (isAdmin === false && !data.role) {
      toast.error('Erreur : le rôle de l\'utilisateur n\'est pas défini.');
      return;
    }

    const updatePayload: Partial<User> = {
      firstName: data.firstName,
      lastName: data.lastName,
      // Le rôle n'est envoyé que si c'est un admin, ou si la valeur est significative
      // Sinon, pour un simple user, on ne devrait pas laisser le frontend changer son rôle
      // La ligne suivante sera problématique si un non-admin peut changer son rôle
      // Mieux vaut ne pas inclure `status` dans le payload si `isAdmin` est `false`
      status: isAdmin ? data.role : undefined, // N'envoyer le rôle que si l'admin est connecté
    };

    // Si le mot de passe est fourni, l'inclure dans le payload
    if (data.password) {
      updatePayload.password = data.password;
    }

    try {
      await adminEditUser({
        id: data.selectedUserId,
        userData: updatePayload,
      }).unwrap();

      toast.success('Utilisateur mis à jour ! 🎉');
      await refetchUsers(); // Re-fetch les utilisateurs pour avoir les dernières données

      // Après la mise à jour, réinitialisez le formulaire et réchargez les données de l'utilisateur actuel
      // C'est important pour un non-admin pour voir ses propres modifications
      reset(); // Réinitialise tous les champs du formulaire
      setSelectedButton(null); // Réinitialise l'état du bouton de rôle

      // Recharger les données de l'utilisateur juste après la mise à jour
      // Cette partie peut être simplifiée car le `useEffect` se déclenchera avec `users` mis à jour par `refetchUsers`
      // Mais pour s'assurer que les champs sont bien remplis immédiatement:
      if (currentUserId) { // Pas besoin de vérifier isAdmin ici, c'est pour l'utilisateur actuel
        const userToEditAfterUpdate = users?.find((u) => u.id === currentUserId);
        if (userToEditAfterUpdate) {
          setValue('selectedUserId', currentUserId); // S'assurer que le select est bien positionné
          setValue('firstName', userToEditAfterUpdate.firstName || '');
          setValue('lastName', userToEditAfterUpdate.lastName || '');
          const roleUpperCase = (userToEditAfterUpdate.status?.toUpperCase() || null) as UserFormInputs['role'];
          setValue('role', roleUpperCase);
          setSelectedButton(roleUpperCase);
        }
      }

    } catch (error: any) {
      const errorMessage =
        error?.data?.message || 'La mise à jour a échoué. Veuillez réessayer.';
      toast.error(`Erreur : ${errorMessage}`);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleButtonClick = (buttonType: UserFormInputs['role']) => {
    // Si l'utilisateur n'est pas admin, il ne peut pas changer son rôle via les boutons
    if (isAdmin === false) {
      toast.info('Seuls les administrateurs peuvent modifier les rôles.');
      return;
    }

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
        <h1 className={styles.title}>Modifier l'utilisateur ✍🏼</h1>
        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
          <div className={styles.formGroup}>
            <label htmlFor="selectedUser" className={styles.label}>
              Sélectionner un utilisateur
            </label>
            {areUsersLoading && <p>Chargement des utilisateurs...</p>}
            {isUsersError && (
              <p className={styles.error}>Erreur lors du chargement des utilisateurs.</p>
            )}
            {!areUsersLoading && !isUsersError && (
              <select
                id="selectedUser"
                className={styles.input}
                {...register('selectedUserId', {
                  required: 'Veuillez sélectionner un utilisateur.',
                })}
                disabled={isAdmin === false} // Désactive le select pour les non-admins
              >
                {isAdmin ? (
                  <>
                    <option value="">-- Sélectionner un soldat --</option>
                    {users?.map((user) => (
                      <option key={user.id} value={user.id}>
                        {user.firstName} {user.lastName} (ID: {user.soldierId})
                      </option>
                    ))}
                  </>
                ) : (
                  // Pour les non-admins, afficher seulement leur propre option et la sélectionner par défaut
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
                Prénom
              </label>
              <input
                type="text"
                id="firstName"
                className={styles.input}
                {...register('firstName', { required: 'Le prénom est requis' })}
              />
              {errors.firstName && (
                <span className={styles.error}>{errors.firstName.message}</span>
              )}
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="lastName" className={styles.label}>
                Nom
              </label>
              <input
                type="text"
                id="lastName"
                className={styles.input}
                {...register('lastName', {
                  required: 'Le nom est requis',
                })}
              />
              {errors.lastName && (
                <span className={styles.error}>{errors.lastName.message}</span>
              )}
            </div>
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="password" className={styles.label}>
              Mot de passe
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

          {isAdmin && ( // Le groupe de boutons de rôle n'est visible que pour les admins
            <div className={styles.buttonGroup}>
              <input
                type="hidden"
                {...register('role', {
                  required: 'Veuillez sélectionner un statut',
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
                Criminel
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
            {isUpdatingUser ? 'Mise à jour...' : 'Mettre à jour'}
          </button>
        </form>
      </div>
    </div>
  );
};