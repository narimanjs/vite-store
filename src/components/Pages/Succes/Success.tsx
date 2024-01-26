import { useNavigate } from 'react-router-dom';
import Button from '../../Button/Button';
import styles from './Success.module.css';
export const Success = () => {
  const navigate = useNavigate();
  return (
    <div className={styles['success']}>
      <img
        src='/pizza.png'
        alt='Изображение пиццы'
      />
      <div className={styles['text']}>Ваш заказ успешно оформлен!</div>
      <Button
        appearence='big'
        onClick={() => navigate('/')}
      >
        Сделать новый
      </Button>
    </div>
  );
};
