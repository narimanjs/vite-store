import { NavLink, Outlet } from 'react-router-dom';
import { BsCart, BsMenuApp } from 'react-icons/bs';
import { RxExit } from 'react-icons/rx';
import styles from './Layout.module.css';
import Button from '../../components/Button/Button';
import Avatar from 'react-avatar';
import cn from 'classnames';
const Layout = () => {
  return (
    <div className={styles['layout']}>
      <div className={styles['sidebar']}>
        <div className={styles['user']}>
          <Avatar
            round
            className={styles['avatar']}
          />
          <div className={styles['name']}> User</div>
          <div className={styles['email']}>user@gmail.com</div>
        </div>
        <div className={styles['menu']}>
          <NavLink
            to='/'
            className={({ isActive }) =>
              cn(styles['link'], { [styles.active]: isActive })
            }
          >
            <BsMenuApp /> Меню
          </NavLink>
          <NavLink
            to='/cart'
            className={({ isActive }) =>
              cn(styles['link'], { [styles.active]: isActive })
            }
          >
            <BsCart />
            Cart
          </NavLink>
        </div>
        <div className={styles['exit']}>
          <Button>
            <RxExit /> Выход
          </Button>
        </div>
      </div>
      <div className={styles['content']}>
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
