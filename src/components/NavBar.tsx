import SearchIcon from '@mui/icons-material/Search';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import InputBase from '@mui/material/InputBase';
import { alpha, styled } from '@mui/material/styles';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { useDispatch } from 'react-redux';
import { getMovies, searchMovies } from '../api/movies';
import SelectorComponent from './SelectorComponent';

import { useEffect, useState } from 'react';

import { debounce } from "lodash";

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
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
    transition: theme.transitions.create('width'),
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

export default function SearchAppBar() {

  const dispatch = useDispatch<any>();


  // Debouncing

  //local state for search input

  // const [search, setSearch] = useState("");

  // useEffect(() => {

  //   const timeout = setTimeout(() => {

  //     if (search.trim() !== "") {
  //       dispatch(searchMovies(search) as any);
  //     } else {
  //       dispatch(getMovies() as any);
  //     }

  //   }, 800); // wait 500ms

  //   // cleanup previous timeout
  //   return () => clearTimeout(timeout);

  // }, [search]);

  // const handleSearchChange = (e: any) => {
  // //   setSearch(e.target.value);
  // // };




  // Debouncing with lodash

  const handleSearchChange = debounce((e: any) => {
    const value = e.target.value;
    if (value.trim() === "") {
      dispatch(getMovies() as any);
      return;
    }
    dispatch(searchMovies(value) as any);
  }, 500)


  // 



  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>

          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
          >
            CineFlix
          </Typography>

          <SelectorComponent type='genre' />
          <SelectorComponent type="type" />

          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>

            <StyledInputBase
              placeholder="Search…"
              onChange={handleSearchChange}
              inputProps={{ 'aria-label': 'search' }}
            />

          </Search>

        </Toolbar>
      </AppBar>
    </Box>
  );
}