import { useMemo } from 'react';

// material-ui
import Stack from '@mui/material/Stack';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';

// project-imports
import FormPatientAdd from './FormPatientAdd';
import MainCard from 'components/MainCard';
import SimpleBar from 'components/third-party/SimpleBar';
import CircularWithPath from 'components/@extended/progress/CircularWithPath';
import { useGetPatient } from 'api/patient';

// types
import { PatientList } from 'types/patient';

interface Props {
  open: boolean;
  modalToggler: (state: boolean) => void;
  patient?: PatientList | null;
}

// ==============================|| PATIENT ADD / EDIT ||============================== //

export default function PatientModal({ open, modalToggler, patient }: Props) {
  const { patientsLoading: loading } = useGetPatient();

  const closeModal = () => modalToggler(false);

  const patientForm = useMemo(
    () => !loading && <FormPatientAdd patient={patient || null} closeModal={closeModal} />,
    // eslint-disable-next-line
    [patient, loading]
  );

  return (
    <>
      {open && (
        <Modal
          open={open}
          onClose={closeModal}
          aria-labelledby="modal-patient-add-label"
          aria-describedby="modal-patient-add-description"
          sx={{ '& .MuiPaper-root:focus': { outline: 'none' } }}
        >
          <MainCard
            sx={{ width: `calc(100% - 48px)`, minWidth: 340, maxWidth: 880, height: 'auto', maxHeight: 'calc(100vh - 48px)' }}
            modal
            content={false}
          >
            <SimpleBar sx={{ maxHeight: `calc(100vh - 48px)`, '& .simplebar-content': { display: 'flex', flexDirection: 'column' } }}>
              {loading ? (
                <Box sx={{ p: 5 }}>
                  <Stack direction="row" justifyContent="center">
                    <CircularWithPath />
                  </Stack>
                </Box>
              ) : (
                patientForm
              )}
            </SimpleBar>
          </MainCard>
        </Modal>
      )}
    </>
  );
}
