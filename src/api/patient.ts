import useSWR, { mutate } from 'swr';
import { useMemo } from 'react';

// utils
import axios, { fetcher } from 'utils/axios';

// types
import { PatientList, PatientProps } from 'types/patient';

const initialState: PatientProps = {
  modal: false
};

export const endpoints = {
  key: 'api/patient',
  list: '/list', // server URL
  modal: '/modal', // server URL
  insert: '/insert', // server URL
  update: '/update', // server URL
  delete: '/delete' // server URL
};

export function useGetPatient() {
  const { data, isLoading, error, isValidating } = useSWR(endpoints.key + endpoints.list, fetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false
  });
  const memoizedValue = useMemo(
    () => ({
      patients: data?.patients as PatientList[],
      patientsLoading: isLoading,
      patientsError: error,
      patientsValidating: isValidating,
      patientsEmpty: !isLoading && !data?.patients?.length
    }),
    [data, error, isLoading, isValidating]
  );

  return memoizedValue;
}

export async function insertPatient(newPatient: PatientList) {
  // to update local state based on key
  // mutate(
  //   endpoints.key + endpoints.list,
  //   (currentPatient: any) => {
  //     newPatient.id = currentPatient.patients.length + 1;
  //     const addedPatient: PatientList[] = [...currentPatient.patients, newPatient];

  //     return {
  //       ...currentPatient,
  //       patients: addedPatient
  //     };
  //   },
  //   false
  // );

  // to hit server you may need to refetch latest data after server hit and based on your logic
  const insertedPatient = await axios.post(endpoints.key + endpoints.insert, { patient: newPatient });

  // const URL = [endpoints.key + endpoints.insert, { patient: newPatient }];

  // const { data, isLoading, error, isValidating } = useSWR(URL, fetcherPost, {
  //   revalidateIfStale: false,
  //   revalidateOnFocus: false,
  //   revalidateOnReconnect: false
  // });

  // const memoizedValue = useMemo(
  //   () => ({
  //     patients: data?.patients as PatientList[],
  //     patientsLoading: isLoading,
  //     patientsError: error,
  //     patientsValidating: isValidating,
  //     patientsEmpty: !isLoading && !data?.patients?.length
  //   }),
  //   [data, error, isLoading, isValidating]
  // );
  // return memoizedValue;
}

export async function updatePatient(patientId: number, updatedPatient: PatientList) {
  // to update local state based on key
  mutate(
    endpoints.key + endpoints.list,
    (currentPatient: any) => {
      const newPatients: PatientList[] = currentPatient.patients.map((patient: PatientList) =>
        patient.id === patientId ? { ...patient, ...updatedPatient } : patient
      );

      return {
        ...currentPatient,
        patients: newPatients
      };
    },
    false
  );

  // to hit server
  // you may need to refetch latest data after server hit and based on your logic
  //   const data = { list: updatedPatient };
  //   await axios.post(endpoints.key + endpoints.update, data);
}

export async function deletePatient(patientId: number) {
  // to update local state based on key
  mutate(
    endpoints.key + endpoints.list,
    (currentPatient: any) => {
      const nonDeletedPatient = currentPatient.patients.filter((patient: PatientList) => patient.id !== patientId);

      return {
        ...currentPatient,
        patients: nonDeletedPatient
      };
    },
    false
  );

  // to hit server
  // you may need to refetch latest data after server hit and based on your logic
  //   const data = { patientId };
  //   await axios.post(endpoints.key + endpoints.delete, data);
}

export function useGetPatientMaster() {
  const { data, isLoading } = useSWR(endpoints.key + endpoints.modal, () => initialState, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false
  });

  const memoizedValue = useMemo(
    () => ({
      patientMaster: data,
      patientMasterLoading: isLoading
    }),
    [data, isLoading]
  );

  return memoizedValue;
}

export function handlerPatientDialog(modal: boolean) {
  // to update local state based on key

  mutate(
    endpoints.key + endpoints.modal,
    (currentPatientMaster: any) => {
      return { ...currentPatientMaster, modal };
    },
    false
  );
}
