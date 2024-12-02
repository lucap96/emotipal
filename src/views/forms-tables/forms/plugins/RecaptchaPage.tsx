'use client';

// material-ui
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';

// third-party
import ReCAPTCHA from 'react-google-recaptcha';

// project-imports
import MainCard from 'components/MainCard';

// ==============================|| PLUGIN - RECAPTCHA ||============================== //

export default function RecaptchaPage() {
  const handleOnChange = () => {};
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={12} lg={6}>
        <MainCard title="ReCaptcha Example" content={false}>
          <Box sx={{ p: { xs: 1.5, sm: 3 } }}>
            <ReCAPTCHA sitekey="6LdzqbcaAAAAALrGEZWQHIHUhzJZc8O-KSTdTTh_" onChange={handleOnChange} />
          </Box>
        </MainCard>
      </Grid>
    </Grid>
  );
}
