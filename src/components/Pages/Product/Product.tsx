import { useLoaderData } from 'react-router-dom';
import { Product } from '../../../interfaces/product.interface';
import Heading from '../../Headling/Heading';
import styles from './Product.module.css';
import Button from '../../Button/Button';
import { BiCartAdd } from 'react-icons/bi';
import { FaTenge } from 'react-icons/fa';
import { FcRating } from 'react-icons/fc';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../redux/store';
import { cartActions } from '../../../redux/slices/cart.slice';
import { useEffect, useState } from 'react';
import { ThreeDots } from 'react-loader-spinner';

function ProductItem() {
  const data = useLoaderData() as Product;
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const dispatch = useDispatch<AppDispatch>();

  const increase = () => {
    dispatch(cartActions.add(data.id));
  };
  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    // Очищаем таймер при unmount
    return () => clearTimeout(timeout);
  }, []);
  return (
    <>
      <div className={styles['head']}>
        <Heading>{data.name}</Heading>{' '}
      </div>
      {isLoading ? (
        // Отображение прелоадера
        <ThreeDots
          color='hsla(37, 90%, 50%, 1)'
          visible={true}
          height='50'
          width='50'
          radius='9'
          ariaLabel='three-dots-loading'
        />
      ) : (
        <div className={styles['content']}>
          <div className={styles['image-container']}>
            <img
              src={data.image}
              alt={data.name}
              className={styles['image']}
            />
          </div>
          <div className={styles['info-container']}>
            <div className={styles['price']}>
              Цена: {data.price} <FaTenge className={styles['currency']} />
            </div>
            <div className={styles['rating']}>
              Рейтинг: {data.rating}
              <FcRating className={styles['rating-icon']} />
            </div>
            <div className={styles['ingredients']}>
              Состав:
              <ul className={styles['ingredients-ul']}>
                {data.ingredients.map((ingredient, index) => (
                  <li key={index}>{ingredient}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
      <div className={styles['add-to-cart']}>
        <Button
          appearence='small'
          onClick={increase}
        >
          Добавить в корзину
        </Button>
        <BiCartAdd className={styles['add-to-card-icon']} />
      </div>
    </>
  );
}

export default ProductItem;
