import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadPosts } from '../../features/posts/postsSlice';
import { RootState, AppDispatch } from '../../app/store';
import PaginationControls from '../PaginationControls/PaginationControls';

const ItemList = () => {
  const dispatch: AppDispatch = useDispatch();
  const { items, loading, page } = useSelector((state: RootState) => state.posts);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterQuery, setFilterQuery] = useState('');

  useEffect(() => {
    dispatch(loadPosts());
  }, [dispatch, page]);

  const highlightMatch = (text: string, query: string) => {
    if (!query) return text;
    const parts = text.split(new RegExp(`(${query})`, 'gi'));
    return parts.map((part, index) =>
      part.toLowerCase() === query.toLowerCase() ? <span key={index} style={{ color: 'red' }}>{part}</span> : part
    );
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setFilterQuery(searchTerm); 
  };
  
  const handleClearSearch = () => {
    setSearchTerm('');
    setFilterQuery('');
  };

  const filteredItems = filterQuery
    ? items.filter(item =>
        item.title.toLowerCase().includes(filterQuery.toLowerCase()) ||
        item.body.toLowerCase().includes(filterQuery.toLowerCase())
      )
    : items;

  return (
    <div>
      <h1>Список элементов</h1>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Поиск..."
        />
        <button type="button" onClick={handleClearSearch}>Очистить</button>
        <button type="submit">Поиск</button>
      </form>
      {loading ? <p>Loading...</p> : filteredItems.length === 0 ? <p>Элементы не найдены.</p> : (
        <ul>
          {filteredItems.map((item) => (
            <li key={item.id}>
              <span>{item.id}</span>
              <h2>{highlightMatch(item.title, filterQuery)}</h2>
              <p>{highlightMatch(item.body, filterQuery)}</p>
            </li>
          ))}
        </ul>
      )}
      <p>Страница {page}</p>
      <PaginationControls />
    </div>
  );
};

export default ItemList;