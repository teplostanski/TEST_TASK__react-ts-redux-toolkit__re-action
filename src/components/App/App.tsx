import ItemList from '../ItemList/ItemList';
import PaginationControls from '../PaginationControls/PaginationControls';
import styles from './App.module.scss'

const App = () => {
  return (
    <div className={styles.app}>
      <ItemList />
      <PaginationControls />
    </div>
  );
}

export default App;
