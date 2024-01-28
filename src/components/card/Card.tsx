
import { Link } from 'react-router-dom';
import { IconButton } from '@mui/material';
import { AddShoppingCart, Favorite } from '@mui/icons-material';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { addPurchase, currentUser, toggleFavorite } from '../../store/slices/login/login-slice';
import styles from './Card.module.scss';

interface CardProps {
  data: {
    id: number,
    title: string
  },
  image: string,
  title: string,
}

const Card: React.FC<CardProps> = (props) => {
  const {data, image, title} = props;
  const user = useAppSelector(currentUser);
  const dispatch = useAppDispatch();
  
  return (
    <div className={styles.card}>
      <Link className={styles.link} to={`/comic/${data.id}`}>
        <img className={styles.image} src={image} alt={title} />
        <h3 className={styles.title}>{title}</h3>
      </Link>
      {user && <div className={styles.buttonsWrapper}>
        <IconButton
          className={`${styles.button} ${user.favorites?.find(({id: comicId}) => comicId === data.id) ? styles.active : ''}`}
          onClick={() => dispatch(toggleFavorite(data))}
        >
          <Favorite />
        </IconButton>
        <IconButton
          className={`${styles.button} ${styles.purchase}`}
          disabled={!!user.purchases?.find(({id: comicId}) => comicId === data.id)}
          onClick={() => dispatch(addPurchase(data))}
        >
          <AddShoppingCart />
        </IconButton>
      </div>}
    </div>
  );
};

export default Card;
