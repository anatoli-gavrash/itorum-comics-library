import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getComicsFromIdList, libraryData, resetLibrary } from '../../store/slices/library/library-slice';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import type { Comic } from '../../store/slices/library/library.types';
import { searchFilter, validationPageValue } from '../../utils/utils';
import styles from './Favorites.module.scss';
import Pagination from '../pagination';
import ComicList from '../comic-list';
import Search from '../search';
import { currentUser } from '../../store/slices/login/login-slice';

const Favorites: React.FC = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(currentUser);
  const libData = useAppSelector(libraryData);
  const {idFavorite} = useParams();
  const [offset, setOffset] = useState<number>(0);
  const [cardCountOnPage, setCardCountOnPage] = useState<number>(20);
  const [maxPages, setMaxPages] = useState<number>(1);
  const [comicsList, setComicsList] = useState<Comic[] | null>(null);
  const [searchValue, setSearchValue] = useState<string>('');
  const defaultPath = '/favorites/';
  const currentPage = validationPageValue(1, maxPages, Number(idFavorite));

  useEffect(() => {
    if (user?.favorites) {
      const ids = searchFilter(searchValue, user.favorites);
      
      dispatch(getComicsFromIdList({
        idList: ids,
        customParams: {
          limit: cardCountOnPage,
          offset: offset
        }
      }))
    };
    
    return () => {
      dispatch(resetLibrary());
    };
  }, [dispatch, user?.favorites, offset, cardCountOnPage, searchValue]);

  useEffect(() => {
    const newOffset = cardCountOnPage * (currentPage - 1);
    if (offset !== newOffset) setOffset(newOffset);
  }, [offset, cardCountOnPage, currentPage]);

  useEffect(() => {
    if (libData?.results) setComicsList(libData.results);
    if (libData?.total && libData?.limit) setMaxPages(Math.ceil(libData.total / libData.limit));
  }, [libData]);

  return (
    <section className={styles.favorites}>
      <h2 className={styles.title}>Избранное</h2>
      <hr className={styles.delimeter} />
      {libData && currentPage && <>
        <Pagination path={defaultPath} currentPage={currentPage} maxPages={maxPages} />
        <Search setSearch={setSearchValue} />
        <ComicList cardList={comicsList} />
        <Pagination path={defaultPath} currentPage={currentPage} maxPages={maxPages} />
      </>}
    </section>
  );
};

export default Favorites;
