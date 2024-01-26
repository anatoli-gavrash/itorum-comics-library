
import { Link } from 'react-router-dom';
import { IconButton } from '@mui/material';
import { AddShoppingCart, Favorite } from '@mui/icons-material';
import { useAppSelector } from '../../hooks/hooks';
import { currentUser } from '../../store/slices/login/login-slice';
import styles from './Card.module.scss';

interface CardProps {
  id: number,
  image: string,
  title: string,
}

const Card: React.FC<CardProps> = (props) => {
  const user = useAppSelector(currentUser);
  const isTrue = false;
  const {id, image, title} = props;
  
  return (
    <div className={styles.card}>
      <Link className={styles.link} to={`/comic/${id}`}>
        <img className={styles.image} src={image} alt={title} />
        <h3 className={styles.title}>{title}</h3>
      </Link>
      {user && <div className={styles.buttonsWrapper}>
        <IconButton className={styles.button} disabled={isTrue}>
          <Favorite />
        </IconButton>
        <IconButton className={styles.button} disabled={isTrue}>
          <AddShoppingCart />
        </IconButton>
      </div>}
    </div>
  );
};

export default Card;
