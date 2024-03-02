import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadPosts } from '../../features/posts/postsSlice';
import { RootState, AppDispatch } from '../../app/store';
import SearchForm from '../SearchForm/SearchForm';
import styles from './ItemList.module.scss';

const ItemList = () => {
  const dispatch: AppDispatch = useDispatch();
  const { items, loading, page } = useSelector(
    (state: RootState) => state.posts
  );
  const [searchTerm, setSearchTerm] = useState('');
  const [filterQuery, setFilterQuery] = useState('');

  useEffect(() => {
    dispatch(loadPosts());
  }, [dispatch, page]);

  const highlightMatch = (text: string, query: string) => {
    if (!query) return text;
    const parts = text.split(new RegExp(`(${query})`, 'gi'));
    return parts.map((part, index) =>
      part.toLowerCase() === query.toLowerCase() ? (
        <span key={index} style={{ color: 'red' }}>
          {part}
        </span>
      ) : (
        part
      )
    );
  };

  const handleSearch = () => {
    setFilterQuery(searchTerm);
  };

  const handleClearSearch = () => {
    setSearchTerm('');
    setFilterQuery('');
  };

  const filteredItems = filterQuery
    ? items.filter(
        (item) =>
          item.title.toLowerCase().includes(filterQuery.toLowerCase()) ||
          item.body.toLowerCase().includes(filterQuery.toLowerCase())
      )
    : items;

  return (
    <div>
      <h1>Список элементов</h1>
      <SearchForm
        searchTerm={searchTerm}
        onSearchTermChange={setSearchTerm}
        onSearch={handleSearch}
        onClearSearch={handleClearSearch}
      />
      {loading ? (
        <p>Loading...</p>
      ) : filteredItems.length === 0 ? (
        <p>Элементы не найдены.</p>
      ) : (
        <ul className={styles.list}>
          {filteredItems.map((item) => (
            <li key={item.id} className={styles.listItems}>
              <span>{item.id}</span>
              <h2 className={styles.listItem}>
                {highlightMatch(item.title, filterQuery)}
              </h2>
              <p className={styles.listItem}>
                {highlightMatch(item.body, filterQuery)}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ItemList;
