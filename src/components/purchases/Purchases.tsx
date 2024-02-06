import { useParams } from 'react-router-dom';
import { useAppSelector } from '../../hooks/hooks';
import { currentUser } from '../../store/slices/login/login-slice';
import styles from './Purchases.module.scss';
import LocalLibrary from '../local-library';

const Purchases: React.FC = () => {
  const {idPurchase} = useParams();
  const user = useAppSelector(currentUser);

  return (
    <section className={styles.purchases}>
      <h2 className={styles.title}>Покупки</h2>
      <hr className={styles.delimeter} />
      <LocalLibrary
        pageId={idPurchase || ''}
        pagePath={'/purchases/'}
        userData={user?.purchases}
      />
    </section>
  );
};

export default Purchases;
