import { Comic } from '../../store/slices/library/library.types';
import { useAppSelector } from '../../hooks/hooks';
import { libraryStatus } from '../../store/slices/library/library-slice';
import styles from './ComicList.module.scss';
import Card from '../card';
import Loader from '../loader/Loader';

interface ComicListProps {
  cardList: [Comic] | null
}

const ComicList: React.FC<ComicListProps> = (props) => {
  const {cardList} = props;
  const status = useAppSelector(libraryStatus);

  return (
    <ul className={styles.comicList}>
      {cardList && cardList.map((item, index) => (
        <li className={styles.item} key={`li-${index}`}>
          {status === 'loading' ? <Loader /> : <Card
            id={item.id || 0}
            image={`${item.thumbnail?.path}.${item.thumbnail?.extension}`}
            title={`${item.title || ''}`}
          />}
        </li>
      ))}
    </ul>
  );
};

export default ComicList;
