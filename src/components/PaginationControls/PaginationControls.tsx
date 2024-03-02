import { useDispatch, useSelector } from 'react-redux';
import { setPage } from '../../features/posts/postsSlice';
import { RootState } from '../../app/store';
import styles from './PaginationControls.module.scss';
import { MdArrowBackIos, MdArrowForwardIos } from 'react-icons/md';
import Button from '../Button/Button';

const PaginationControls = () => {
  const dispatch = useDispatch();
  const { page } = useSelector((state: RootState) => state.posts);

  const goToNextPage = () => {
    dispatch(setPage(page + 1));
  };

  const goToPreviousPage = () => {
    dispatch(setPage(page - 1));
  };

  return (
    <div className={styles.container}>
      <p>Страница {page}</p>
      <Button onClick={goToPreviousPage}>
        <MdArrowBackIos color="white" />
      </Button>
      <Button onClick={goToNextPage}>
        <MdArrowForwardIos color="white" />
      </Button>
    </div>
  );
};

export default PaginationControls;
