'use client';

// next
import Link from 'next/link';

// material-ui
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Links from '@mui/material/Link';
import Container from '@mui/material/Container';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';

// third-party
import { motion } from 'framer-motion';

// project-imports
import FadeInWhenVisible from './Animation';
import MainCard from 'components/MainCard';
import IconButton from 'components/@extended/IconButton';
import { useIspValue } from 'hooks/useIspValue';
import { techData } from 'data/tech-data';

// assets
import { DocumentDownload, ExportSquare } from 'iconsax-react';

// ==============================|| LANDING - TECHNOLOGIES PAGE ||============================== //

export default function TechnologiesPage() {
  const ispValueAvailable = useIspValue();

  return (
    <Container>
      <Grid container spacing={3} alignItems="center" justifyContent="center" sx={{ mt: { md: 15, xs: 2.5 }, mb: { md: 10, xs: 2.5 } }}>
        <Grid item xs={12}>
          <Grid container spacing={2} sx={{ textAlign: 'center', marginBottom: 3 }}>
            <Grid item xs={12}>
              <motion.div
                initial={{ opacity: 0, translateY: 550 }}
                animate={{ opacity: 1, translateY: 0 }}
                transition={{
                  type: 'spring',
                  stiffness: 150,
                  damping: 30,
                  delay: 0.2
                }}
              >
                <Typography variant="h2">Available Technologies</Typography>
              </motion.div>
            </Grid>
            <Grid item xs={12}>
              <motion.div
                initial={{ opacity: 0, translateY: 550 }}
                animate={{ opacity: 1, translateY: 0 }}
                transition={{
                  type: 'spring',
                  stiffness: 150,
                  damping: 30,
                  delay: 0.4
                }}
              >
                <Typography>Explore the Demos of Able Pro in multiple technologies.</Typography>
              </motion.div>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Grid container spacing={3} alignItems="center" justifyContent="center">
            {techData.map((tech, index) => (
              <Grid item xs={12} md={6} lg={4} key={index}>
                <FadeInWhenVisible>
                  <MainCard>
                    <Grid container spacing={2}>
                      <Grid item xs={12}>
                        <CardMedia component="img" image={tech.image} sx={{ width: 'auto' }} />
                      </Grid>
                      <Grid item xs={12}>
                        <Typography variant="h4">{tech.label}</Typography>
                      </Grid>
                      <Grid item xs={12}>
                        <Typography>{tech.description}</Typography>
                      </Grid>
                      <Grid item xs={12}>
                        <Grid container spacing={2} justifyContent="flex-start">
                          <Grid item>
                            <Button
                              variant="contained"
                              color="secondary"
                              size="large"
                              startIcon={<ExportSquare />}
                              component={Link}
                              href={ispValueAvailable ? `${tech.url}?isp=1` : tech.url}
                              target={tech.target}
                              sx={{
                                fontWeight: 500,
                                bgcolor: 'secondary.light',
                                color: 'secondary.darker',
                                '&:hover': { color: 'secondary.lighter' }
                              }}
                            >
                              Reference
                            </Button>
                          </Grid>
                          {!(tech.free == null) && (
                            <Grid item>
                              <Links component={Link} href={tech.url}>
                                <IconButton
                                  size="large"
                                  shape="rounded"
                                  color="secondary"
                                  sx={{
                                    bgcolor: 'secondary.lighter',
                                    color: 'secondary.darker',
                                    '&:hover': { color: 'secondary.lighter', bgcolor: 'secondary.darker' }
                                  }}
                                >
                                  <DocumentDownload />
                                </IconButton>
                              </Links>
                            </Grid>
                          )}
                        </Grid>
                      </Grid>
                    </Grid>
                  </MainCard>
                </FadeInWhenVisible>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
}
