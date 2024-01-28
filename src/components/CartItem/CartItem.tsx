import { FaTenge } from 'react-icons/fa';
import { FaPlusCircle } from 'react-icons/fa';
import { FaMinusCircle } from 'react-icons/fa';
import { MdOutlineDeleteForever } from 'react-icons/md';

import styles from './CartItem.module.css';
import { CartItemProps } from './CartItem.props';

import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../redux/store';
import { cartActions } from '../../redux/slices/cart.slice';
import { NavLink } from 'react-router-dom';

function CartItem(props: CartItemProps) {
  const dispatch = useDispatch<AppDispatch>();

  const increase = () => {
    console.log('cart increase', props.id);

    dispatch(cartActions.add(props.id));
  };

  const decrease = () => {
    dispatch(cartActions.remove(props.id));
  };

  const remove = () => {
    dispatch(cartActions.delete(props.id));
  };
  return (
    <div className={styles['item']}>
      <NavLink
        to={`/product/${props.id}`}
        className={styles['link']}
      >
        <div
          className={styles['image']}
          style={{ backgroundImage: `url('${props.image}')` }}
        ></div>
      </NavLink>
      <div className={styles['description']}>
        <div className={styles['name']}>{props.name}</div>
        <div className={styles['price']}>
          {props.price}
          <FaTenge className={styles['price']} />
        </div>
      </div>
      <div className={styles['actions']}>
        <FaMinusCircle
          className={styles['minus']}
          onClick={decrease}
        />
        <div className={styles['count']}>{props.count}</div>

        <FaPlusCircle
          className={styles['plus']}
          onClick={increase}
        />

        <MdOutlineDeleteForever
          className={styles['remove']}
          onClick={remove}
        />
      </div>
    </div>
  );
}

export default CartItem;
