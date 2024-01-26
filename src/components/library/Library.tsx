import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getComics, libraryData } from '../../store/slices/library/library-slice';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import styles from './Library.module.scss';
import Pagination from '../pagination';
import ComicList from '../comic-list';
import type { Comic } from '../../store/slices/library/library.types';
import Search from '../search';

const pageValueProcessing = (min: number, max: number, value: number): number => {
  if (value && value >= min) {
    if (value <= max) {
      return value;
    }

    return max;
  }

  return min;
};

const Library: React.FC = () => {
  const dispatch = useAppDispatch();
  const libData = useAppSelector(libraryData);
  const {idLibrary} = useParams();
  const [offset, setOffset] = useState<number>(0);
  const [cardCountOnPage, setCardCountOnPage] = useState<number>(20);
  const [maxPages, setMaxPages] = useState<number>(1);
  const [comicsList, setComicsList] = useState<[Comic] | null>(null);
  const [searchValue, setSearchValue] = useState<string>('');
  const defaultPath = '/';
  const currentPage = pageValueProcessing(1, maxPages, Number(idLibrary));

  useEffect(() => {
    dispatch(getComics({limit: cardCountOnPage, offset: offset, titleStartsWith: searchValue}));
  }, [dispatch, offset, searchValue, cardCountOnPage]);

  useEffect(() => {
    const newOffset = cardCountOnPage * (currentPage - 1);
    if (offset !== newOffset) setOffset(newOffset);
  }, [offset, cardCountOnPage, currentPage]);

  useEffect(() => {
    if (libData?.results) setComicsList(libData.results);
    if (libData?.total && libData?.limit) setMaxPages(Math.ceil(libData.total / libData.limit));
  }, [libData]);

  return (
    <section className={styles.library}>
      <h2 className={styles.title}>Библиотека</h2>
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

export default Library;
