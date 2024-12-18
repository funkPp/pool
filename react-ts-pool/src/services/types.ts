export interface IUser {
  id: number;
  firstName: string;
  lastName: string;
  userName: string;
  role: string;
  isDeleting?: boolean;
}
