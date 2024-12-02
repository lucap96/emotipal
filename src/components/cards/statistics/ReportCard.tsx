// material-ui
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

// project-imports
import MainCard from 'components/MainCard';

// types
import { GenericCardProps } from 'types/root';

// ==============================|| STATISTICS - REPORT CARD ||============================== //

interface ReportCardProps extends GenericCardProps {}

export default function ReportCard({ primary, secondary, iconPrimary, color }: ReportCardProps) {
  const IconPrimary = iconPrimary!;
  const primaryIcon = iconPrimary ? <IconPrimary size={44} /> : null;

  return (
    <MainCard>
      <Grid container justifyContent="space-between" alignItems="center">
        <Grid item>
          <Stack spacing={0.25}>
            <Typography variant="h3">{primary}</Typography>
            <Typography variant="body1" color="text.secondary">
              {secondary}
            </Typography>
          </Stack>
        </Grid>
        <Grid item sx={{ color: color }}>
          {primaryIcon}
        </Grid>
      </Grid>
    </MainCard>
  );
}
