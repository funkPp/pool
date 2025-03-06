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

export interface IGroup {
  id: string;
  resourcesId?: string;
  name: string;
}

type stringOrDate = string | Date;

export interface IEvent {
  id: number;
  title: string;
  start: stringOrDate;
  end: stringOrDate;
  resourceId?: string | number | undefined;
  isDraggable?: boolean;
  allDay?: boolean;
  group_id?: string | number;
}

export interface IResources {
  id: number;
  title: string;
}


// export interface IStudentView {
//   firstName: string;
//   lastName: string;
//   birthday: string | Date;
//   age: number | undefined;
//   gender: string;
//   genderView: string;
// }
