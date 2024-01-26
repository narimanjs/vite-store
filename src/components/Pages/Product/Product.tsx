import { useLoaderData } from 'react-router-dom';
import { Product } from '../../../interfaces/product.interface';
import Heading from '../../Headling/Heading';
import styles from './Product.module.css';
import Button from '../../Button/Button';

function Product() {
  const data = useLoaderData() as Product;

  return (
    <>
      <div className={styles['head']}>
        <Heading>{data.name}</Heading>{' '}
        <Button appearence='small'>Добавить в корзину</Button>
      </div>
      <div className={styles['content']}>
        <img
          src={data.image}
          alt={data.name}
        />
      </div>
    </>
  );
}

export default Product;
