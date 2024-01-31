
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { IconButton } from '@mui/material';
import { AddShoppingCart, Favorite } from '@mui/icons-material';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { addPurchase, currentUser, toggleFavorite } from '../../store/slices/login/login-slice';
import styles from './Card.module.scss';
import Loader from '../loader';

interface CardProps {
  id: number,
  image: string,
  title: string,
}

const Card: React.FC<CardProps> = (props) => {
  const {id, image, title} = props;
  const user = useAppSelector(currentUser);
  const dispatch = useAppDispatch();
  const [isImageLoaded, setIsImageLoaded] = useState<boolean>(false);
  
  return (
    <div className={styles.card}>
      <Link className={styles.link} to={`/comic/${id}`}>
        {!isImageLoaded && <Loader />}
        <img 
          className={isImageLoaded ? styles.image : `${styles.image} ${styles.hide}`}
          src={image}
          alt={title}
          onLoadStart={() => setIsImageLoaded(false)}
          onLoad={() => setIsImageLoaded(true)}
        />
        <h3 className={styles.title} title={title}>{title}</h3>
      </Link>
      {user && <div className={styles.buttonsWrapper}>
        <IconButton
          className={`${styles.button} ${user.favorites?.find(({id: comicId}) => comicId === id) ? styles.active : ''}`}
          onClick={() => dispatch(toggleFavorite({id, title}))}
        >
          <Favorite />
        </IconButton>
        <IconButton
          className={`${styles.button} ${styles.purchase}`}
          disabled={!!user.purchases?.find(({id: comicId}) => comicId === id)}
          onClick={() => dispatch(addPurchase({id, title}))}
        >
          <AddShoppingCart />
        </IconButton>
      </div>}
    </div>
  );
};

export default Card;
