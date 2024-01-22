/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable comma-dangle */
/* eslint-disable indent */
import { Link, useNavigate } from 'react-router-dom';
import Button from '../../Button/Button';
import Heading from '../../Headling/Heading';
import Input from '../../Input/Input';
import styles from './Login.module.css';
import { FormEvent, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch, useSelector } from 'react-redux';
import { login, userActions } from '../../../redux/user.slice';
import { RootState } from '../../../redux/store';

export type RegisterForm = {
  email: {
    value: string;
  };
  password: {
    value: string;
  };
};
export function Register() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { jwt, loginErrorMessage } = useSelector((s: RootState) => s.user);

  useEffect(() => {
    if (jwt) {
      navigate('/');
    }
  }, [jwt, navigate]);

  toast.info(loginErrorMessage, {
    position: 'bottom-center',
  });
  const submit = async (e: FormEvent) => {
    e.preventDefault();
    dispatch(userActions.clearLoginError());
    const target = e.target as typeof e.target & RegisterForm;
    const { email, password } = target;
    await sendLogin(email.value, password.value);
  };

  const sendLogin = async (email: string, password: string) => {
    dispatch(login({ email, password }));
  };

  return (
    <div className={styles['login']}>
      <Heading>Вход</Heading>
      {loginErrorMessage && (
        <div className={styles['error']}>{loginErrorMessage}</div>
      )}
      <form
        className={styles['form']}
        onSubmit={submit}
      >
        <div className={styles['field']}>
          <label htmlFor='email'>Введите email</label>
          <Input
            id='email'
            placeholder='email'
            name='email'
          />
        </div>
        <div className={styles['field']}>
          <label htmlFor='password'>Введите пароль</label>
          <Input
            id='password'
            type='password'
            placeholder='пароль'
            name='password'
          />
        </div>
        <div className={styles['field']}>
          <label htmlFor='name'>Ваше имя</label>
          <Input
            id='name'
            placeholder='пароль'
            name='Имя'
          />
        </div>
        <Button appearence='big'>Зарегистрироваться</Button>
      </form>

      <div className={styles['links']}>
        <div>Есть аккаунт?</div>
        <Link to={'/auth/login'}>Войти</Link>
      </div>
    </div>
  );
}

export default Register;
