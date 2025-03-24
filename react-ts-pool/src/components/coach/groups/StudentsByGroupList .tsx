import moment from "moment";
import { IStudent, IGroup } from "../../../shared/types";
import { useGetStudentByGroup, useMutationRemoveByStudentId } from "./api";
import { Table } from "../../ui-kit";
import { useCallback } from "react";
import { FaMinus } from "react-icons/fa";
import { useMutation } from "@tanstack/react-query";

export function StudentsByGroupList({ id }: { id: string }) {
  const { data: students, error, isLoading } = useGetStudentByGroup(id);

  const headTable = [
    // { label: "id", field: "id", sort: 0 },
    { label: "Имя", field: "firstname", sort: 1 },
    { label: "Фамилия", field: "lastname", sort: 2 },
    { label: "Возраст", field: "age", sort: 3 },
    { label: "Пол", field: "genderView", sort: 4 },
  ];

  let studentsView: IStudent[] | undefined = undefined;

  if (Array.isArray(students)) {
    studentsView = students.map((student: IStudent): IStudent => {
      // console.log(student.birthday);
      student.age = moment().diff(moment(new Date(student.birthday)), "year");
      student.genderView = student.gender === "male" ? "муж" : "жен";
      student.birthday = student.birthday.substring(0, 10);
      const { parent_id, ...rest } = student;
      return rest;
    });
  }

  const mutation = useMutationRemoveByStudentId(id);

  const handlerRemove = useCallback((studentId: string) => {
    mutation.mutate(studentId);
  }, []);

  return (
    <div key={id}>
      <Table
        typeClass="students"
        body={studentsView}
        head={headTable}
        handlerButton={handlerRemove}
        valueButton={<FaMinus />}
        typeButton="minus"
      />
    </div>
  );
}
