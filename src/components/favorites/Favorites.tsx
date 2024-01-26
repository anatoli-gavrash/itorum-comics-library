import { useParams } from 'react-router-dom';
import styles from './Favorites.module.scss';

const Favorites: React.FC = () => {
  const {idFavorite} = useParams();

  return (
    <section className={styles.favorites}>
      <h2 className={styles.title}>Избранное</h2>
      <hr className={styles.delimeter} />
    </section>
  );
};

export default Favorites;
