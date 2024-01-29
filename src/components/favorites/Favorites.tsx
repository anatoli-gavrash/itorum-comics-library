import { useParams } from 'react-router-dom';
import { useAppSelector } from '../../hooks/hooks';
import { currentUser } from '../../store/slices/login/login-slice';
import styles from './Favorites.module.scss';
import LocalLibrary from '../local-library';

const Favorites: React.FC = () => {
  const {idFavorite} = useParams();
  const user = useAppSelector(currentUser);

  return (
    <section className={styles.favorites}>
      <h2 className={styles.title}>Избранное</h2>
      <hr className={styles.delimeter} />
      <LocalLibrary
        pageId={idFavorite || ''}
        pagePath={'/favorites/'}
        userData={user?.favorites}
      />
    </section>
  );
};

export default Favorites;
