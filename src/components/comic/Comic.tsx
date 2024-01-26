import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import styles from './Comic.module.scss';
import { getComic, libraryData } from '../../store/slices/library/library-slice';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { Button as ButtonMui, Tooltip } from '@mui/material';
import { AddShoppingCart, Favorite } from '@mui/icons-material';
import { currentUser } from '../../store/slices/login/login-slice';

const Comic: React.FC = () => {
  const {idComic} = useParams();
  const dispatch = useAppDispatch();
  const user = useAppSelector(currentUser);
  const libData = useAppSelector(libraryData);
  const isFavorite = false;
  const isBuying = false;
  
  useEffect(() => {
    dispatch(getComic(Number(idComic)));
  }, [dispatch, idComic]);

  return (
    <article className={styles.comic}>
      <h2 className={styles.title}>Комикс</h2>
      <hr className={styles.delimeter} />
      {libData && 
      <div className={styles.content}>
        <img 
          className={styles.image}
          src={`${libData.results?.[0]?.thumbnail?.path}.${libData.results?.[0]?.thumbnail?.extension}`}
          alt={libData.results?.[0]?.title}
        />
        <section className={styles.textBlock}>
          <h3 className={styles.comicTitle}>{libData.results?.[0]?.title || libData.results?.[0]?.variantDescription}</h3>
          <p className={styles.date}></p>
          <p className={styles.description}>{libData.results?.[0]?.textObjects?.[0]?.text || libData.results?.[0]?.description}</p>
          <p className={styles.price}>{libData.results?.[0]?.prices?.[0]?.price + ' $'}</p>
          <div className={styles.buttons}>
            <Tooltip title={!user && 'Требуется регистрация'} placement="bottom">
              <span>
                <ButtonMui
                  className={styles.button}
                  size={'large'}
                  startIcon={<Favorite />}
                  disabled={!user}
                >
                  {isFavorite ? 'Из избранного' : 'В избранное'}
                </ButtonMui>
              </span>
            </Tooltip>
            <ButtonMui
              className={styles.button}
              size={'large'}
              startIcon={<AddShoppingCart />}
              disabled={!(Number(libData.results?.[0]?.prices?.[0]?.price) > 0)}
              sx={{display: user ? `flex` : `none`}}
            >
              {isBuying ? 'Куплено' : 'Купить'}
            </ButtonMui>
          </div>
        </section>
      </div>}
    </article>
  );
};

export default Comic;
