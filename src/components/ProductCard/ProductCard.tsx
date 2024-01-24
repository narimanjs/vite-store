import { BsCartPlus } from 'react-icons/bs';
import { FcRating } from 'react-icons/fc';
import { FaTenge } from 'react-icons/fa';

import styles from './ProductCard.module.css';
import { ProductCardProps } from './ProductCard.props';
import { Link } from 'react-router-dom';
import { MouseEvent } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../redux/store';
import { cartActions } from '../../redux/slices/cart.slice';

function ProductCard(props: ProductCardProps) {
  const dispatch = useDispatch<AppDispatch>();
  const add = (e: MouseEvent) => {
    e.preventDefault();
    dispatch(cartActions.add(props.id));
  };
  return (
    <Link
      to={`/product/${props.id}`}
      className={styles['link']}
    >
      <div className={styles['card']}>
        <div
          className={styles['head']}
          style={{ backgroundImage: `url('${props.image}')` }}
          // style={{ backgroundColor: 'red' }}
        >
          <div className={styles['price']}>
            {props.price} <FaTenge className={styles['currency']} />
          </div>
          <button
            className={styles['add-to-card']}
            onClick={add}
          >
            <BsCartPlus className={styles['add-to-card-icon']} />
          </button>
          <div className={styles['rating']}>
            {props.rating} <FcRating />
          </div>
        </div>
        <div className={styles['footer']}>
          <div className={styles['name']}>{props.name}</div>
          <div className={styles['description']}>{props.description}</div>
        </div>
      </div>
    </Link>
  );
}

export default ProductCard;
