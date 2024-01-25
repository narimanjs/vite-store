/* eslint-disable indent */
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { BsCart, BsMenuApp } from 'react-icons/bs';
import { RxExit } from 'react-icons/rx';
import styles from './Layout.module.css';
import Button from '../../components/Button/Button';
import Avatar from 'react-avatar';
import cn from 'classnames';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/store';
import { getProfile, userActions } from '../../redux/slices/user.slice';
import { useEffect } from 'react';
const Layout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const profile = useSelector((s: RootState) => s.user.profile);
  const items = useSelector((s: RootState) => s.cart.items);

  useEffect(() => {
    dispatch(getProfile());
  }, [dispatch]);

  const logout = () => {
    dispatch(userActions.logout());
    navigate('/auth/login');
  };

  return (
    <div className={styles['layout']}>
      <div className={styles['sidebar']}>
        <div className={styles['user']}>
          <Avatar
            round
            className={styles['avatar']}
          />
          <div className={styles['name']}> {profile?.name}</div>
          <div className={styles['email']}>{profile?.email}</div>
          <div className={styles['email']}>{profile?.address}</div>
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
            Корзина
            <span className={styles['cart-count']}>
              {items.reduce((acc, item) => (acc += item.count), 0)}
            </span>
          </NavLink>
        </div>
        <div className={styles['exit']}>
          <Button onClick={logout}>
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
