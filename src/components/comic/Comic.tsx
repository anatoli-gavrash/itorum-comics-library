import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Button as ButtonMui, Tooltip } from '@mui/material';
import { AddShoppingCart, Favorite } from '@mui/icons-material';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { getComic, libraryData, libraryStatus } from '../../store/slices/library/library-slice';
import { addPurchase, currentUser, toggleFavorite } from '../../store/slices/login/login-slice';
import styles from './Comic.module.scss';
import Loader from '../loader';

const Comic: React.FC = () => {
  const {idComic} = useParams();
  const dispatch = useAppDispatch();
  const user = useAppSelector(currentUser);
  const libStatus = useAppSelector(libraryStatus);
  const libData = useAppSelector(libraryData);
  const comic = libData?.results?.[0];
  const [isImageLoaded, setIsImageLoaded] = useState<boolean>(false);
  const [isFavorite, setIsFavorite] = useState<boolean>(false);
  const [isPurchase, setIsPurchase] = useState<boolean>(false);
  
  useEffect(() => {
    dispatch(getComic(Number(idComic)));
  }, [dispatch, idComic]);

  useEffect(() => {
    setIsFavorite(!!user?.favorites?.find((favorite) => favorite.id === comic?.id));
    setIsPurchase(!!user?.purchases?.find((purchase) => purchase.id === comic?.id));
  }, [user?.favorites, user?.purchases, libData, comic]);

  return (
    <article className={styles.comic}>
      <h2 className={styles.title}>Комикс</h2>
      <hr className={styles.delimeter} />
      {libStatus === 'loading' ? <Loader /> : comic ? <div className={styles.content}>
        <div className={styles.imageWrapper}>
          {!isImageLoaded && <Loader />}
          <img 
            className={isImageLoaded ? styles.image : `${styles.image} ${styles.hide}`}
            src={`${comic.thumbnail?.path}.${comic.thumbnail?.extension}`}
            alt={comic.title}
            onLoadStart={() => setIsImageLoaded(false)}
            onLoad={() => setIsImageLoaded(true)}
          />
        </div>
        <section className={styles.textBlock}>
          <h3 className={styles.comicTitle}>{comic.title || comic.variantDescription}</h3>
          <p className={styles.date}></p>
          <p className={styles.description}>{comic.textObjects?.[0]?.text || comic.description}</p>
          <p className={styles.price}>{comic.prices?.[0]?.price + ' $'}</p>
          <div className={styles.buttons}>
            <Tooltip title={!user && 'Требуется регистрация'} placement="bottom">
              <span>
                <ButtonMui
                  className={`${styles.button} ${isFavorite ? styles.active : ''}`}
                  size={'large'}
                  startIcon={<Favorite />}
                  onClick={() => comic.id && dispatch(toggleFavorite({id: comic.id!, title: comic.title!}))}
                  disabled={!user}
                >
                  {isFavorite ? 'Из избранного' : 'В избранное'}
                </ButtonMui>
              </span>
            </Tooltip>
            <ButtonMui
              className={`${styles.button} ${styles.purchase}`}
              size={'large'}
              startIcon={<AddShoppingCart />}
              onClick={() => comic.id && dispatch(addPurchase({id: comic.id!, title: comic.title!}))}
              disabled={!(Number(comic.prices?.[0]?.price) > 0) || isPurchase}
              sx={{display: user ? `flex` : `none`}}
            >
              {isPurchase ? 'Куплено' : 'Купить'}
            </ButtonMui>
          </div>
        </section>
      </div>
      : <div className={styles.notFound}>Нам не удалось найти комикс</div>}
    </article>
  );
};

export default Comic;
