import { useState } from "react";
import { SearchOutlined } from "@mui/icons-material";
import {
  Divider,
  IconButton,
  InputBase,
  Paper,
} from "@mui/material";
import styles from "./Search.module.scss";

interface SearchProps {
  setSearch: React.Dispatch<React.SetStateAction<string>>
}

const Search: React.FC<SearchProps> = (props) => {
  const {setSearch} = props;
  const [searchValue, setSearchValue] = useState<string>('');

  return (
    <Paper
      className={styles.search}
      component="form"
      elevation={2}
      sx={{ display: "flex", alignItems: "center", px: 1, py: 0.5 }}
      onSubmit={(e) => {
        e.preventDefault();
        setSearch(searchValue);
      }}
    >
      <InputBase
        className={styles.input}
        sx={{ ml: 1, flex: 1 }}
        placeholder="Поиск..."
        inputProps={{ "aria-label": "поиск" }}
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
      />
      <Divider sx={{ height: 25, mx: 0.5 }} orientation="vertical" />
      <IconButton type="submit" className={styles.button}>
        <SearchOutlined />
      </IconButton>
    </Paper>
  );
};

export default Search;
