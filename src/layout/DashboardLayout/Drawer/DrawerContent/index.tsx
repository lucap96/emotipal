// material-ui
// import { useTheme } from '@mui/material/styles';
// import useMediaQuery from '@mui/material/useMediaQuery';

// project-imports
import NavUser from './NavUser';
// import NavCard from './NavCard';
import Navigation from './Navigation';
import SimpleBar from 'components/third-party/SimpleBar';
// import { useGetMenuMaster } from 'api/menu';

// ==============================|| DRAWER CONTENT ||============================== //

export default function DrawerContent() {
  // const theme = useTheme();
  // const { menuMaster } = useGetMenuMaster();
  // const drawerOpen = menuMaster.isDashboardDrawerOpened;

  // const matchDownMD = useMediaQuery(theme.breakpoints.down('lg'));

  return (
    <>
      <SimpleBar sx={{ '& .simplebar-content': { display: 'flex', flexDirection: 'column' } }}>
        <>
          <Navigation />
          {/* {drawerOpen && !matchDownMD && <NavCard />} */}
        </>
      </SimpleBar>
      <NavUser />
    </>
  );
}
