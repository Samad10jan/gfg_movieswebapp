import { Avatar, IconButton, Menu, MenuItem, Tooltip } from '@mui/material';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from '../../store';
import { setTypeFilter, setGenreFilter } from '../../slice/movieSlice';
import TheaterComedyIcon from '@mui/icons-material/TheaterComedy';
import CategoryIcon from '@mui/icons-material/Category';

export default function SelectorComponent({ type }: { type?: 'type' | 'genre' }) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const movieTypes = [
    'MOVIE',
    'TV_SERIES',
    'TV_MINI_SERIES',
    'TV_SPECIAL',
    'TV_MOVIE',
    'SHORT',
    'VIDEO',
    'VIDEO_GAME',
  ];
  const genres = [
    'Action',
    'Adventure',
    'Animation',
    'Biography',
    'Comedy',
    'Crime',
    'Documentary',
    'Drama',
    'Family',
    'Fantasy',
  
  ];

  const filters = useSelector((state: RootState) => state.movies.filters);
  const dispatch = useDispatch<AppDispatch>();

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleItemClick = (value: string) => {
    if (type === 'type') {
      dispatch(setTypeFilter(value));
    } else {
      dispatch(setGenreFilter(value));
    }
    handleClose();
  };

  const activeValue = type === 'type' ? filters.type : filters.genre;
  const title = type === 'type' ? 'Filter by type' : 'Filter by genre';

  return (
    <React.Fragment>
      <Tooltip title={title}>
        <IconButton
          onClick={handleClick}
          size="small"
          sx={{ ml: 2, bgcolor: activeValue ? 'primary.main' : 'transparent' }}
          aria-controls={open ? 'account-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open}
        >
          <Avatar sx={{ width: 32, height: 32, bgcolor: activeValue ? 'primary.dark' : 'grey.700' }}>
            {type === 'type' ? <CategoryIcon className=' text-yellow-300'/> : <TheaterComedyIcon className=' text-amber-300'/>}
          </Avatar>
        </IconButton>
      </Tooltip>

      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        slotProps={{
          paper: {
            elevation: 0,
            sx: {
              overflow: 'visible',
              filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
              mt: 1.5,
              '& .MuiAvatar-root': {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
              '&::before': {
                content: '""',
                display: 'block',
                position: 'absolute',
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: 'background.paper',
                transform: 'translateY(-50%) rotate(45deg)',
                zIndex: 0,
              },
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        {(type === 'type' ? movieTypes : genres).map((item) => (
          <MenuItem
            key={item}
            selected={activeValue === item}
            onClick={() => handleItemClick(item)}
          >
            <Avatar /> {item.replaceAll('_', ' ')}
          </MenuItem>
        ))}
      </Menu>
    </React.Fragment>
  );
}
