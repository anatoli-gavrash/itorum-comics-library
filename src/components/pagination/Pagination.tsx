import { 
  Pagination as PaginationMui,
  PaginationItem as PaginationItemMui
} from '@mui/material';
import { Link } from 'react-router-dom';
import styles from './Pagination.module.scss';

interface PaginationProps {
  path: string
  currentPage: number
  maxPages: number
}

const Pagination: React.FC<PaginationProps> = (props) => {
  const {path, currentPage, maxPages} = props;

  return (
    <PaginationMui
      className={styles.pagination}
      page={currentPage}
      count={maxPages}
      color="primary"
      shape="rounded"
      variant="outlined"
      showFirstButton
      showLastButton
      sx={{margin: "0 auto"}}
      renderItem={(item) => (
        <PaginationItemMui
          component={Link}
          to={`${path}page/${item.page}`}
          {...item}
        />
      )}
    />
  );
};

export default Pagination;
