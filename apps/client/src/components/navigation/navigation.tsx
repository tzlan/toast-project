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
              <NavLink to="/past-toast" className={styles.navLink}>
                Past Toast
              </NavLink>
            </NavigationMenuItem>
            <NavigationMenuItem className={styles.navItem}>
              <NavLink to="/login" className={styles.navLink}>
                Login
              </NavLink>
            </NavigationMenuItem>


            <NavigationMenuItem className={styles.navItem}>
              <NavLink to="/dashboard" className={styles.navLink}>
                Dashboard
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
              <NavLink to="/admin-dashboard" className={styles.navLink}>
                Admin DashBoard
              </NavLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </>
  );
};
