import { Link, useNavigate } from 'react-router-dom';
import Button from '../../Button/Button';
import Heading from '../../Headling/Heading';
import Input from '../../Input/Input';
import styles from './Register.module.css';
import { FormEvent, useEffect } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch, useSelector } from 'react-redux';
import { register, userActions } from '../../../redux/slices/user.slice';
import { AppDispatch, RootState } from '../../../redux/store';

export type RegisterForm = {
  email: {
    value: string;
  };
  password: {
    value: string;
  };
  name?:
    | {
        value?: string | undefined;
      }
    | undefined;
};
export function Register() {
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();
  const { jwt, registerErrorMessage } = useSelector((s: RootState) => s.user);

  useEffect(() => {
    if (jwt) {
      navigate('/');
    }
  }, [jwt, navigate]);

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    dispatch(userActions.clearRegisteError());
    const target = e.target as typeof e.target & RegisterForm;
    const { email, password, name } = target;

    if (
      email &&
      email.value &&
      password &&
      password.value &&
      name &&
      name.value
    ) {
      dispatch(
        register({
          email: email.value,
          password: password.value,
          name: name.value,
        })
      );
    } else {
      console.error('One or more properties are missing or undefined');
    }
  };

  return (
    <div className={styles['login']}>
      <Heading>Регистрация</Heading>
      {registerErrorMessage && (
        <div className={styles['error']}>{registerErrorMessage}</div>
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
            placeholder='Имя'
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
