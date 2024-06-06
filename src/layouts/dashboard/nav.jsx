import { useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Drawer from '@mui/material/Drawer';
import Avatar from '@mui/material/Avatar';
import { alpha } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import ListItemButton from '@mui/material/ListItemButton';
import { KeyboardArrowRight } from '@mui/icons-material';

import { usePathname } from 'src/routes/hooks';
import { RouterLink } from 'src/routes/components';

import { useResponsive } from 'src/hooks/use-responsive';

import { account } from 'src/_mock/account';

import Scrollbar from 'src/components/scrollbar';

import { useCookies } from 'react-cookie';
import { NAV } from './config-layout';
import { Collapse } from '@mui/material';
import { Icon } from '@iconify/react';
import { useDispatch, useSelector } from 'react-redux';
import { getInstructionCategories } from 'src/api/instruction';
import { primary, secondary, success } from 'src/theme/palette';
import { useNavigate } from 'react-router-dom';

// ----------------------------------------------------------------------

export default function Nav({ openNav, onCloseNav }) {
  const [cookies] = useCookies();

  const pathname = usePathname();

  const upLg = useResponsive('up', 'lg');

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const { categories, categoriesLoading } = useSelector((state) => state.instructions);

  useEffect(() => {
    if (openNav) {
      onCloseNav();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  useEffect(() => {
    dispatch(getInstructionCategories({ token: cookies?.access }));

    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (!categories?.length) return;
    navigate(`/category/${categories[0].id}`);

    // eslint-disable-next-line
  }, [categories]);

  const allRoutes = useMemo(
    () =>
      categories?.map((item) => {
        const route = { title: item?.name };
        if (item?.children?.length) {
          route.collapse = item?.children?.map((child) => ({
            title: child?.name,
            path: `/category/${child?.id}`,
          }));
        } else {
          route.path = `/category/${item?.id}`;
        }
        return route;
      }),
    [categories]
  );

  const renderAccount = (
    <Box
      sx={{
        my: 3,
        mx: 2.5,
        py: 2,
        px: 2.5,
        display: 'flex',
        borderRadius: 1.5,
        alignItems: 'center',
        bgcolor: (theme) => alpha(theme.palette.grey[500], 0.12),
      }}
    >
      <Avatar alt="photoURL" />

      <Box sx={{ ml: 2 }}>
        <Typography variant="subtitle2">{cookies?.username}</Typography>

        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          {account.role}
        </Typography>
      </Box>
    </Box>
  );

  const renderMenu = (
    <Stack component="nav" spacing={0.5} sx={{ px: 2 }}>
      {allRoutes?.map((item) => (
        <NavItem key={item?.title} item={item} />
      ))}
      <NavItem key="assistent" item={{ title: 'Assistent', path: '/chat' }} />
    </Stack>
  );

  const renderContent = (
    <Scrollbar
      sx={{
        height: 1,
        '& .simplebar-content': {
          height: 1,
          display: 'flex',
          flexDirection: 'column',
        },
      }}
    >
      {/* <Logo sx={{ mt: 3, ml: 4 }} /> */}

      {renderAccount}

      {renderMenu}

      <Box sx={{ flexGrow: 1 }} />
    </Scrollbar>
  );

  return (
    <Box
      sx={{
        flexShrink: { lg: 0 },
        width: { lg: NAV.WIDTH },
      }}
    >
      {upLg ? (
        <Box
          sx={{
            height: 1,
            position: 'fixed',
            width: NAV.WIDTH,
            borderRight: (theme) => `dashed 1px ${theme.palette.divider}`,
          }}
        >
          {renderContent}
        </Box>
      ) : (
        <Drawer
          open={openNav}
          onClose={onCloseNav}
          PaperProps={{
            sx: {
              width: NAV.WIDTH,
            },
          }}
        >
          {renderContent}
        </Drawer>
      )}
    </Box>
  );
}

Nav.propTypes = {
  openNav: PropTypes.bool,
  onCloseNav: PropTypes.func,
};

function MenuList({ routes, fullWidth, dense }) {
  return (
    <Stack component="nav" spacing={dense ? 0.5 : 1.5} sx={{ px: fullWidth ? 0 : 3 }}>
      {routes?.map((item) => (
        <NavItem collapse key={item.title} item={item} />
      ))}
    </Stack>
  );
}

// ----------------------------------------------------------------------

function NavItem({ item, collapse }) {
  const [openCollapse, setOpenCollapse] = useState(false);

  const handleToggleCollapse = () => setOpenCollapse((prev) => !prev);

  const pathname = usePathname();

  const active = item.path === pathname;

  return (
    <>
      <ListItemButton
        component={RouterLink}
        href={item.path}
        sx={{
          minHeight: 44,
          borderRadius: 0.75,
          border: collapse ? 'none' : `1px solid ${success.main}`,
          typography: 'body2',
          color: 'text.secondary',
          textTransform: 'capitalize',
          fontWeight: 'fontWeightMedium',
          ...(active && {
            color: '#fff',
            fontWeight: 'fontWeightSemiBold',
            bgcolor: '#8adc23',
            '&:hover': {
              bgcolor: '#8adc23',
            },
          }),
        }}
        onClick={handleToggleCollapse}
      >
        <Box component="span">{item.title} </Box>

        {item?.collapse ? (
          <KeyboardArrowRight
            sx={{
              transform: `${openCollapse ? 'rotate(90deg)' : null}`,
              transition: 'all 200ms',
            }}
          />
        ) : null}
      </ListItemButton>
      {item?.collapse ? (
        <Collapse in={openCollapse} timeout="auto" unmountOnExit>
          <Box>
            <MenuList routes={item.collapse} fullWidth dense />
          </Box>
        </Collapse>
      ) : null}
    </>
  );
}

NavItem.propTypes = {
  item: PropTypes.object,
};
