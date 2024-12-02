import { useState, MouseEvent } from 'react';

// next
import { useRouter } from 'next/navigation';
import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';

// material-ui
import { styled, useTheme } from '@mui/material/styles';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Box from '@mui/material/Box';

// project-imports
import Avatar from 'components/@extended/Avatar';
import useUser from 'hooks/useUser';
import { useGetMenuMaster } from 'api/menu';

// assets
import { ArrowRight2, Logout } from 'iconsax-react';

const avatar1 = '/assets/images/users/avatar-6.png';

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
  drawerOpen: boolean;
}

const ExpandMore = styled(({ expand, drawerOpen, ...other }: ExpandMoreProps) => {
  return <IconButton size="small" {...other} />;
})(({ theme, expand, drawerOpen }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(-90deg)',
  marginLeft: 'auto',
  color: theme.palette.secondary.dark,
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest
  }),
  ...(!drawerOpen && {
    opacity: 0,
    width: 50,
    height: 50
  })
}));

// ==============================|| LIST - USER ||============================== //

export default function UserList() {
  const theme = useTheme();
  const router = useRouter();
  const user = useUser();
  // console.log(user)

  const { menuMaster } = useGetMenuMaster();
  const drawerOpen = menuMaster.isDashboardDrawerOpened;

  const { data: session } = useSession();
  const provider = session?.provider;

  const handleLogout = () => {
    switch (provider) {
      case 'auth0':
        signOut({ callbackUrl: `${process.env.NEXTAUTH_URL}/api/auth/logout/auth0` });
        break;
      case 'cognito':
        signOut({ callbackUrl: `${process.env.NEXTAUTH_URL}/api/auth/logout/cognito` });
        break;
      default:
        signOut({ redirect: false });
    }

    router.push('/login');
  };

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box sx={{ p: 1.25, px: !drawerOpen ? 1.25 : 3, borderTop: '2px solid ', borderTopColor: 'divider' }}>
      <List disablePadding>
        <ListItem
          disablePadding
          secondaryAction={
            <ExpandMore
              sx={{ svg: { height: 20, width: 20 } }}
              theme={theme}
              expand={open}
              drawerOpen={drawerOpen}
              id="basic-button"
              aria-controls={open ? 'basic-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
              onClick={handleClick}
              aria-label="show more"
            >
              <ArrowRight2 style={{ fontSize: '0.625rem' }} />
            </ExpandMore>
          }
          sx={{
            ...(!drawerOpen && { display: 'flex', justifyContent: 'flex-end' }),
            '& .MuiListItemSecondaryAction-root': { right: !drawerOpen ? 16 : -16 }
          }}
        >
          <ListItemAvatar>
            <Avatar alt="Avatar" src={avatar1} sx={{ ...(drawerOpen && { width: 46, height: 46 }) }} />
          </ListItemAvatar>
          <ListItemText
            primary={user ? user?.name : ''}
            sx={{ ...(!drawerOpen && { display: 'none' }) }}
            secondary={user ? user?.role : ''}
          />
        </ListItem>
      </List>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{ 'aria-labelledby': 'basic-button' }}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <MenuItem component={Link} href="/apps/profiles/user/personal" onClick={handleClose}>
          Profile
        </MenuItem>
        <MenuItem component={Link} href="/apps/profiles/account/my-account" onClick={handleClose}>
          My account
        </MenuItem>
        <MenuItem onClick={handleLogout}>
          <Logout variant="Bulk" size={18} />
          Logout
        </MenuItem>
      </Menu>
    </Box>
  );
}
