import { createContext, useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
// material
import { styled } from '@mui/material/styles';
import Navbar from './Navbar';

// ----------------------------------------------------------------------

const APP_BAR_MOBILE = 64;
const APP_BAR_DESKTOP = 92;

const RootStyle = styled('div')({
  display: 'flex',
  minHeight: '100%',
  overflow: 'hidden'
});

const MainStyle = styled('div')(({ theme }) => ({
  flexGrow: 1,
  overflow: 'auto',
  minHeight: '100%',
  paddingTop: APP_BAR_MOBILE + 24,
  paddingBottom: theme.spacing(10),
  [theme.breakpoints.up('lg')]: {
    paddingTop: APP_BAR_DESKTOP + 24,
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2)
  }
}));

export const UserContext = createContext(null);

export default function DashboardLayout() {
  const [ user, setUser ] = useState(undefined);

  // gets user when dashboard is opened after login :)
  useEffect(() => {
    //getUser(sessionStorage.getItem('user')).then(x => setUser(x))
    setUser("weee");
  }, []);

  if(!user) {
    return <>Loading...</>
  }

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <RootStyle>
        <Navbar />
        <MainStyle>
          <Outlet />
        </MainStyle>
      </RootStyle>
    </UserContext.Provider>
  );
}