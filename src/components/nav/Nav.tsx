import { Favorite, ShoppingCart } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import styles from './Nav.module.scss';
import Authorize from '../authorize';
import { useAppSelector } from '../../hooks/hooks';
import { currentUser } from '../../store/slices/login/login-slice';

const Nav: React.FC = () => {
  const user = useAppSelector(currentUser);

  return (
    <div className={styles.nav}>
      {user && <>
        <Link className={styles.link} to={'/favorites/'}>
          <Favorite fontSize={'large'} />
        </Link>
        <Link className={styles.link} to={'/purchases/'}>
          <ShoppingCart fontSize={'large'} />
        </Link>
      </>}
      <Authorize />
    </div>
  );
};

export default Nav;
