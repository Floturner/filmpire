import {
  Box,
  Divider,
  Drawer,
  LinearProgress,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListSubheader,
  Link as MuiLink,
  Toolbar,
  Typography,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import genreIcons from '../../assets/genres';
import { selectGenreOrCategory } from '../../features';
import { useGetGenresQuery } from '../../services';

const categories = [
  { id: 'popular', name: 'Popular' },
  { id: 'top_rated', name: 'Top Rated' },
  { id: 'upcoming', name: 'Upcoming' },
];

const blueLogo =
  'https://fontmeme.com/permalink/210930/8531c658a743debe1e1aa1a2fc82006e.png';
const redLogo =
  'https://fontmeme.com/permalink/210930/6854ae5c7f76597cf8680e48a2c8a50a.png';

export default function TheSideBar({
  isDarkMode,
  isMobile,
  isDrawerOpen,
  drawerWidth,
  toggleDrawer,
}) {
  const { genreIdOrCategoryId } = useSelector(
    (state) => state.currentGenreOrCategory
  );
  const dispatch = useDispatch();

  return (
    <Box
      component="nav"
      sx={{
        width: { sm: drawerWidth },
        flexShrink: { sm: 0 },
      }}
    >
      <Drawer
        variant={isMobile ? 'temporary' : 'permanent'}
        anchor={isMobile ? 'right' : 'left'}
        onClose={isMobile ? () => toggleDrawer(false) : undefined}
        open={isMobile ? isDrawerOpen : true}
        sx={{
          '& .MuiDrawer-paper': {
            whiteSpace: 'nowrap',
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
      >
        <Toolbar
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Link
            to="/"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '8px',
            }}
          >
            <img
              style={{ width: '70%' }}
              src={isDarkMode ? redLogo : blueLogo}
              alt="Filmpire Logo"
            />
          </Link>
        </Toolbar>
        <Divider />
        <CategoryList
          isDarkMode={isDarkMode}
          selectedCategory={genreIdOrCategoryId}
          selectCategory={(value) => dispatch(selectGenreOrCategory(value))}
        />
        <Divider />
        <GenreList
          isDarkMode={isDarkMode}
          selectedGenre={genreIdOrCategoryId}
          selectGenre={(value) => dispatch(selectGenreOrCategory(value))}
        />
      </Drawer>
    </Box>
  );
}

function CategoryList({ isDarkMode, selectedCategory, selectCategory }) {
  return (
    <List aria-labelledby="categories-title">
      <ListSubheader id="categories-title">Categories</ListSubheader>
      {categories.map(({ id, name }) => (
        <MuiLink
          component={Link}
          key={id}
          to="/"
          sx={{ color: 'text.primary', textDecoration: 'none' }}
        >
          <ListItemButton
            selected={selectedCategory === id}
            onClick={() => selectCategory(id)}
          >
            <ListItemIcon>
              <Box
                component="img"
                src={genreIcons[name.toLowerCase()]}
                sx={{
                  filter: isDarkMode ? 'invert(1)' : 'dark',
                }}
                height={24}
              />
            </ListItemIcon>
            <ListItemText primary={name} />
          </ListItemButton>
        </MuiLink>
      ))}
    </List>
  );
}

function GenreList({ isDarkMode, selectedGenre, selectGenre }) {
  const { data, isFetching, error } = useGetGenresQuery();

  let content;
  if (isFetching) {
    content = (
      <Box width="100%" px={2}>
        <LinearProgress />
      </Box>
    );
  } else if (error) {
    content = <Typography variant="h6">An error has occured.</Typography>;
  } else if (data.genres.length) {
    content = data.genres.map(({ id, name }) => (
      <MuiLink
        component={Link}
        key={id}
        to="/"
        sx={{ color: 'text.primary', textDecoration: 'none' }}
      >
        <ListItemButton
          selected={selectedGenre === id}
          onClick={() => selectGenre(id)}
        >
          <ListItemIcon>
            <Box
              component="img"
              src={genreIcons[name.toLowerCase()]}
              sx={{
                filter: isDarkMode ? 'invert(1)' : 'dark',
              }}
              height={24}
            />
          </ListItemIcon>
          <ListItemText primary={name} />
        </ListItemButton>
      </MuiLink>
    ));
  } else {
    content = (
      <Box display="flex" alignItems="center" marginTop="20px">
        <Typography variant="h4">No genres found.</Typography>
      </Box>
    );
  }

  return (
    <List aria-labelledby="genres-title">
      <ListSubheader id="genres-title">Genres</ListSubheader>
      {content}
    </List>
  );
}
