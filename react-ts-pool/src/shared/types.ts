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
  parent_id: string
  firstName: string;
  lastName: string;
  birthday: string | Date;
  age?: number  
}

export interface IStudentView {
  firstName: string;
  lastName: string;
  birthday: string | Date;
  age?: number | undefined
}

