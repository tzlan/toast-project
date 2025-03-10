// apps/client/src/components/navigation/Navigation.tsx
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import styles from './navigation.module.css';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from '../navigation-menu';

export const Navigation: React.FC = () => {
  return (
    <>
      <div className={styles.nav}>
        <NavigationMenu>
          <NavigationMenuList className={styles.navList}>
            <NavigationMenuItem className={styles.navItem}>
              <NavLink to="/admin-edit-user" className={styles.navLink}>
                Edit User
              </NavLink>
            </NavigationMenuItem>
            <NavigationMenuItem className={styles.navItem}>
              <NavLink to="/admin-new-toast" className={styles.navLink}>
                Admin New Toast
              </NavLink>
            </NavigationMenuItem>
            <NavigationMenuItem className={styles.navItem}>
              <NavLink to="/" className={styles.navLink}>
                Login
              </NavLink>
            </NavigationMenuItem>
            <NavigationMenuItem className={styles.navItem}>
              <NavLink to="/new-toast" className={styles.navLink}>
                New Toast
              </NavLink>
            </NavigationMenuItem>
            <NavigationMenuItem className={styles.navItem}>
              <NavLink to="/record-page" className={styles.navLink}>
                Record Page
              </NavLink>
            </NavigationMenuItem>
            <NavigationMenuItem className={styles.navItem}>
              <NavLink to="/user-registration" className={styles.navLink}>
                User Registration
              </NavLink>
            </NavigationMenuItem>
            <NavigationMenuItem className={styles.navItem}>
              <NavLink to="/toast-past" className={styles.navLink}>
                Toasts past
              </NavLink>
            </NavigationMenuItem>
            <NavigationMenuItem className={styles.navItem}>
              <NavLink to="/criminal" className={styles.navLink}>
                Criminals
              </NavLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </>
  );
};
