'use client';

// material-ui
import { useTheme } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

// project-imports
import { ThemeMode } from 'config';

// assets
import { Code1, Link1 } from 'iconsax-react';

// ==============================|| COMPONENTS - BREADCRUMBS  ||============================== //

interface Props {
  title: string;
  caption?: string;
  directory?: string;
  link?: string;
}

export default function ComponentHeader({ title, caption, directory, link }: Props) {
  const theme = useTheme();

  return (
    <Box sx={{ pl: { xs: 1.5, sm: 3, xl: 8 } }}>
      <Stack spacing={1.25}>
        <Typography variant="h2" sx={{ fontWeight: 700 }}>
          {title}
        </Typography>
        {caption && (
          <Typography variant="h6" color="text.secondary">
            {caption}
          </Typography>
        )}
        {directory && (
          <Typography variant="caption" color="text.secondary">
            <Stack direction="row" alignItems="center" columnGap={1}>
              <Code1 size={14} />
              {directory}
            </Stack>
          </Typography>
        )}
        {link && (
          <Box>
            <Button
              variant="contained"
              color="secondary"
              startIcon={<Link1 size={16} />}
              component={Link}
              href={link}
              target="_blank"
              sx={{
                fontWeight: 500,
                bgcolor: 'secondary.light',
                color: 'secondary.darker',
                '&:hover': {
                  color: 'secondary.lighter',
                  ...(theme.palette.mode === ThemeMode.DARK && {
                    bgcolor: 'secondary.200',
                    color: 'secondary.darker'
                  })
                }
              }}
            >
              Reference
            </Button>
          </Box>
        )}
      </Stack>
    </Box>
  );
}
