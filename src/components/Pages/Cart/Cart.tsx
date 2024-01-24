import { useSelector } from 'react-redux';
import Heading from '../../Headling/Heading';
import styles from './Cart.module.css';
import { RootState } from '../../../redux/store';
import CardItem from '../../CartItem/CartItem';
import { useEffect, useState } from 'react';
import { Product } from '../../../interfaces/product.interface';
import axios from 'axios';
import { PREFIX } from '../../../helpers/API';
import { ThreeDots } from 'react-loader-spinner';

const Cart = () => {
  const [cartProducts, setCartProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true); // Установите изначальное значение в true
  const items = useSelector((s: RootState) => s.cart.items);

  const getItem = async (id: number) => {
    const { data } = await axios.get(`${PREFIX}/products/${id}`);
    return data;
  };

  const loadAllItems = async () => {
    try {
      const res = await Promise.all(items.map(i => getItem(i.id)));
      setCartProducts(res);
    } catch (error) {
      console.error('Ошибка при загрузке данных:', error);
    } finally {
      // Вызывайте setIsLoading(false) как завершающую строку, чтобы гарантировать, что она будет вызвана
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setIsLoading(true); // Устанавливаем isLoading в true перед началом загрузки
    loadAllItems();
  }, [items]);

  return (
    <>
      <Heading className={styles['heading']}>Корзина</Heading>
      <div className={styles['parent-container']}>
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
          // Отображение содержимого корзины
          items.map(i => {
            const product = cartProducts.find(p => p.id === i.id);
            if (!product) {
              return null;
            }
            return (
              <CardItem
                key={product.id}
                count={i.count}
                {...product}
              />
            );
          })
        )}
      </div>
    </>
  );
};

export default Cart;
