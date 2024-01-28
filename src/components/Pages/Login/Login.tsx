/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable comma-dangle */
/* eslint-disable indent */
import { Link, useNavigate } from 'react-router-dom';
import Button from '../../Button/Button';
import Heading from '../../Headling/Heading';
import Input from '../../Input/Input';
import styles from './Login.module.css';
import { FormEvent, useEffect } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch, useSelector } from 'react-redux';
import { login, userActions } from '../../../redux/slices/user.slice';
import { RootState } from '../../../redux/store';

export type LoginForm = {
  email: {
    value: string;
  };
  password: {
    value: string;
  };
};
export function Login() {
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
    const target = e.target as typeof e.target & LoginForm;
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
        <Button appearence='big'>Вход</Button>
      </form>

      <div className={styles['links']}>
        <div>Нет аккаунта?</div>
        <Link to={'/auth/register'}>Зарегистрироваться</Link>
      </div>
    </div>
  );
}

export default Login;
