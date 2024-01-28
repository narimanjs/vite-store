/* eslint-disable react-hooks/exhaustive-deps */
import { useDispatch, useSelector } from 'react-redux';
import Heading from '../../Headling/Heading';
import styles from './Cart.module.css';
import { AppDispatch, RootState } from '../../../redux/store';
import CartItem from '../../CartItem/CartItem';
import { useEffect, useState } from 'react';
import { Product } from '../../../interfaces/product.interface';
import axios from 'axios';
import { PREFIX } from '../../../helpers/API';
import { ThreeDots } from 'react-loader-spinner';
import Button from '../../Button/Button';
import { useNavigate } from 'react-router-dom';
import { cartActions } from '../../../redux/slices/cart.slice';
import React from 'react';

const Cart = () => {
  const [cartProducts, setCartProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const items = useSelector((s: RootState) => s.cart.items);
  const jwt = useSelector((s: RootState) => s.user.jwt);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const total = items
    .map(i => {
      const product = cartProducts.find(p => p.id === i.id);
      if (!product) {
        return 0;
      }
      return i.count * product.price;
    })
    .reduce((acc, i) => (acc += i), 0);
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
      setIsLoading(false);
    }
  };

  const checkout = async () => {
    await axios.post(
      `${PREFIX}/order`,
      {
        products: items,
      },
      {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      }
    );
    dispatch(cartActions.clean());
    navigate('/success');
  };
  useEffect(() => {
    setIsLoading(true); // Устанавливаем isLoading в true перед началом загрузки
    loadAllItems();
  }, []);

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
              <React.Fragment key={product.id}>
                <hr className={styles['hr']} />
                <CartItem
                  key={product.id}
                  count={i.count}
                  {...product}
                />
              </React.Fragment>
            );
          })
        )}
        {items.length === 0 && (
          <>
            <hr className={styles['hr']} />
            <div className={styles['empty-basket-message']}>Корзина пуста</div>
          </>
        )}
        <hr className={styles['hr']} />
        <div className={styles['line']}>
          <div className={styles['text']}>Сумма заказа: </div>
          <div className={styles['price']}>
            {total} <span>₸</span>
          </div>
        </div>
        <hr className={styles['hr']} />
      </div>
      <div className={styles['order']}>
        <Button
          appearence='big'
          onClick={checkout}
        >
          Оформить заказ
        </Button>
      </div>
    </>
  );
};

export default Cart;
