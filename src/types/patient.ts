// project-import
import { Gender } from 'config';

// ==============================|| TYPES - PATIENT  ||============================== //

export interface PatientProps {
  modal: boolean;
}

export interface PatientList {
  firstName: string;
  lastName: string;
  id?: number;
  avatar: number;
  // name: string;
  // fatherName: string;
  email: string;
  age: number;
  gender: Gender;
  role: string;
  // orders: number;
  // progress: number;
  status: number;
  // orderStatus: string;
  // contact: string;
  // country: string;
  // location: string;
  // about: string;
  // skills: string[];
  // time: string[];
  // date?: Date | string | number;
}
