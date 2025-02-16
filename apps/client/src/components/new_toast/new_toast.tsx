// Importation des modules nécessaires
import { Link } from "react-router-dom";
import React, { useState } from 'react';
import styles from './user_registration.module.css'


// Définition du composant Login
export const New_toast = () => {
  // Déclaration des états pour gérer les entrées utilisateur et la visibilité du mot de passe
  const [idSoldier, setIdSoldier] = useState('');
  const [familyNameSoldier, setfamilyNameSoldier] = useState('');
  const [nameSoldier, setnameSoldier] = useState('');
  const [dateToast, setdateToast] = useState('');
  const [hoursToast, sethoursToast] = useState('');

  // Gestionnaire de soumission du formulaire
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Id soldier -- >', idSoldier);
    console.log('familyNameSoldier -- >', familyNameSoldier);
    console.log('nameSoldier -- >', nameSoldier);
    console.log('dateToast -- >', dateToast);
    console.log('hoursToast -- >', hoursToast);
    // Logique pour le backend     
  };



  return (
    <div className={styles.container}>
      <h1 className={styles.title}>New Toast</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        {/* Aligner Id Soldier et Name côte à côte */}
        <div className={styles.formRow}>
          <div className={styles.formGroup}>
            <label htmlFor="idSoldier" className={styles.label}>
              Id Soldier
            </label>
            <input
              type="number"
              id="idSoldier"
              value={idSoldier}
              onChange={(e) => setIdSoldier(e.target.value)}
              className={styles.input}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="nameSoldier" className={styles.label}>
              Name
            </label>
            <input
              type="text"
              id="nameSoldier"
              value={nameSoldier}
              onChange={(e) => setnameSoldier(e.target.value)}
              className={styles.input}
              required
            />
          </div>
        </div>

        {/* Champ Family Name */}
        <div className={styles.formGroup}>
          <label htmlFor="familyNameSoldier" className={styles.label}>
            Family Name
          </label>
          <input
            type="text"
            id="familyNameSoldier"
            value={familyNameSoldier}
            onChange={(e) => setfamilyNameSoldier(e.target.value)}
            className={styles.input}
            required
          />
        </div>

        {/* Aligner Date et Hours côte à côte */}
        <div className={styles.formRow}>
          <div className={styles.formGroup}>
            <label htmlFor="dateToast" className={styles.label}>
              Date
            </label>
            <input
              type="date"
              id="dateToast"
              value={dateToast}
              onChange={(e) => setdateToast(e.target.value)}
              className={styles.input}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="hoursToast" className={styles.label}>
              Hours
            </label>
            <input
              type="time"
              id="hoursToast"
              value={hoursToast}
              onChange={(e) => sethoursToast(e.target.value)}
              className={styles.input}
              required
            />
          </div>
        </div>

        {/* Bouton de soumission */}
        <button type="submit" className={styles.button}>
          Create New Toast
        </button>
      </form>
    </div>
  );
};