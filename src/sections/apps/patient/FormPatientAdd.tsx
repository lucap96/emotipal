import { useEffect, useState, ChangeEvent } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import Chip from '@mui/material/Chip';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Radio from '@mui/material/Radio';
import Button from '@mui/material/Button';
import Switch from '@mui/material/Switch';
import Tooltip from '@mui/material/Tooltip';
import Divider from '@mui/material/Divider';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import FormLabel from '@mui/material/FormLabel';
import InputLabel from '@mui/material/InputLabel';
import Typography from '@mui/material/Typography';
import RadioGroup from '@mui/material/RadioGroup';
import DialogTitle from '@mui/material/DialogTitle';
import FormControl from '@mui/material/FormControl';
import Autocomplete from '@mui/material/Autocomplete';
import ListItemText from '@mui/material/ListItemText';
import DialogContent from '@mui/material/DialogContent';
import OutlinedInput from '@mui/material/OutlinedInput';
import DialogActions from '@mui/material/DialogActions';
import FormHelperText from '@mui/material/FormHelperText';
import FormControlLabel from '@mui/material/FormControlLabel';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3';
import Box from '@mui/material/Box';

// third-party
import _ from 'lodash';
import * as Yup from 'yup';
import { useFormik, Form, FormikProvider } from 'formik';

// project-imports
import AlertPatientDelete from './AlertPatientDelete';
import Avatar from 'components/@extended/Avatar';
import IconButton from 'components/@extended/IconButton';
import CircularWithPath from 'components/@extended/progress/CircularWithPath';

import { openSnackbar } from 'api/snackbar';
import { insertPatient, updatePatient } from 'api/patient';
import { Gender, ThemeMode } from 'config';

// assets
import { Camera, CloseCircle, Trash } from 'iconsax-react';

// types
import { SnackbarProps } from 'types/snackbar';
import { PatientList } from 'types/patient';

interface StatusProps {
  value: number;
  label: string;
}

const skills = [
  'Adobe XD',
  'After Effect',
  'Angular',
  'Animation',
  'ASP.Net',
  'Bootstrap',
  'C#',
  'CC',
  'Corel Draw',
  'CSS',
  'DIV',
  'Dreamweaver',
  'Figma',
  'Graphics',
  'HTML',
  'Illustrator',
  'J2Ee',
  'Java',
  'Javascript',
  'JQuery',
  'Logo Design',
  'Material UI',
  'Motion',
  'MVC',
  'MySQL',
  'NodeJS',
  'npm',
  'Photoshop',
  'PHP',
  'React',
  'Redux',
  'Reduxjs & tooltit',
  'SASS',
  'SCSS',
  'SQL Server',
  'SVG',
  'UI/UX',
  'User Interface Designing',
  'Wordpress'
];

// constant
function getInitialValues(patient: PatientList | null) {
  const newPatient = {
    firstName: '',
    lastName: '',
    name: '',
    email: '',
    age: 18,
    avatar: 1,
    gender: Gender.FEMALE,
    role: '',
    fatherName: '',
    orders: 0,
    progress: 50,
    status: 2,
    orderStatus: '',
    contact: '',
    country: '',
    location: '',
    about: '',
    skills: [],
    time: ['just now'],
    date: ''
  };

  if (patient) {
    return _.merge({}, newPatient, patient);
  }

  return newPatient;
}

const allStatus: StatusProps[] = [
  { value: 3, label: 'Rejected' },
  { value: 1, label: 'Verified' },
  { value: 2, label: 'Pending' }
];

// ==============================|| PATIENT ADD / EDIT - FORM ||============================== //

export default function FormPatientAdd({ patient, closeModal }: { patient: PatientList | null; closeModal: () => void }) {
  const theme = useTheme();

  const [loading, setLoading] = useState<boolean>(true);
  const [selectedImage, setSelectedImage] = useState<File | undefined>(undefined);
  const [avatar, setAvatar] = useState<string | undefined>(
    `/assets/images/users/avatar-${patient && patient !== null && patient?.avatar ? patient.avatar : 1}.png`
  );

  useEffect(() => {
    if (selectedImage) {
      setAvatar(URL.createObjectURL(selectedImage));
    }
  }, [selectedImage]);

  useEffect(() => {
    setLoading(false);
  }, []);

  const PatientSchema = Yup.object().shape({
    firstName: Yup.string().max(255).required('First Name is required'),
    lastName: Yup.string().max(255).required('Last Name is required'),
    email: Yup.string().max(255).required('Email is required').email('Must be a valid email'),
    status: Yup.string().required('Status is required'),
    location: Yup.string().max(500),
    about: Yup.string().max(500)
  });

  const [openAlert, setOpenAlert] = useState(false);

  const handleAlertClose = () => {
    setOpenAlert(!openAlert);
    closeModal();
  };

  const formik = useFormik({
    initialValues: getInitialValues(patient!),
    validationSchema: PatientSchema,
    enableReinitialize: true,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        let newPatient: PatientList = values;
        newPatient.name = newPatient.firstName + ' ' + newPatient.lastName;

        if (newPatient) {
          updatePatient(newPatient.id!, newPatient).then(() => {
            openSnackbar({
              open: true,
              message: 'Patient update successfully.',
              variant: 'alert',
              alert: {
                color: 'success'
              }
            } as SnackbarProps);
            setSubmitting(false);
            closeModal();
          });
        } else {
          await insertPatient(newPatient).then(() => {
            openSnackbar({
              open: true,
              message: 'Patient added successfully.',
              variant: 'alert',
              alert: {
                color: 'success'
              }
            } as SnackbarProps);
            setSubmitting(false);
            closeModal();
          });
        }
        // eslint-disable-next-line
      } catch (error) {}
    }
  });

  const { errors, touched, handleSubmit, isSubmitting, getFieldProps, setFieldValue } = formik;

  if (loading)
    return (
      <Box sx={{ p: 5 }}>
        <Stack direction="row" justifyContent="center">
          <CircularWithPath />
        </Stack>
      </Box>
    );

  return (
    <>
      <FormikProvider value={formik}>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
            <DialogTitle>{patient ? 'Edit Patient' : 'New Patient'}</DialogTitle>
            <Divider />
            <DialogContent sx={{ p: 2.5 }}>
              <Grid container spacing={3}>
                <Grid item xs={12} md={3}>
                  <Stack direction="row" justifyContent="center" sx={{ mt: 3 }}>
                    <FormLabel
                      htmlFor="change-avtar"
                      sx={{
                        position: 'relative',
                        borderRadius: '50%',
                        overflow: 'hidden',
                        '&:hover .MuiBox-root': { opacity: 1 },
                        cursor: 'pointer'
                      }}
                    >
                      <Avatar alt="Avatar 1" src={avatar} sx={{ width: 72, height: 72, border: '1px dashed' }} />
                      <Box
                        sx={{
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          bgcolor: theme.palette.mode === ThemeMode.DARK ? 'rgba(255, 255, 255, .75)' : 'rgba(0,0,0,.65)',
                          width: '100%',
                          height: '100%',
                          opacity: 0,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}
                      >
                        <Stack spacing={0.5} alignItems="center">
                          <Camera style={{ color: theme.palette.secondary.lighter, fontSize: '2rem' }} />
                          <Typography sx={{ color: 'secondary.lighter' }}>Upload</Typography>
                        </Stack>
                      </Box>
                    </FormLabel>
                    <TextField
                      type="file"
                      id="change-avtar"
                      placeholder="Outlined"
                      variant="outlined"
                      sx={{ display: 'none' }}
                      onChange={(e: ChangeEvent<HTMLInputElement>) => setSelectedImage(e.target.files?.[0])}
                    />
                  </Stack>
                </Grid>
                <Grid item xs={12} md={8}>
                  <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                      <Stack spacing={1}>
                        <InputLabel htmlFor="patient-firstName">First Name</InputLabel>
                        <TextField
                          fullWidth
                          id="patient-firstName"
                          placeholder="Enter First Name"
                          {...getFieldProps('firstName')}
                          error={Boolean(touched.firstName && errors.firstName)}
                          helperText={touched.firstName && errors.firstName}
                        />
                      </Stack>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Stack spacing={1}>
                        <InputLabel htmlFor="patient-lastName">Last Name</InputLabel>
                        <TextField
                          fullWidth
                          id="patient-lastName"
                          placeholder="Enter Last Name"
                          {...getFieldProps('lastName')}
                          error={Boolean(touched.lastName && errors.lastName)}
                          helperText={touched.lastName && errors.lastName}
                        />
                      </Stack>
                    </Grid>
                    <Grid item xs={9}>
                      <Stack spacing={1}>
                        <InputLabel htmlFor="patient-email">Email</InputLabel>
                        <TextField
                          fullWidth
                          id="patient-email"
                          placeholder="Enter Patient Email"
                          {...getFieldProps('email')}
                          error={Boolean(touched.email && errors.email)}
                          helperText={touched.email && errors.email}
                        />
                      </Stack>
                    </Grid>
                    <Grid item xs={3}>
                      <Stack spacing={1}>
                        <InputLabel htmlFor="patient-age">Age</InputLabel>
                        <TextField
                          type="number"
                          fullWidth
                          id="patient-age"
                          placeholder="Enter Age"
                          {...getFieldProps('age')}
                          error={Boolean(touched.age && errors.age)}
                          helperText={touched.age && errors.age}
                        />
                      </Stack>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Stack spacing={1}>
                        <InputLabel htmlFor="patient-fatherName">Father Name</InputLabel>
                        <TextField
                          fullWidth
                          id="patient-fatherName"
                          placeholder="Enter Father Name"
                          {...getFieldProps('fatherName')}
                          error={Boolean(touched.fatherName && errors.fatherName)}
                          helperText={touched.fatherName && errors.fatherName}
                        />
                      </Stack>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Stack spacing={1}>
                        <InputLabel htmlFor="patient-role">Patient Role</InputLabel>
                        <TextField
                          fullWidth
                          id="patient-role"
                          placeholder="Enter Role"
                          {...getFieldProps('role')}
                          error={Boolean(touched.role && errors.role)}
                          helperText={touched.role && errors.role}
                        />
                      </Stack>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Stack spacing={1}>
                        <InputLabel htmlFor="patient-gender">Gender</InputLabel>
                        <RadioGroup row aria-label="payment-card" {...getFieldProps('gender')}>
                          <FormControlLabel control={<Radio value={Gender.FEMALE} />} label={Gender.FEMALE} />
                          <FormControlLabel control={<Radio value={Gender.MALE} />} label={Gender.MALE} />
                        </RadioGroup>
                      </Stack>
                    </Grid>
                    <Grid item xs={12}>
                      <Stack spacing={1}>
                        <InputLabel htmlFor="patient-status">Status</InputLabel>
                        <FormControl fullWidth>
                          <Select
                            id="column-hiding"
                            displayEmpty
                            {...getFieldProps('status')}
                            onChange={(event: SelectChangeEvent<string>) => setFieldValue('status', event.target.value as string)}
                            input={<OutlinedInput id="select-column-hiding" placeholder="Sort by" />}
                            renderValue={(selected) => {
                              if (!selected) {
                                return <Typography variant="subtitle1">Select Status</Typography>;
                              }

                              const selectedStatus = allStatus.filter((item) => item.value === Number(selected));
                              return (
                                <Typography variant="subtitle2">
                                  {selectedStatus.length > 0 ? selectedStatus[0].label : 'Pending'}
                                </Typography>
                              );
                            }}
                          >
                            {allStatus.map((column: StatusProps) => (
                              <MenuItem key={column.value} value={column.value}>
                                <ListItemText primary={column.label} />
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                        {touched.status && errors.status && (
                          <FormHelperText error id="standard-weight-helper-text-email-login" sx={{ pl: 1.75 }}>
                            {errors.status}
                          </FormHelperText>
                        )}
                      </Stack>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Stack spacing={1}>
                        <InputLabel htmlFor="patient-contact">Contact</InputLabel>
                        <TextField
                          fullWidth
                          id="patient-contact"
                          placeholder="Enter Contact"
                          {...getFieldProps('contact')}
                          error={Boolean(touched.contact && errors.contact)}
                          helperText={touched.contact && errors.contact}
                        />
                      </Stack>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Stack spacing={1}>
                        <InputLabel htmlFor="patient-country">Country</InputLabel>
                        <TextField
                          fullWidth
                          id="patient-country"
                          placeholder="Enter Country"
                          {...getFieldProps('country')}
                          error={Boolean(touched.country && errors.country)}
                          helperText={touched.country && errors.country}
                        />
                      </Stack>
                    </Grid>
                    <Grid item xs={12}>
                      <Stack spacing={1}>
                        <InputLabel htmlFor="patient-location">Location</InputLabel>
                        <TextField
                          fullWidth
                          id="patient-location"
                          multiline
                          rows={2}
                          placeholder="Enter Location"
                          {...getFieldProps('location')}
                          error={Boolean(touched.location && errors.location)}
                          helperText={touched.location && errors.location}
                        />
                      </Stack>
                    </Grid>
                    <Grid item xs={12}>
                      <Stack spacing={1}>
                        <InputLabel htmlFor="patient-about">About Patient</InputLabel>
                        <TextField
                          fullWidth
                          id="patient-about"
                          multiline
                          rows={2}
                          placeholder="Enter Patient Information"
                          {...getFieldProps('about')}
                          error={Boolean(touched.about && errors.about)}
                          helperText={touched.about && errors.about}
                        />
                      </Stack>
                    </Grid>
                    <Grid item xs={12}>
                      <Stack spacing={1}>
                        <InputLabel htmlFor="patient-skills">Skills</InputLabel>
                        <Autocomplete
                          multiple
                          fullWidth
                          id="patient-skills"
                          options={skills}
                          {...getFieldProps('skills')}
                          getOptionLabel={(label) => label}
                          onChange={(event, newValue) => {
                            setFieldValue('skills', newValue);
                          }}
                          renderInput={(params) => <TextField {...params} name="skill" placeholder="Add Skills" />}
                          renderTags={(value, getTagProps) =>
                            value.map((option, index) => (
                              <Chip
                                {...getTagProps({ index })}
                                variant="combined"
                                key={index}
                                label={option}
                                deleteIcon={<CloseCircle style={{ fontSize: '0.75rem' }} />}
                                sx={{ color: 'text.primary' }}
                              />
                            ))
                          }
                        />
                      </Stack>
                    </Grid>
                    <Grid item xs={12}>
                      <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
                        <Stack spacing={0.5}>
                          <Typography variant="subtitle1">Make Contact Info Public</Typography>
                          <Typography variant="caption" color="text.secondary">
                            Means that anyone viewing your profile will be able to see your contacts details
                          </Typography>
                        </Stack>
                        <FormControlLabel control={<Switch defaultChecked sx={{ mt: 0 }} />} label="" labelPlacement="start" />
                      </Stack>
                      <Divider sx={{ my: 2 }} />
                      <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
                        <Stack spacing={0.5}>
                          <Typography variant="subtitle1">Available to hire</Typography>
                          <Typography variant="caption" color="text.secondary">
                            Toggling this will let your teammates know that you are available for acquiring new projects
                          </Typography>
                        </Stack>
                        <FormControlLabel control={<Switch sx={{ mt: 0 }} />} label="" labelPlacement="start" />
                      </Stack>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </DialogContent>
            <Divider />
            <DialogActions sx={{ p: 2.5 }}>
              <Grid container justifyContent="space-between" alignItems="center">
                <Grid item>
                  {patient && (
                    <Tooltip title="Delete Patient" placement="top">
                      <IconButton onClick={() => setOpenAlert(true)} size="large" color="error">
                        <Trash variant="Bold" />
                      </IconButton>
                    </Tooltip>
                  )}
                </Grid>
                <Grid item>
                  <Stack direction="row" spacing={2} alignItems="center">
                    <Button color="error" onClick={closeModal}>
                      Cancel
                    </Button>
                    <Button type="submit" variant="contained" disabled={isSubmitting}>
                      {patient ? 'Edit' : 'Add'}
                    </Button>
                  </Stack>
                </Grid>
              </Grid>
            </DialogActions>
          </Form>
        </LocalizationProvider>
      </FormikProvider>
      {patient && <AlertPatientDelete id={patient.id!} title={patient.name} open={openAlert} handleClose={handleAlertClose} />}
    </>
  );
}
