import { Link, useNavigate } from 'react-router-dom';
import Button from '../../Button/Button';
import Heading from '../../Headling/Heading';
import Input from '../../Input/Input';
import styles from './Login.module.css';
import { FormEvent, useState } from 'react';
import axios, { AxiosError } from 'axios';
import { PREFIX } from '../../../helpers/API';
import { LoginResponse } from '../../../interfaces/auth.interface';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export type LoginForm = {
  email: {
    value: string;
  };
  password: {
    value: string;
  };
};
function Login() {
  const [error, setError] = useState<string | null>();
  const navigate = useNavigate();
  toast.info(error, {
    position: 'bottom-center',
  });
  const submit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    const target = e.target as typeof e.target & LoginForm;
    const { email, password } = target;
    await sendLogin(email.value, password.value);
  };
  const sendLogin = async (email: string, password: string) => {
    try {
      const { data } = await axios.post<LoginResponse>(`${PREFIX}/auth/login`, {
        email,
        password,
      });
      console.log(data);
      localStorage.setItem('jwt', data.access_token);
      navigate('/');
    } catch (e) {
      if (e instanceof AxiosError) {
        console.log(e.response?.data.message);

        setError(e.response?.data.message);
      }
    }
  };

  return (
    <div className={styles['login']}>
      <Heading>Вход</Heading>
      {error && <div className={styles['error']}>{error}</div>}
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
