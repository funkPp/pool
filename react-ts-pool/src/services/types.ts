export interface IUser {
  id: string | number;
  firstName: string;
  lastName: string;
  userName: string;
  role: string;
  isDeleting?: boolean;
}
