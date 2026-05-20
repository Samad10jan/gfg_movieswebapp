import { Avatar, IconButton, Menu, MenuItem, Tooltip } from '@mui/material';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { searchMovies } from '../../api/movies';

export default function SelectorComponent({ type }: { type?: string }) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const movieTypes = ["MOVIE", "TV_SERIES", "TV_MINI_SERIES", "TV_SPECIAL", "TV_MOVIE", "SHORT", "VIDEO", "VIDEO_GAME"]
  const genres = ["Action", "Adventure", "Animation", "Biography", "Comedy", "Crime", "Documentary", "Drama", "Family", "Fantasy", "History", "Horror", "Mystery", "Romance", "Sci-Fi", "Sport", "Thriller", "Western"]
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const { movies, error, loaading } = useSelector((state: any) => state.movies)
  const dispatch = useDispatch<any>();


  console.log(movies);

  const handleItemClick = (type: string) => {
    dispatch(searchMovies(type) as any);
    handleClose();

  }
  return (
    <React.Fragment>

      <Tooltip title={type?.toUpperCase()}>
        <IconButton
          onClick={handleClick}
          size="small"
          sx={{ ml: 2 }}
          aria-controls={open ? 'account-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open}
        >
          <Avatar sx={{ width: 32, height: 32 }}>{type?.charAt(0).toUpperCase()}</Avatar>
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
        {type === "type" && movieTypes.map((t) => (
          <MenuItem key={t} onClick={() => handleItemClick(t.replaceAll("_", "").toLowerCase())}>
            <Avatar /> {t.replaceAll("_", " ")}
          </MenuItem>
        ))}

        {type === "genre" && genres.map((t) => (
          <MenuItem key={t} onClick={()=> handleItemClick(t.toLowerCase())}>
            <Avatar className=' ' /> {t}
          </MenuItem>
        ))}
      </Menu>
    </React.Fragment>
  );
}
