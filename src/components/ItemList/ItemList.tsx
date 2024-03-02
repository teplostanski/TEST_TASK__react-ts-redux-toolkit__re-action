import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadPosts, setSearchQuery } from '../../features/posts/postsSlice';
import { RootState, AppDispatch } from '../../app/store';
import PaginationControls from '../PaginationControls/PaginationControls';

const ItemList = () => {
  const dispatch: AppDispatch = useDispatch();
  const { items, loading, page } = useSelector((state: RootState) => state.posts);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    dispatch(loadPosts());
  }, [dispatch, page, searchTerm]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(setSearchQuery(searchTerm));
  };

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
        <button type="submit">Поиск</button>
      </form>
      {loading ? (
        <p>Loading...</p>
      ) : items.length === 0 ? (
        <p>Элементы не найдены.</p>
      ) : (
        <ul>
          {items.map((item) => (
            <li key={item.id}>
              <h2>{item.title}</h2>
              <p>{item.body}</p>
            </li>
          ))}
        </ul>
      )}
      <PaginationControls />
    </div>
  );
};

export default ItemList;