import { useState } from 'react';

// material-ui
import Chip from '@mui/material/Chip';
import Fade from '@mui/material/Fade';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import Menu from '@mui/material/Menu';
import List from '@mui/material/List';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Box from '@mui/material/Box';

// third-party
import { PatternFormat } from 'react-number-format';
import { PDFDownloadLink } from '@react-pdf/renderer';

// project-imports
import PatientModal from './PatientModal';
import PatientPreview from './PatientPreview';
import AlertPatientDelete from './AlertPatientDelete';
import ListSmallCard from './export-pdf/ListSmallCard';

import MainCard from 'components/MainCard';
import Avatar from 'components/@extended/Avatar';
import MoreIcon from 'components/@extended/MoreIcon';
import IconButton from 'components/@extended/IconButton';

// assets
import { Location, Sms, Link2, CallCalling } from 'iconsax-react';
const avatarImage = '/assets/images/users';

// types
import { PatientList } from 'types/patient';

// ==============================|| PATIENT - CARD ||============================== //

export default function PatientCard({ patient }: { patient: PatientList }) {
  const [open, setOpen] = useState(false);
  const [patientModal, setPatientModal] = useState<boolean>(false);
  const [selectedPatient, setSelectedPatient] = useState<PatientList | null>(null);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [openAlert, setOpenAlert] = useState(false);

  const handleAlertClose = () => {
    setOpenAlert(!openAlert);
    handleMenuClose();
  };

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const openMenu = Boolean(anchorEl);
  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const editPatient = () => {
    setSelectedPatient(patient);
    setPatientModal(true);
  };

  return (
    <>
      <MainCard sx={{ height: 1, '& .MuiCardContent-root': { height: 1, display: 'flex', flexDirection: 'column' } }}>
        <Grid id="print" container spacing={2.25}>
          <Grid item xs={12}>
            <List sx={{ width: 1, p: 0 }}>
              <ListItem
                disablePadding
                secondaryAction={
                  <IconButton
                    edge="end"
                    aria-label="comments"
                    sx={{ transform: 'rotate(90deg)' }}
                    color="secondary"
                    onClick={handleMenuClick}
                  >
                    <MoreIcon />
                  </IconButton>
                }
              >
                <ListItemAvatar>
                  <Avatar alt={patient.name} src={`${avatarImage}/avatar-${!patient.avatar ? 1 : patient.avatar}.png`} />
                </ListItemAvatar>
                <ListItemText
                  primary={<Typography variant="subtitle1">{patient.name}</Typography>}
                  secondary={
                    <Typography variant="caption" color="secondary">
                      {patient.role}
                    </Typography>
                  }
                />
              </ListItem>
            </List>
            <Menu
              id="fade-menu"
              MenuListProps={{
                'aria-labelledby': 'fade-button'
              }}
              anchorEl={anchorEl}
              open={openMenu}
              onClose={handleMenuClose}
              TransitionComponent={Fade}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right'
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right'
              }}
            >
              <MenuItem sx={{ a: { textDecoration: 'none', color: 'inherit' } }}>
                <PDFDownloadLink document={<ListSmallCard patient={patient} />} fileName={`Patient-${patient.name}.pdf`}>
                  Export PDF
                </PDFDownloadLink>
              </MenuItem>
              <MenuItem onClick={editPatient}>Edit</MenuItem>
              <MenuItem onClick={handleAlertClose}>Delete</MenuItem>
            </Menu>
          </Grid>
          <Grid item xs={12}>
            <Divider />
          </Grid>
          <Grid item xs={12}>
            <Typography>Hello, {patient.about}</Typography>
          </Grid>
          <Grid item xs={12}>
            <Grid container spacing={{ xs: 0, md: 1 }}>
              <Grid item xs={12} md={6}>
                <List sx={{ p: 0, '& .MuiListItem-root': { px: 0, py: 0.5 } }}>
                  <ListItem alignItems="flex-start">
                    <ListItemIcon>
                      <Sms size={18} />
                    </ListItemIcon>
                    <ListItemText
                      primary={
                        <Typography sx={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }} color="secondary">
                          {patient.email}
                        </Typography>
                      }
                    />
                  </ListItem>
                  <ListItem alignItems="flex-start">
                    <ListItemIcon>
                      <CallCalling size={18} />
                    </ListItemIcon>
                    <ListItemText
                      primary={
                        <Typography color="secondary">
                          <PatternFormat displayType="text" format="+1 (###) ###-####" mask="_" defaultValue={patient.contact} />
                        </Typography>
                      }
                    />
                  </ListItem>
                </List>
              </Grid>
              <Grid item xs={12} md={6}>
                <List sx={{ p: 0, '& .MuiListItem-root': { px: 0, py: 0.5 } }}>
                  <ListItem alignItems="flex-start">
                    <ListItemIcon>
                      <Location size={18} />
                    </ListItemIcon>
                    <ListItemText primary={<Typography color="secondary">{patient.country}</Typography>} />
                  </ListItem>
                  <ListItem alignItems="flex-start">
                    <ListItemIcon>
                      <Link2 size={18} />
                    </ListItemIcon>
                    <ListItemText
                      primary={
                        <Link
                          href="https://google.com"
                          target="_blank"
                          sx={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', textTransform: 'lowercase' }}
                        >
                          https://{patient.firstName}.en
                        </Link>
                      }
                    />
                  </ListItem>
                </List>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Box>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', listStyle: 'none', p: 0.5, m: 0 }} component="ul">
                {patient.skills.map((skill: string, index: number) => (
                  <ListItem disablePadding key={index} sx={{ width: 'auto', pr: 0.75, pb: 0.75 }}>
                    <Chip color="secondary" variant="outlined" size="small" label={skill} />
                  </ListItem>
                ))}
              </Box>
            </Box>
          </Grid>
        </Grid>
        <Stack
          direction="row"
          className="hideforPDf"
          alignItems="center"
          spacing={1}
          justifyContent="space-between"
          sx={{ mt: 'auto', mb: 0, pt: 2.25 }}
        >
          <Typography variant="caption" color="secondary">
            Updated in {patient.time}
          </Typography>
          <Button variant="outlined" size="small" onClick={handleClickOpen}>
            Preview
          </Button>
        </Stack>
      </MainCard>

      <PatientPreview patient={patient} open={open} onClose={handleClose} editPatient={editPatient} />
      <AlertPatientDelete id={patient.id!} title={patient.name} open={openAlert} handleClose={handleAlertClose} />
      <PatientModal open={patientModal} modalToggler={setPatientModal} patient={selectedPatient} />
    </>
  );
}
