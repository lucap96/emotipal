'use client';

// material-ui
import Typography from '@mui/material/Typography';

// project-imports
import MainCard from 'components/MainCard';

// ==============================|| SAMPLE PAGE ||============================== //

export default function SamplePage() {
  return (
    <MainCard title="Sample Card">
      <Typography variant="body1">This is a sample page</Typography>
    </MainCard>
  );
}
