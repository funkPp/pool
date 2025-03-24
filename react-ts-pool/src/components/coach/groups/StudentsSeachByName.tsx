import moment from "moment";
import { IStudent, IGroup } from "../../../shared/types";
import { useGetStudentByName, useMutationAddStudentId } from "./api";
import { Table } from "../../ui-kit";
import { FaPlus } from "react-icons/fa";
import { useCallback } from "react";

export function StudentsByNameList({
  name,
  groupId,
}: {
  name: string;
  groupId: string;
}) {
  const { data: students, error, isLoading } = useGetStudentByName(name);

  const headTable = [
    // { label: "id", field: "id", sort: 0 },
    { label: "Имя", field: "firstname", sort: 1 },
    { label: "Фамилия", field: "lastname", sort: 2 },
    { label: "Возраст", field: "age", sort: 3 },
    { label: "Пол", field: "genderView", sort: 4 },
  ];

  let studentsView: IStudent[] | undefined = undefined;

  if (students) {
    studentsView = students.map((student: IStudent): IStudent => {
      // console.log(student.birthday);
      student.age = moment().diff(moment(new Date(student.birthday)), "year");
      student.genderView = student.gender === "male" ? "муж" : "жен";
      student.birthday = student.birthday.substring(0, 10);
      const { parent_id, ...rest } = student;
      return rest;
    });
  }

  const mutationAdd = useMutationAddStudentId(groupId);

  const handlerAdd = useCallback((id: string) => {
    mutationAdd.mutate(id);
  }, []);

  return (
    <div key={name}>
      <Table
        typeClass="students"
        body={studentsView}
        head={headTable}
        handlerButton={handlerAdd}
        valueButton={<FaPlus />}
        typeButton="minus"
      />
    </div>
  );
}
