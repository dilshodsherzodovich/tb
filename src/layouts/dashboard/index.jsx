import { useState } from 'react';
import PropTypes from 'prop-types';

import Box from '@mui/material/Box';

import { Navigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import Nav from './nav';
import Main from './main';
import Header from './header';

// ----------------------------------------------------------------------

export default function DashboardLayout({ children }) {
  const [openNav, setOpenNav] = useState(false);
  const [cookies] = useCookies(['access']);

  return (
    <>
      {cookies?.access ? (
        <>
          <Header onOpenNav={() => setOpenNav(true)} />
          <Box
            sx={{
              minHeight: 1,
              display: 'flex',
              flexDirection: { xs: 'column', lg: 'row' },
            }}
          >
            <Nav openNav={openNav} onCloseNav={() => setOpenNav(false)} />

            <Main>{children}</Main>
          </Box>
        </>
      ) : (
        <Navigate to="/login" />
      )}
    </>
  );
}

DashboardLayout.propTypes = {
  children: PropTypes.node,
};
