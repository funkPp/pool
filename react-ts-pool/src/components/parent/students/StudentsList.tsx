import { Table } from "../../ui-kit/Table";
import { useGetStudentByParent, useStudentMurationDelete } from "./api";
import LinkButton from "../../ui-kit/LinkButton";
import { Loader } from "../../ui-kit/Loader";
import { useAppSelector } from "../../../shared/store";

export function StudentsList() {
  const parent = useAppSelector((x) => x.auth.value.id);

  const head = ["id", "Имя", "Фамилия", "Дата рождения", "Действия:"];
  const { data: students, error, isLoading } = useGetStudentByParent(parent);

  console.log({ parent }, students);

  const mutationDelete = useStudentMurationDelete();
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
            <Table
              typeClass="students"
              head={head}
              body={students}
              editById="/parent/students/edit/"
              handlerDeleteById={handlerDeleteStudent}
            />
          </div>
        ) : (
          <div>Ошибка загрузки списка детей</div>
        )}
      </div>
    </div>
  );
}
