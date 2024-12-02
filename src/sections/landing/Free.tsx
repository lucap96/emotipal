'use client';

// next
import Link from 'next/link';

// material-ui

import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

// project-imports
import FadeInWhenVisible from './Animation';
import { useIspValue } from 'hooks/useIspValue';

// assets
import { ExportSquare } from 'iconsax-react';

// ==============================|| LANDING - FREE PAGE ||============================== //

export default function FreePage() {
  const ispValueAvailable = useIspValue();

  return (
    <Container>
      <Grid container spacing={3} alignItems="center" justifyContent="center" sx={{ mt: { md: 10, xs: 2.5 }, mb: { md: 10, xs: 2.5 } }}>
        <Grid item xs={12} md={8}>
          <FadeInWhenVisible>
            <Grid container spacing={2} justifyContent="center">
              <Grid item xs={12}>
                <Typography variant="h2">
                  <Box component="span" sx={{ color: 'primary.main' }}>
                    TRY{' '}
                  </Box>
                  BEFORE BUY
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography>Download the Free MIT Able Pro Dashboard Template before make your purchase decision.</Typography>
              </Grid>
            </Grid>
          </FadeInWhenVisible>
        </Grid>
        <Grid item xs={12} md={4}>
          <FadeInWhenVisible>
            <Grid container spacing={2} justifyContent="end" alignItems="center">
              <Grid item>
                <Button
                  variant="outlined"
                  color="secondary"
                  size="large"
                  component={Link}
                  href={ispValueAvailable ? 'login?isp=1' : 'login'}
                  target="_blank"
                >
                  Check out Pro Version
                </Button>
              </Grid>
              <Grid item>
                <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  startIcon={<ExportSquare />}
                  component={Link}
                  href="https://codedthemes.com/item/able-pro-lite-free-admin-template/"
                  target="_blank"
                >
                  Free Version
                </Button>
              </Grid>
            </Grid>
          </FadeInWhenVisible>
        </Grid>
      </Grid>
    </Container>
  );
}
