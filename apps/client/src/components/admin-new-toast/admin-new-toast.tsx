import { useState } from 'react';
import styles from './admin-new-toast.module.css';
import {
  Command,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandItem,
} from '../command';
import { cn } from '../../lib/utils';
import { Navigation } from '../navigation/navigation';

export const AdminNewToast = () => {
  const [dateToast, setDateToast] = useState('');
  const [hourToast, setHourToast] = useState('');
  const [descriptionToast, setDescriptionToast] = useState('');
  const [selectedSoldier, setSelectedSoldier] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(
      selectedSoldier +
        '  ' +
        dateToast +
        ' ' +
        hourToast +
        ' ' +
        descriptionToast
    );
  };
  const handleSelect = (label: string) => {
    setSelectedSoldier(label);
    console.log(
      selectedSoldier +
        '  ' +
        dateToast +
        ' ' +
        hourToast +
        ' ' +
        descriptionToast
    );
  };

  const users = [
    { value: '1', label: 'Tomer' },
    { value: '2', label: 'Nadav' },
    { value: '3', label: 'Shaun' },
    { value: '4', label: 'Aurel' },
    { value: '5', label: 'Inbar' },
    { value: '6', label: 'Ethan' },
    { value: '7', label: 'Bohad' },
  ];

  return (
    <div>
      <Navigation />
      <div className={styles.container}>
        <h1 className={styles.title}>Welcome Admin ! Make a new toast 🍷</h1>
        <form onSubmit={handleSubmit} className={styles.form}>
          <label className={styles.label}>Soldier</label>

          <div className={styles.commandWrapper}>
            <Command
              className={cn('rounded-lg border shadow-md w-80', styles.command)}
            >
              <CommandInput
                placeholder="Name of soldier"
                value={selectedSoldier}
                onValueChange={setSelectedSoldier}
              />
              <CommandList className={styles.commandList}>
                {' '}
                {/* Ajout d’une classe pour limiter */}
                <CommandEmpty>No results found.</CommandEmpty>
                {users.map((user) => (
                  <CommandItem
                    key={user.value}
                    value={user.label}
                    onSelect={() => handleSelect(user.label)}
                  >
                    {user.label}
                  </CommandItem>
                ))}
              </CommandList>
            </Command>
          </div>

          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label htmlFor="dateToast" className={styles.label}>
                Date
              </label>
              <input
                type="date"
                id="dateToast"
                value={dateToast}
                onChange={(e) => setDateToast(e.target.value)}
                className={cn('w-80', styles.input)}
                required
              />
            </div>
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="description" className={styles.label}>
              Description
            </label>
            <input
              type="text"
              id="description"
              value={descriptionToast}
              onChange={(e) => setDescriptionToast(e.target.value)}
              className={cn('w-80', styles.input)}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="hourToast" className={styles.label}>
              Hour
            </label>
            <input
              type="time"
              id="hourToast"
              value={hourToast}
              onChange={(e) => setHourToast(e.target.value)}
              className={cn('w-80', styles.input)}
              required
            />
          </div>

          <button type="submit" className={styles.button}>
            New toaaaaaast 🥳
          </button>
        </form>
      </div>
    </div>
  );
};
