import { BsCartPlus } from 'react-icons/bs';
import { FcRating } from 'react-icons/fc';
import { FaTenge } from 'react-icons/fa';

import styles from './ProductCard.module.css';
import { ProductCardProps } from './ProductCard.props';
import { Link } from 'react-router-dom';

function ProductCard(props: ProductCardProps) {
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
            {props.price}{' '}
            <span className={styles['currency']}>
              <FaTenge />
            </span>
          </div>
          <button className={styles['add-to-card']}>
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
