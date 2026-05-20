import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import InputBase from '@mui/material/InputBase';
import { alpha, styled } from '@mui/material/styles';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { useDispatch } from 'react-redux';
import { searchMovies } from '../../api/movies';
import SelectorComponent from '../SelectorComponent';
import { useEffect, useMemo, useState } from 'react';
import { debounce } from 'lodash';
import type { AppDispatch } from '../../store';
import { Link } from 'react-router-dom';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.12),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.2),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(2),
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
  width: '100%',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    paddingRight: theme.spacing(6),
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '18ch',
      '&:focus': {
        width: '26ch',
      },
    },
  },
}));

export default function SearchAppBar() {
  const dispatch = useDispatch<AppDispatch>();
  const [searchText, setSearchText] = useState('');

  const debouncedSearch = useMemo(
    () =>
      debounce((value: string) => {
        dispatch(searchMovies(value) as any);
      }, 500),
    [dispatch]
  );

  // using lodash debounce to limit the number of API calls while typing in the search input
  useEffect(() => {
    return () => debouncedSearch.cancel();
  }, [debouncedSearch]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchText(value);
    debouncedSearch(value);
  };

  const clearSearch = () => {
    setSearchText('');
    dispatch(searchMovies('') as any);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ backgroundColor: '#020617', boxShadow: '0 18px 50px -30px rgba(0,0,0,0.8)' }}>
        <Toolbar sx={{ gap: 1, flexWrap: 'wrap' }}>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, fontWeight: 700, letterSpacing: '0.05em' }}
          >
            <Link to={"/"}>

              CineFlix
            </Link>
          </Typography>

          <Typography sx={{ display: { xs: 'none', sm: 'block' }, color: '#94a3b8', mr: 2, fontSize: 12 }}>
            Movie data, filters, and search in one place
          </Typography>

          <SelectorComponent type="genre" />
          <SelectorComponent type="type" />

          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search titles..."
              value={searchText}
              onChange={handleSearchChange}
              inputProps={{ 'aria-label': 'search' }}
            />
            {searchText && (
              <IconButton
                size="small"
                onClick={clearSearch}
                sx={{ position: 'absolute', right: 4, top: '50%', transform: 'translateY(-50%)', color: 'rgba(255,255,255,0.75)' }}
                aria-label="clear search"
              >
                <ClearIcon fontSize="small" />
              </IconButton>
            )}
          </Search>
        </Toolbar>
      </AppBar>
    </Box>
  );
}