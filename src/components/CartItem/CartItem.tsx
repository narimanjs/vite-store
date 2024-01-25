import { FaTenge } from 'react-icons/fa';
import { FaPlusCircle } from 'react-icons/fa';
import { FaMinusCircle } from 'react-icons/fa';
import { MdOutlineDeleteForever } from 'react-icons/md';

import styles from './CartItem.module.css';
import { CardItemProps } from './CartItem.props';

import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../redux/store';
import { cartActions } from '../../redux/slices/cart.slice';
import { MouseEvent } from 'react';

function CardItem(props: CardItemProps) {
  const dispatch = useDispatch<AppDispatch>();

  const increase = () => {
    dispatch(cartActions.add(props.id));
  };

  const decrease = () => {
    // dispatch(cartActions.remove(props.id));
  };

  const remove = () => {
    // dispatch(cartActions.delete(props.id));
  };
  return (
    <div className={styles['item']}>
      <div
        className={styles['image']}
        style={{ backgroundImage: `url('${props.image}')` }}
      ></div>
      <div className={styles['description']}>
        <div className={styles['name']}>{props.name}</div>
        <div className={styles['price']}>
          {props.price}
          <FaTenge className={styles['price']} />
        </div>
      </div>
      <div className={styles['actions']}>
        <FaMinusCircle
          className={styles['button']}
          onClick={decrease}
        />
        <div className={styles['count']}>{props.count}</div>

        <button
          className={styles['button']}
          onClick={e => {
            e.preventDefault();
            increase();
          }}
        >
          <FaPlusCircle />
        </button>

        <MdOutlineDeleteForever
          className={styles['remove']}
          onClick={remove}
        />
      </div>
    </div>
  );
}

export default CardItem;
