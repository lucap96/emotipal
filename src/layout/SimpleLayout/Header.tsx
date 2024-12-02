'use client';

import { useState, cloneElement, ReactElement, MouseEvent } from 'react';

// next
import Link from 'next/link';

// material-ui
import { alpha, useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import CardMedia from '@mui/material/CardMedia';
import Chip from '@mui/material/Chip';
import Container from '@mui/material/Container';
import Collapse from '@mui/material/Collapse';
import Drawer from '@mui/material/Drawer';
import Links from '@mui/material/Link';
import List from '@mui/material/List';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Menu from '@mui/material/Menu';
import Stack from '@mui/material/Stack';
import Toolbar from '@mui/material/Toolbar';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import Tooltip from '@mui/material/Tooltip';
import Box from '@mui/material/Box';

// project-imports
import IconButton from 'components/@extended/IconButton';
import AnimateButton from 'components/@extended/AnimateButton';
import Dot from 'components/@extended/Dot';
import Logo from 'components/logo';
import { ThemeDirection } from 'config';
import { useIspValue } from 'hooks/useIspValue';
import { techData } from 'data/tech-data';

// assets
import { ArrowDown2, ArrowUp2, DocumentDownload, ExportSquare, HambergerMenu, Minus } from 'iconsax-react';

interface ElevationScrollProps {
  children: ReactElement;
  window?: Window | Node;
}

// elevation scroll
function ElevationScroll({ children, window }: ElevationScrollProps) {
  const theme = useTheme();
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 10,
    target: window ? window : undefined
  });

  return cloneElement(children, {
    style: {
      boxShadow: trigger ? '0 8px 6px -10px rgba(0, 0, 0, 0.5)' : 'none',
      backgroundColor: trigger ? alpha(theme.palette.background.default, 0.8) : alpha(theme.palette.background.default, 0.1)
    }
  });
}

// ==============================|| COMPONENTS - APP BAR ||============================== //

export default function Header() {
  const theme = useTheme();

  const matchDownMd = useMediaQuery(theme.breakpoints.down('md'));
  const [drawerToggle, setDrawerToggle] = useState<boolean>(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const [openDrawer, setOpenDrawer] = useState(false);

  /** Method called on multiple components with different event types */
  const drawerToggler = (open: boolean) => (event: any) => {
    if (event.type! === 'keydown' && (event.key! === 'Tab' || event.key! === 'Shift')) {
      return;
    }
    setDrawerToggle(open);
  };

  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const ispValueAvailable = useIspValue();

  const url = ispValueAvailable ? 'https://1.envato.market/jrEAbP' : 'https://1.envato.market/zNkqj6';

  const MobileMenuListItem = techData.map((item, index) => {
    const finalUrl = item.url !== '#!' && ispValueAvailable ? `${item.url}?isp=1` : item.url;
    return (
      <ListItemButton key={index} component="a" href={finalUrl} target={item.target} sx={{ p: 0 }}>
        <ListItemIcon>
          <Dot size={4} color="secondary" />
        </ListItemIcon>
        <ListItemText primary={item.label} primaryTypographyProps={{ variant: 'h6', color: 'secondary.main' }} />
      </ListItemButton>
    );
  });

  const listItems = techData.map((item, index) => {
    const finalUrl = item.url !== '#!' && ispValueAvailable ? `${item.url}?isp=1` : item.url;

    return (
      <ListItemButton key={index} component="a" href={finalUrl} target={item.target}>
        <Tooltip title={item.tooltipTitle} placement="bottom">
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <ListItemAvatar
              sx={{
                minWidth: 'auto',
                marginRight: 1,
                filter: item.tooltipTitle === 'Live Preview Not Available' ? 'grayscale(1)' : ''
              }}
            >
              <CardMedia component="img" image={item.image} sx={{ width: '30px' }} />
            </ListItemAvatar>
            <ListItemText primary={item.label} />
          </Box>
        </Tooltip>
      </ListItemButton>
    );
  });

  const handleClose = () => {
    setAnchorEl(null);
  };

  const linksSx = {
    textDecoration: 'none'
  };

  return (
    <ElevationScroll>
      <AppBar
        sx={{
          bgcolor: alpha(theme.palette.background.default, 0.1),
          backdropFilter: 'blur(8px)',
          color: theme.palette.text.primary,
          boxShadow: 'none'
        }}
      >
        <Container maxWidth="xl" disableGutters={matchDownMd}>
          <Toolbar sx={{ px: { xs: 1.5, sm: 4, md: 0, lg: 0 }, py: 1 }}>
            <Stack direction="row" sx={{ flexGrow: 1, display: { xs: 'none', md: 'block' } }} alignItems="center">
              <Box sx={{ display: 'inline-block' }}>
                <Logo reverse to="/" />
              </Box>
              <Chip
                label={process.env.NEXT_APP_VERSION}
                variant="outlined"
                size="small"
                color="secondary"
                sx={{ mt: 0.5, ml: 1, fontSize: '0.725rem', height: 20, '& .MuiChip-label': { px: 0.5 } }}
              />
            </Stack>
            <Stack
              direction="row"
              alignItems="center"
              sx={{
                '& .header-link': { fontWeight: 500, '&:hover': { color: theme.palette.primary.main } },
                display: { xs: 'none', md: 'flex' }
              }}
              spacing={3}
            >
              <Links
                className="header-link"
                sx={{ ml: theme.direction === ThemeDirection.RTL ? 3 : 0 }}
                color="secondary.main"
                component={Link}
                href={ispValueAvailable ? '/login?isp=1' : '/login'}
                target="_blank"
                underline="none"
              >
                Dashboard
              </Links>
              <Links
                className="header-link"
                color="secondary.main"
                component={Link}
                href={ispValueAvailable ? '/components-overview/buttons?isp=1' : '/components-overview/buttons'}
                underline="none"
              >
                Components
              </Links>
              <Links
                className="header-link"
                color="secondary.main"
                href="https://phoenixcoded.gitbook.io/able-pro"
                target="_blank"
                underline="none"
              >
                Documentation
              </Links>
              <Links
                className="header-link"
                color="secondary.main"
                id="wallet-button"
                href="#"
                aria-controls={open ? 'wallet-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
                underline="none"
                sx={{ path: { strokeWidth: 2 }, svg: { marginBottom: '-3px' } }}
              >
                Live Preview {open ? <ArrowUp2 size="16" /> : <ArrowDown2 size="16" />}
              </Links>
              <Menu
                id="wallet-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                  'aria-labelledby': 'wallet-button',
                  sx: { p: 1.25, minWidth: 150 }
                }}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'right'
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right'
                }}
                sx={{ '.MuiModal-backdrop': { backgroundColor: 'unset' } }}
              >
                {listItems}
              </Menu>
              <Links href="https://links.codedthemes.com/vYUWM" target="_blank" underline="none">
                <IconButton
                  size="large"
                  shape="rounded"
                  color="secondary"
                  sx={{
                    bgcolor: 'secondary.light',
                    color: 'secondary.darker',
                    '&:hover': { color: 'secondary.lighter', bgcolor: 'secondary.darker' }
                  }}
                >
                  <DocumentDownload />
                </IconButton>
              </Links>
              <Box sx={{ display: 'inline-block' }}>
                <AnimateButton>
                  <Button
                    component={Links}
                    href={url}
                    target="_blank"
                    disableElevation
                    startIcon={<ExportSquare />}
                    color="success"
                    size="large"
                    variant="contained"
                  >
                    Purchase Now
                  </Button>
                </AnimateButton>
              </Box>
            </Stack>
            <Box sx={{ width: '100%', alignItems: 'center', justifyContent: 'space-between', display: { xs: 'flex', md: 'none' } }}>
              <Box sx={{ display: 'inline-block' }}>
                <Logo reverse to="/" />
              </Box>
              <Stack direction="row" spacing={2}>
                <Button
                  variant="outlined"
                  color="warning"
                  component={Link}
                  href={ispValueAvailable ? '/components-overview/buttons?isp=1' : '/components-overview/buttons'}
                  sx={{ mt: 0.25 }}
                >
                  All Components
                </Button>

                <IconButton size="large" color="secondary" onClick={drawerToggler(true)} sx={{ p: 1 }}>
                  <HambergerMenu />
                </IconButton>
              </Stack>
              <Drawer
                anchor="top"
                open={drawerToggle}
                onClose={drawerToggler(false)}
                sx={{ '& .MuiDrawer-paper': { backgroundImage: 'none' } }}
              >
                <Box
                  sx={{ width: 'auto', '& .MuiListItemIcon-root': { fontSize: '1rem', minWidth: 32 } }}
                  role="presentation"
                  onKeyDown={drawerToggler(false)}
                >
                  <List>
                    <Links sx={linksSx} href={ispValueAvailable ? '/login?isp=1' : '/login'} target="_blank">
                      <ListItemButton>
                        <ListItemIcon>
                          <Minus color={theme.palette.secondary.main} />
                        </ListItemIcon>
                        <ListItemText primary="Dashboard" primaryTypographyProps={{ variant: 'h6', color: 'secondary.main' }} />
                      </ListItemButton>
                    </Links>
                    <Links
                      sx={linksSx}
                      href={ispValueAvailable ? '/components-overview/buttons?isp=1' : '/components-overview/buttons'}
                      target="_blank"
                    >
                      <ListItemButton>
                        <ListItemIcon>
                          <Minus color={theme.palette.secondary.main} />
                        </ListItemIcon>
                        <ListItemText primary="All Components" primaryTypographyProps={{ variant: 'h6', color: 'secondary.main' }} />
                      </ListItemButton>
                    </Links>
                    <Links sx={linksSx} href="https://github.com/phoenixcoded/able-pro-free-admin-dashboard-template" target="_blank">
                      <ListItemButton>
                        <ListItemIcon>
                          <Minus color={theme.palette.secondary.main} />
                        </ListItemIcon>
                        <ListItemText primary="Free Version" primaryTypographyProps={{ variant: 'h6', color: 'secondary.main' }} />
                      </ListItemButton>
                    </Links>
                    <Links sx={linksSx} href="https://phoenixcoded.gitbook.io/able-pro" target="_blank">
                      <ListItemButton>
                        <ListItemIcon>
                          <Minus color={theme.palette.secondary.main} />
                        </ListItemIcon>
                        <ListItemText primary="Documentation" primaryTypographyProps={{ variant: 'h6', color: 'secondary.main' }} />
                      </ListItemButton>
                    </Links>
                    <Links sx={linksSx} href="https://phoenixcoded.authordesk.app/" target="_blank">
                      <ListItemButton>
                        <ListItemIcon>
                          <Minus color={theme.palette.secondary.main} />
                        </ListItemIcon>
                        <ListItemText primary="Support" primaryTypographyProps={{ variant: 'h6', color: 'secondary.main' }} />
                      </ListItemButton>
                    </Links>
                    <Links
                      sx={linksSx}
                      href="https://1.envato.market/c/1289604/275988/4415?subId1=phoenixcoded&u=https%3A%2F%2Fthemeforest.net%2Fitem%2Fable-pro-responsive-bootstrap-4-admin-template%2F19300403"
                      target="_blank"
                    >
                      <ListItemButton>
                        <ListItemIcon>
                          <Minus color={theme.palette.secondary.main} />
                        </ListItemIcon>
                        <ListItemText primary="Purchase Now" primaryTypographyProps={{ variant: 'h6', color: 'secondary.main' }} />
                        <Chip color="primary" label={process.env.NEXT_APP_VERSION} size="small" />
                      </ListItemButton>
                    </Links>
                    <Links style={{ textDecoration: 'none' }} href="#" onClick={() => setOpenDrawer(!openDrawer)}>
                      <ListItemButton>
                        <ListItemIcon>
                          <Minus color={theme.palette.secondary.main} />
                        </ListItemIcon>
                        <ListItemText primary="Live Preview" primaryTypographyProps={{ variant: 'h6', color: 'secondary.main' }} />
                        <Stack sx={{ path: { strokeWidth: 2 } }}>{openDrawer ? <ArrowUp2 size="16" /> : <ArrowDown2 size="16" />}</Stack>
                      </ListItemButton>
                    </Links>
                    <Collapse in={openDrawer} timeout="auto" unmountOnExit>
                      {openDrawer && <List sx={{ p: 0, pl: 6, '& .MuiListItemIcon-root': { minWidth: 20 } }}>{MobileMenuListItem}</List>}
                    </Collapse>
                  </List>
                </Box>
              </Drawer>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </ElevationScroll>
  );
}
