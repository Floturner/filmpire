import {
  Box,
  Divider,
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  ListSubheader,
  Link as MUILink,
} from '@mui/material';
import { Link } from 'react-router-dom';

const CATEGORIES = [
  {
    label: 'Popular',
    value: 'popular',
  },
  {
    label: 'Top Rated',
    value: 'top_rated',
  },
  {
    label: 'Upcoming',
    value: 'upcoming',
  },
];
const DEMO_CATEGORIES = [
  {
    label: 'Comedy',
    value: 'comedy',
  },
  {
    label: 'Action',
    value: 'action',
  },
  {
    label: 'Horror',
    value: 'horror',
  },
  {
    label: 'Animation',
    value: 'animation',
  },
  {
    label: 'Adventure',
    value: 'adventure',
  },
];

const DRAWER_WIDTH = '240px';
const BLUE_LOGO =
  'https://fontmeme.com/permalink/210930/8531c658a743debe1e1aa1a2fc82006e.png';
const RED_LOGO =
  'https://fontmeme.com/permalink/210930/6854ae5c7f76597cf8680e48a2c8a50a.png';

export default function TheSideBar({
  isDarkMode,
  isMobile,
  isMobileDrawerOpen,
  closeMobileDrawer,
}) {
  return (
    <div>
      <Box
        component="nav"
        sx={{
          width: { sm: DRAWER_WIDTH },
          flexShrink: { sm: 0 },
        }}
      >
        <Drawer
          variant={isMobile ? 'temporary' : 'permanent'}
          anchor={isMobile ? 'right' : 'left'}
          onClose={isMobile ? closeMobileDrawer : undefined}
          open={isMobile ? isMobileDrawerOpen : true}
        >
          <DrawerContent isDarkMode={isDarkMode} />
        </Drawer>
      </Box>
    </div>
  );
}

function DrawerContent({ isDarkMode }) {
  const logo = isDarkMode ? RED_LOGO : BLUE_LOGO;

  return (
    <>
      <Link
        to="/"
        style={{
          display: 'flex',
          justifyContent: 'center',
          padding: '10% 0',
        }}
      >
        <img style={{ width: '70%' }} src={logo} alt="Filmpire logo" />
      </Link>
      <Divider />
      <List>
        <ListSubheader>Categories</ListSubheader>
        {CATEGORIES.map(({ label, value }) => (
          <MUILink
            component={Link}
            key={value}
            to="/"
            sx={{ color: 'text.primary', textDecoration: 'none' }}
          >
            <ListItemButton onClick={() => {}}>
              {/* <ListItemIcon>
                <Box
                  component="img"
                  src={RED_LOGO}
                  sx={{
                    filter: isDarkMode ? 'dark' : 'invert(1)',
                  }}
                  height={30}
                />
              </ListItemIcon> */}
              <ListItemText primary={label} />
            </ListItemButton>
          </MUILink>
        ))}
      </List>
      <Divider />
      <List>
        <ListSubheader>Genres</ListSubheader>
        {DEMO_CATEGORIES.map(({ label, value }) => (
          <MUILink
            component={Link}
            key={value}
            to="/"
            sx={{ color: 'text.primary', textDecoration: 'none' }}
          >
            <ListItemButton onClick={() => {}}>
              {/* <ListItemIcon>
                <Box
                  component="img"
                  src={RED_LOGO}
                  sx={{
                    filter: isDarkMode ? 'dark' : 'invert(1)',
                  }}
                  height={30}
                />
              </ListItemIcon> */}
              <ListItemText primary={label} />
            </ListItemButton>
          </MUILink>
        ))}
      </List>
    </>
  );
}
