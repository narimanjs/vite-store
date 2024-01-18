import { forwardRef } from 'react';
import styles from './Search.module.css';
import cn from 'classnames';
import { SearchProps } from './Search.props';
import { FcSearch } from 'react-icons/fc';

const Search = forwardRef<HTMLInputElement, SearchProps>(function Input(
  { isValid = true, className, ...props },
  ref
) {
  return (
    <div className={styles['input-wrapper']}>
      <input
        ref={ref}
        className={cn(styles['input'], className, {
          [styles['input']]: isValid,
        })}
        {...props}
      />
      <FcSearch className={styles['search-icon']} />
    </div>
  );
});

export default Search;
