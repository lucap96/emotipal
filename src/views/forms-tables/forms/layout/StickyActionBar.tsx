'use client';

// material-ui
import { useTheme } from '@mui/material/styles';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import FormControlLabel from '@mui/material/FormControlLabel';
import Divider from '@mui/material/Divider';
import FormHelperText from '@mui/material/FormHelperText';
import InputLabel from '@mui/material/InputLabel';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

// project-imports
import { HEADER_HEIGHT } from 'config';
import MainCard from 'components/MainCard';

// assets
import { Personalcard } from 'iconsax-react';

// ==============================|| LAYOUTS - STICKY ACTION BAR ||============================== //

export default function StickyActionBarPage() {
  const theme = useTheme();

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <MainCard content={false} sx={{ overflow: 'visible' }}>
          <CardActions
            sx={{
              position: 'sticky',
              top: HEADER_HEIGHT,
              bgcolor: theme.palette.background.default,
              zIndex: 1,
              borderBottom: `1px solid ${theme.palette.divider}`
            }}
          >
            <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ width: 1 }}>
              <Typography variant="h5" sx={{ m: 0, pl: 1.5 }}>
                Sticky Action Bar:
              </Typography>
              <Stack direction="row" spacing={1} sx={{ px: 1.5, py: 0.75 }}>
                <Button color="error" size="small">
                  Cancel
                </Button>
                <Button variant="contained" size="small">
                  Submit
                </Button>
              </Stack>
            </Stack>
          </CardActions>
          <CardContent>
            <Grid container spacing={3} alignItems="center">
              <Grid item xs={12}>
                <Grid container spacing={2} alignItems="center">
                  <Grid item xs={12} sm={3} lg={4} sx={{ pt: { xs: 2, sm: '0 !important' } }}>
                    <Avatar variant="rounded" color="inherit" sx={{ bgcolor: theme.palette.secondary.main, ml: 'auto' }}>
                      <Personalcard />
                    </Avatar>
                  </Grid>
                  <Grid item xs={12} sm={9} lg={6}>
                    <Typography variant="h3" sx={{ mb: 0 }}>
                      Personal Information
                    </Typography>
                    <Typography variant="body2" sx={{ mb: 2 }}>
                      Sticky Action Bar Lorem Ipsum is simply
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <Divider />
              </Grid>
              <Grid item xs={12}>
                <Grid container spacing={2} alignItems="center">
                  <Grid item xs={12} sm={3} lg={4} />
                  <Grid item xs={12} sm={9} lg={6}>
                    <Typography variant="h5" sx={{ mb: 3 }}>
                      A. Personal Info:
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={3} lg={4} sx={{ pt: { xs: 2, sm: '0 !important' } }}>
                    <InputLabel sx={{ textAlign: { xs: 'left', sm: 'right' } }}>Name :</InputLabel>
                  </Grid>
                  <Grid item xs={12} sm={9} lg={6}>
                    <TextField fullWidth placeholder="Enter full name" />
                    <FormHelperText>Please enter your full name</FormHelperText>
                  </Grid>
                  <Grid item xs={12} sm={3} lg={4} sx={{ pt: { xs: 2, sm: '0 !important' } }}>
                    <InputLabel sx={{ textAlign: { xs: 'left', sm: 'right' } }}>Email :</InputLabel>
                  </Grid>
                  <Grid item xs={12} sm={9} lg={6}>
                    <TextField fullWidth placeholder="Enter email" />
                    <FormHelperText>Please enter your Email</FormHelperText>
                  </Grid>
                  <Grid item xs={12} sm={3} lg={4} sx={{ pt: { xs: 2, sm: '0 !important' } }}>
                    <InputLabel sx={{ textAlign: { xs: 'left', sm: 'right' } }}>Password :</InputLabel>
                  </Grid>
                  <Grid item xs={12} sm={9} lg={6}>
                    <TextField fullWidth placeholder="Enter Password" />
                    <FormHelperText>Please enter your Password</FormHelperText>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <Divider />
              </Grid>
              <Grid item xs={12}>
                <Grid container spacing={2} alignItems="center">
                  <Grid item xs={12} sm={3} lg={4} />
                  <Grid item xs={12} sm={9} lg={6}>
                    <Typography variant="h5" sx={{ mb: 3 }}>
                      B. Educational Info:
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={3} lg={4} sx={{ pt: { xs: 2, sm: '0 !important' } }}>
                    <InputLabel sx={{ textAlign: { xs: 'left', sm: 'right' } }}>Degree Name :</InputLabel>
                  </Grid>
                  <Grid item xs={12} sm={9} lg={6}>
                    <TextField fullWidth placeholder="Enter Degree name" />
                    <FormHelperText>Please enter your Degree name</FormHelperText>
                  </Grid>
                  <Grid item xs={12} sm={3} lg={4} sx={{ pt: { xs: 2, sm: '0 !important' } }}>
                    <InputLabel sx={{ textAlign: { xs: 'left', sm: 'right' } }}>Passing Year :</InputLabel>
                  </Grid>
                  <Grid item xs={12} sm={9} lg={6}>
                    <TextField fullWidth placeholder="Enter Passing Year" />
                    <FormHelperText>Please enter Passing Year</FormHelperText>
                  </Grid>
                  <Grid item xs={12} sm={3} lg={4} sx={{ pt: { xs: 2, sm: '0 !important' } }}>
                    <InputLabel sx={{ textAlign: { xs: 'left', sm: 'right' } }}>College Name :</InputLabel>
                  </Grid>
                  <Grid item xs={12} sm={9} lg={6}>
                    <TextField fullWidth placeholder="Enter College name" />
                    <FormHelperText>Please enter your College name</FormHelperText>
                  </Grid>
                  <Grid item xs={12} sm={3} lg={4} sx={{ pt: { xs: 2, sm: '0 !important' } }}>
                    <InputLabel sx={{ textAlign: { xs: 'left', sm: 'right' } }}>Work Experience :</InputLabel>
                  </Grid>
                  <Grid item xs={12} sm={9} lg={6}>
                    <TextField fullWidth placeholder="Enter Work Experience" />
                    <FormHelperText>Please enter your Work Experience</FormHelperText>
                  </Grid>
                  <Grid item xs={12} sm={3} lg={4} sx={{ pt: { xs: 2, sm: '1 !important' } }}>
                    <InputLabel sx={{ textAlign: { xs: 'left', sm: 'right' } }}>Language :</InputLabel>
                  </Grid>
                  <Grid item xs={12} sm={9} lg={6}>
                    <FormControlLabel control={<Checkbox defaultChecked />} label="English" />
                    <FormControlLabel control={<Checkbox />} label="French" />
                    <FormControlLabel control={<Checkbox />} label="Dutch" />
                  </Grid>
                  <Grid item xs={12} sm={3} lg={4} sx={{ pt: { xs: 2, sm: '1 !important' } }}>
                    <InputLabel sx={{ textAlign: { xs: 'left', sm: 'right' } }}>Hobby :</InputLabel>
                  </Grid>
                  <Grid item xs={12} sm={9} lg={6}>
                    <FormControlLabel control={<Checkbox />} label="Reading" />
                    <FormControlLabel control={<Checkbox />} label="Dancing" />
                    <FormControlLabel control={<Checkbox />} label="Swimming" />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </CardContent>
          <Divider />
          <CardActions>
            <Stack direction="row" spacing={1} justifyContent="center" sx={{ width: 1, px: 1.5, py: 0.75 }}>
              <Button color="error" size="small">
                Cancel
              </Button>
              <Button variant="contained" size="small">
                Submit
              </Button>
            </Stack>
          </CardActions>
        </MainCard>
      </Grid>
    </Grid>
  );
}
