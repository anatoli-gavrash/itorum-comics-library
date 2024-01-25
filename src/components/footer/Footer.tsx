import { useAppSelector } from '../../hooks/hooks';
import { libraryResponse } from '../../store/slices/library/library-slice';
import styles from './Footer.module.scss';

const Footer: React.FC = () => {
  const libResp = useAppSelector(libraryResponse);
  return (
    <footer className={styles.footer}>{libResp?.attributionText}</footer>
  );
}

export default Footer;
