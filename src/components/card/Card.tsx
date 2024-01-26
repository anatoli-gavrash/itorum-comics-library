
import { Link } from 'react-router-dom';
import { IconButton } from '@mui/material';
import { AddShoppingCart, Favorite } from '@mui/icons-material';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { addPurchase, currentUser, toggleFavorite } from '../../store/slices/login/login-slice';
import styles from './Card.module.scss';

interface CardProps {
  id: number,
  image: string,
  title: string,
}

const Card: React.FC<CardProps> = (props) => {
  const {id, image, title} = props;
  const user = useAppSelector(currentUser);
  const dispatch = useAppDispatch();
  const isTrue = false;
  
  return (
    <div className={styles.card}>
      <Link className={styles.link} to={`/comic/${id}`}>
        <img className={styles.image} src={image} alt={title} />
        <h3 className={styles.title}>{title}</h3>
      </Link>
      {user && <div className={styles.buttonsWrapper}>
        <IconButton
          className={`${styles.button} ${user.favorites?.find((favId) => favId === id) ? styles.active : ''}`}
          onClick={() => dispatch(toggleFavorite(id))}
        >
          <Favorite />
        </IconButton>
        <IconButton
          className={styles.button}
          disabled={!!user.purchases?.find((favId) => id === favId)}
          onClick={() => dispatch(addPurchase(id))}
        >
          <AddShoppingCart />
        </IconButton>
      </div>}
    </div>
  );
};

export default Card;
