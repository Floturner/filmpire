import { Search as SearchIcon } from '@mui/icons-material';
import { InputBase, alpha, styled } from '@mui/material';
import debounce from 'lodash.debounce';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { searchMovie } from '../features';

export default function Search() {
  const location = useLocation();
  const [query, setQuery] = useState('');
  const dispatch = useDispatch();
  const { genreIdOrCategoryId } = useSelector(
    (state) => state.currentGenreOrCategory
  );

  const request = debounce((q) => dispatch(searchMovie(q)), 1000);
  const debounceRequest = useCallback(
    (searchTerm) => request(searchTerm),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  useEffect(
    () => {
      setQuery('');
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [genreIdOrCategoryId]
  );

  if (location.pathname !== '/') {
    if (query) setQuery('');
    return null;
  }

  function handleChange(event) {
    setQuery(event.target.value);
    debounceRequest(event.target.value);
  }

  return (
    <SearchBox>
      <SearchIconWrapper>
        <SearchIcon />
      </SearchIconWrapper>
      <StyledInputBase
        placeholder="Search…"
        inputProps={{ 'aria-label': 'search' }}
        value={query}
        onChange={(e) => handleChange(e)}
      />
    </SearchBox>
  );
}

const SearchBox = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  marginBottom: '10px',
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    marginBottom: 0,
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));
