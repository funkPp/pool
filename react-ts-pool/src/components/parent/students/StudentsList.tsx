import { Table } from "../../ui-kit/Table";
import { useGetStudentByParent, useStudentMurationDelete } from "./api";
import LinkButton from "../../ui-kit/LinkButton";
import { Loader } from "../../ui-kit/Loader";
import { useAppSelector } from "../../../shared/store";
import { IStudent } from "../../../shared";
import moment from "moment";

export function StudentsList() {
  const parent = useAppSelector((x) => x.auth.value.id);

  const headTable = [
    { label: "id", field: "id", sort: 0 },
    { label: "Имя", field: "firstName", sort: 1 },
    { label: "Фамилия", field: "lastName", sort: 2 },
    { label: "Возраст", field: "age", sort: 3 },
    { label: "Пол", field: "genderView", sort: 4 },
  ];

  const { data: students, error, isLoading } = useGetStudentByParent(parent);
  const mutationDelete = useStudentMurationDelete();
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

  // console.log({ error });

  const handlerDeleteStudent = (id: string) => {
    mutationDelete.mutate(id);
  };
  return (
    <div className="p-2 m-2">
      <div>
        {(isLoading || mutationDelete.isPending) && <Loader />}
        <h1 className="p-1 font-semibold text-cyan-600 text-center">
          Список детей
        </h1>
        {!error ? (
          <div className="flex flex-col justify-start">
            <LinkButton
              to="/parent/students/add"
              typeClass="flexRight"
              disabled={isLoading}
            >
              Добавить ребёнка
            </LinkButton>
            <Table<IStudent>
              typeClass="students"
              head={headTable}
              body={studentsView}
              editById="/parent/students/edit/"
              //handlerDeleteById={handlerDeleteStudent}
            />
          </div>
        ) : (
          <div>Ошибка загрузки списка детей</div>
        )}
      </div>
    </div>
  );
}
