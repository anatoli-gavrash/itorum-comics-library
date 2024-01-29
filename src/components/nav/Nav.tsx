import { Link } from 'react-router-dom';
import { Tooltip } from '@mui/material';
import { Favorite, ShoppingCart } from '@mui/icons-material';
import { useAppSelector } from '../../hooks/hooks';
import { currentUser } from '../../store/slices/login/login-slice';
import styles from './Nav.module.scss';
import Authorize from '../authorize';

const Nav: React.FC = () => {
  const user = useAppSelector(currentUser);

  return (
    <nav className={styles.nav}>
      <ul className={styles.list}>
        {user && <li className={styles.item}>
          <Tooltip title={'Избранное'} placement='bottom'>
            <Link className={styles.link} to={'/favorites/'}>
              <Favorite fontSize={'large'} />
            </Link>
          </Tooltip>
        </li>}
        {user && <li className={styles.item}>
          <Tooltip title={'Покупки'} placement='bottom'>
            <Link className={styles.link} to={'/purchases/'}>
              <ShoppingCart fontSize={'large'} />
            </Link>
          </Tooltip>
        </li>}
      </ul>
      <Authorize />
    </nav>
  );
};

export default Nav;
