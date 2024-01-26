import { Link } from 'react-router-dom';
import styles from './Header.module.scss';
import logo from '../../assets/img/png/logo-54.png';
import Nav from '../nav';

const Header: React.FC = () => {
  return (
    <header className={styles.header}>
      <Link className={styles.link} to='/'>
        <img className={styles.image} src={logo} alt="Logo" />
      </Link>
      <Nav />
    </header>
  );
};

export default Header;
