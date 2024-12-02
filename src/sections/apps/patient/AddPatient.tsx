import { useEffect, useMemo, useState } from 'react';

// material-ui
import Modal from '@mui/material/Modal';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';

// project-imports
import FormPatientAdd from './FormPatientAdd';
import MainCard from 'components/MainCard';
import SimpleBar from 'components/third-party/SimpleBar';
import CircularWithPath from 'components/@extended/progress/CircularWithPath';
import { handlerPatientDialog, useGetPatient, useGetPatientMaster } from 'api/patient';

// types
import { PatientList } from 'types/patient';

// ==============================|| PATIENT ADD / EDIT ||============================== //

export default function AddPatient() {
  const { patientMasterLoading, patientMaster } = useGetPatientMaster();
  const { patientsLoading: loading, patients } = useGetPatient();
  const isModal = patientMaster?.modal;

  const [list, setList] = useState<PatientList | null>(null);

  useEffect(() => {
    if (patientMaster?.modal && typeof patientMaster.modal === 'number') {
      const newList = patients.filter((info) => info.id === isModal && info)[0];
      setList(newList);
    } else {
      setList(null);
    }
    // eslint-disable-next-line
  }, [patientMaster]);

  const closeModal = () => handlerPatientDialog(false);

  // eslint-disable-next-line
  const patientForm = useMemo(
    () => !loading && !patientMasterLoading && <FormPatientAdd patient={list} closeModal={closeModal} />,
    [list, loading, patientMasterLoading]
  );

  return (
    <>
      {isModal && (
        <Modal
          open={true}
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
            <SimpleBar
              sx={{
                maxHeight: `calc(100vh - 48px)`,
                '& .simplebar-content': {
                  display: 'flex',
                  flexDirection: 'column'
                }
              }}
            >
              {loading && patientMasterLoading ? (
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
