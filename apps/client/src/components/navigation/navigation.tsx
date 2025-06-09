import { NavLink, useNavigate } from 'react-router-dom';
import styles from './navigation.module.css';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from '../navigation-menu';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store';
import { logout } from '../../store/api/auth/auth.slice';

export const Navigation: React.FC = () => {
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );

  const isAdmin = useSelector((state: RootState) => state.auth.isAdmin);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

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

  
            {isAdmin && (
              <NavigationMenuItem className={styles.navItem}>
                <NavLink to="/admin-dashboard" className={styles.navLink}>
                  Admin DashBoard
                </NavLink>
              </NavigationMenuItem>
            )}

            <div style={{ marginLeft: 'auto' }}>
              {isAuthenticated ? (
                <NavigationMenuItem className={styles.navItem}>
                  <button onClick={handleLogout} className={styles.navLink}>
                    Logout
                  </button>
                </NavigationMenuItem>
              ) : (
                <NavigationMenuItem className={styles.navItem}>
                  <NavLink to="/login" className={styles.navLink}>
                    Login
                  </NavLink>
                </NavigationMenuItem>
              )}
            </div>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </>
  );
};
