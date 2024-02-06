import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { getNewestComics, libraryNewestData } from '../../store/slices/library/library-slice';
import Swiper from '../swiper';
import styles from './Aside.module.scss';

const Aside: React.FC = () => {
  const dispatch = useAppDispatch();
  const libNewestData = useAppSelector(libraryNewestData);

  useEffect(() => {
    dispatch(getNewestComics({
      limit: 20,
      dateDescriptor: 'lastWeek',
      orderBy: '-onsaleDate'
    }));
  }, []);

  return (
    <aside className={styles.aside}>
      <h2 className={styles.title}>Лучшие</h2>
      <hr className={styles.delimeter} />
      <Swiper data={libNewestData} />
    </aside>
  );
}

export default Aside;
