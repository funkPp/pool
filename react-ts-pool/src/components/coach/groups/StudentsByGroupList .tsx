import { useGetStudentByGroup } from "../../parent/students/api";
export function StudentsByGroupList({ id }: { id: string }) {
  const { data: students, error, isLoading } = useGetStudentByGroup(id);
  return <>asdasdasdasd asdfasfasd-{id}</>;
}
