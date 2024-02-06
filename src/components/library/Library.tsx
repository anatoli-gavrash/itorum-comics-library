import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getComics, libraryData } from '../../store/slices/library/library-slice';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import type { Comic } from '../../store/slices/library/library.types';
import { validationPageValue } from '../../utils/utils';
import styles from './Library.module.scss';
import Pagination from '../pagination';
import ComicList from '../comic-list';
import Search from '../search';

const Library: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const libData = useAppSelector(libraryData);
  const {idLibrary} = useParams();
  const [offset, setOffset] = useState<number>(0);
  const [cardCountOnPage, setCardCountOnPage] = useState<number>(20);
  const [maxPages, setMaxPages] = useState<number>(1);
  const [comicsList, setComicsList] = useState<Comic[] | null>(null);
  const [searchValue, setSearchValue] = useState<string>('');
  const defaultPath = '/';
  const currentPage = validationPageValue(1, maxPages, Number(idLibrary));
  
  useEffect(() => {
    if (Number(idLibrary) !== currentPage) navigate(`${defaultPath}page/${currentPage}`);
    dispatch(getComics({limit: cardCountOnPage, offset: offset, titleStartsWith: searchValue}));
  }, [dispatch, offset, cardCountOnPage, searchValue]);

  useEffect(() => {
    const newOffset = cardCountOnPage * (currentPage - 1);
    if (offset !== newOffset) setOffset(newOffset);
  }, [offset, cardCountOnPage, currentPage]);

  useEffect(() => {
    if (libData?.results) setComicsList(libData.results);
    if (libData?.total && libData?.limit) setMaxPages(Math.ceil(libData.total / libData.limit));
  }, [libData?.results, libData?.total, libData?.limit]);

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
