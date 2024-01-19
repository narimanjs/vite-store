import Heading from '../../Headling/Heading';
import Search from '../../Search/Search';
import styles from './Menu.module.css';

function Menu() {
  return (
    <>
      <div className={styles['head']}>
        <Heading>Меню</Heading>
        <Search placeholder='Введите текст'></Search>
      </div>
    </>
  );
}

export default Menu;
