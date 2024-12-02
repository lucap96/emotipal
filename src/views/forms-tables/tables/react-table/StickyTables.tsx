// material-ui
import Grid from '@mui/material/Grid';

// project-imports
import StickyHeader from 'sections/tables/react-table/StickyHeader';

// ==============================|| REACT TABLE - STICKY ||============================== //

export default function StickyTable() {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <StickyHeader />
      </Grid>
    </Grid>
  );
}
