import React from 'react';
import { MdClear, MdOutlineSearch } from 'react-icons/md';
import styles from './SearchForm.module.scss';
import Button from '../Button/Button';

interface SearchFormProps {
  searchTerm: string;
  onSearchTermChange: (newSearchTerm: string) => void;
  onSearch: () => void;
  onClearSearch: () => void;
}

const SearchForm: React.FC<SearchFormProps> = ({
  searchTerm,
  onSearchTermChange,
  onSearch,
  onClearSearch,
}) => {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSearch();
      }}
      className={styles.searchForm}
    >
      <div className={styles.searchInputContainer}>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => onSearchTermChange(e.target.value)}
          placeholder="Поиск..."
          className={styles.searchInput}
        />
        <Button
          type="button"
          onClick={onClearSearch}
          className={styles.clearButton}
        >
          <MdClear color="white" />
        </Button>
      </div>
      <Button type="submit" className={styles.searchButton}>
        <MdOutlineSearch color="white" />
      </Button>
    </form>
  );
};

export default SearchForm;
