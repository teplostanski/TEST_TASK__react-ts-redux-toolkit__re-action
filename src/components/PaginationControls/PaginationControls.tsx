import { useDispatch, useSelector } from 'react-redux';
import { setPage } from '../../features/posts/postsSlice';
import { RootState } from '../../app/store';

const PaginationControls = () => {
  const dispatch = useDispatch();
  const currentPage = useSelector((state: RootState) => state.posts.page);

  const goToNextPage = () => {
    dispatch(setPage(currentPage + 1));
  };

  const goToPreviousPage = () => {
    dispatch(setPage(currentPage - 1));
  };

  return (
    <div>
      <button onClick={goToPreviousPage}>Назад</button>
      <button onClick={goToNextPage}>Вперед</button>
    </div>
  );
};

export default PaginationControls;
