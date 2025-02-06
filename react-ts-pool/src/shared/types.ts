export interface IUser {
  id: string;
  firstName: string;
  lastName: string;
  userName: string;
  role: string;
  // isDeleting?: boolean;
}

export interface IStudent {
  id: string;
  parent_id?: string;
  firstName: string;
  lastName: string;
  birthday: string;
  age?: number;
  gender: string;
  genderView?: string;
}

// export interface IStudentView {
//   firstName: string;
//   lastName: string;
//   birthday: string | Date;
//   age: number | undefined;
//   gender: string;
//   genderView: string;
// }
