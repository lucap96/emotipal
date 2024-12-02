'use client';

// material-ui
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import CardMedia from '@mui/material/CardMedia';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

// third-party
import { motion } from 'framer-motion';

// project-imports
import FadeInWhenVisible from './Animation';
import MainCard from 'components/MainCard';
import { useIspValue } from 'hooks/useIspValue';

// assets
import { ExportSquare } from 'iconsax-react';
// const featureFigma = '/assets/images/landing/feature-figma.png';
const featureComponents = '/assets/images/landing/feature-components.png';
const featureDocumentation = '/assets/images/landing/feature-documentation.png';

const Technologies = [
  // {
  //   icon: featureFigma,
  //   title: 'Figma Design System',
  //   description: 'Check the live preview of Able Pro Figma design file. Figma file included in all licenses.',
  //   preview: 'https://links.codedthemes.com/mQZrX'
  // },
  {
    icon: featureComponents,
    title: 'Explore Components',
    description: 'Access all components of Able Pro in one place to make your development work easier.',
    preview: '/components-overview/buttons'
  },
  {
    icon: featureDocumentation,
    title: 'Documentation',
    description: 'Find solutions and navigate through our helper guide with ease.',
    preview: 'https://phoenixcoded.gitbook.io/able-pro'
  }
];

// ==============================|| LANDING - COMBO PAGE ||============================== //

export default function ComboPage() {
  const ispValueAvailable = useIspValue();

  return (
    <Container>
      <Grid container spacing={3} alignItems="center" justifyContent="center" sx={{ mt: { md: 15, xs: 2.5 }, mb: { md: 10, xs: 2.5 } }}>
        <Grid item xs={12}>
          <Grid container spacing={2} justifyContent="center" sx={{ textAlign: 'center', marginBottom: 3 }}>
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
                <Typography variant="h2">Complete Combo</Typography>
              </motion.div>
            </Grid>
            <Grid item xs={12} md={7}>
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
                <Typography>
                  Able Pro caters to the needs of both developers and designers, whether they are beginners or experts.
                </Typography>
              </motion.div>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Grid container spacing={3}>
            {Technologies.map((tech, index) => (
              <Grid item xs={12} md={6} key={index}>
                <Box
                  sx={{
                    height: '100%',
                    '& > div': {
                      height: '100%'
                    }
                  }}
                >
                  <FadeInWhenVisible>
                    <MainCard>
                      <Grid container spacing={3}>
                        <Grid item xs={12}>
                          <Typography variant="h5">{tech.title}</Typography>
                        </Grid>
                        <Grid item xs={12}>
                          <Typography>{tech.description}</Typography>
                        </Grid>
                        <Grid item xs={12}>
                          <CardMedia component="img" image={tech.icon} sx={{ width: '100%' }} />
                        </Grid>
                        <Grid item xs={12}>
                          <Button
                            variant="contained"
                            color="secondary"
                            size="large"
                            startIcon={<ExportSquare />}
                            component={Link}
                            href={ispValueAvailable ? `${tech.preview}?isp=1` : tech.preview}
                            target="_blank"
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
                      </Grid>
                    </MainCard>
                  </FadeInWhenVisible>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
}
