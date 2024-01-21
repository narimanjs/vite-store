import { useEffect, useState } from 'react';
import Heading from '../../Headling/Heading';
import Search from '../../Search/Search';
import { Product } from '../../../interfaces/product.interface';
import styles from './Menu.module.css';
import axios, { AxiosError } from 'axios';
import { PREFIX } from '../../../helpers/API';
import { MenuList } from './MenuList/MenuList';
import RingLoader from 'react-spinners/RingLoader';

function Menu() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | undefined>();

  const getMenu = async () => {
    try {
      setIsLoading(true);
      const { data } = await axios.get<Product[]>(`${PREFIX}/products`);
      setProducts(data);
      setIsLoading(false);
    } catch (e) {
      console.error(e);
      if (e instanceof AxiosError) {
        setError(e.message);
      }
      setIsLoading(false);

      return;
    }
  };
  useEffect(() => {
    getMenu();
  }, []);
  return (
    <>
      <div className={styles['head']}>
        <Heading>Меню</Heading>
        <Search placeholder='Введите текст'></Search>
      </div>

      <div className={styles['loader-container']}>
        {error && <>{error}</>}
        {!isLoading && <MenuList products={products} />}
        {isLoading && (
          <>
            <RingLoader
              color='hsla(37, 90%, 50%, 1)'
              className={styles['preloader']}
            />
          </>
        )}
      </div>
    </>
  );
}

export default Menu;
