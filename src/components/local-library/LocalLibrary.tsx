import { useEffect, useState } from 'react';
import { getComicsFromIdList, libraryData, resetLibrary } from '../../store/slices/library/library-slice';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { searchFilter, validationPageValue } from '../../utils/utils';
import type { Comic } from '../../store/slices/library/library.types';
import type { UserStorage } from '../../store/slices/login/login.types';
import styles from './LocalLibrary.scss';
import Pagination from '../pagination';
import ComicList from '../comic-list';
import Search from '../search';

interface LocalLibraryProps {
  pageId: string
  pagePath: string
  userData: UserStorage[] | null | undefined
}

const LocalLibrary: React.FC<LocalLibraryProps> = (props) => {
  const {pageId, pagePath, userData} = props;
  const dispatch = useAppDispatch();
  const libData = useAppSelector(libraryData);
  const [offset, setOffset] = useState<number>(0);
  const [cardCountOnPage, setCardCountOnPage] = useState<number>(20);
  const [maxPages, setMaxPages] = useState<number>(1);
  const [comicsList, setComicsList] = useState<Comic[] | null>(null);
  const [searchValue, setSearchValue] = useState<string>('');
  const currentPage = validationPageValue(1, maxPages, Number(pageId));

  useEffect(() => {
    if (userData) {
      const ids = searchFilter(searchValue, userData);
      
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
  }, [dispatch, userData, offset, cardCountOnPage, searchValue]);

  useEffect(() => {
    const newOffset = cardCountOnPage * (currentPage - 1);
    if (offset !== newOffset) setOffset(newOffset);
  }, [offset, cardCountOnPage, currentPage]);

  useEffect(() => {
    if (libData?.results) setComicsList(libData.results);
    if (libData?.total && libData?.limit) setMaxPages(Math.ceil(libData.total / libData.limit));
  }, [libData]);

  return (
    libData && currentPage && <>
      <Pagination path={pagePath} currentPage={currentPage} maxPages={maxPages} />
      <Search setSearch={setSearchValue} />
      <ComicList cardList={comicsList} />
      <Pagination path={pagePath} currentPage={currentPage} maxPages={maxPages} />
    </>
  );
};

export default LocalLibrary;
