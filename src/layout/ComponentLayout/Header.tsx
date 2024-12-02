'use client';

// next
import Link from 'next/link';

// material-ui
import { alpha, useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Container from '@mui/material/Container';
import Links from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';

// project-imports
import Logo from 'components/logo';
import IconButton from 'components/@extended/IconButton';
import AnimateButton from 'components/@extended/AnimateButton';
import { useIspValue } from 'hooks/useIspValue';

import { APP_DEFAULT_PATH, ThemeDirection } from 'config';
import { handlerComponentDrawer, useGetMenuMaster } from 'api/menu';

// assets
import { DocumentDownload, ExportSquare, HambergerMenu } from 'iconsax-react';

// ==============================|| COMPONENTS - APP BAR ||============================== //

export default function Header() {
  const theme = useTheme();
  const { menuMaster } = useGetMenuMaster();

  const ispValueAvailable = useIspValue();

  const matchDownMd = useMediaQuery(theme.breakpoints.down('md'));

  const url = ispValueAvailable ? 'https://1.envato.market/jrEAbP' : 'https://1.envato.market/zNkqj6';

  return (
    <AppBar
      sx={{
        bgcolor: alpha(theme.palette.background.default, 0.8),
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
            sx={{
              '& .header-link': { fontWeight: 500, '&:hover': { color: theme.palette.primary.main } },
              display: { xs: 'none', md: 'block' }
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
            <Links className="header-link" color="primary" underline="none">
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
            <Links href="https://github.com/phoenixcoded/able-pro-free-admin-dashboard-template" target="_blank" underline="none">
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
                  disableElevation
                  target="_blank"
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
                href={ispValueAvailable ? `${APP_DEFAULT_PATH}?isp=1` : APP_DEFAULT_PATH}
                sx={{ mt: 0.25 }}
              >
                Dashboard
              </Button>
              <IconButton
                size="large"
                color="secondary"
                onClick={() => handlerComponentDrawer(!menuMaster.isComponentDrawerOpened)}
                sx={{ p: 1 }}
              >
                <HambergerMenu />
              </IconButton>
            </Stack>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
