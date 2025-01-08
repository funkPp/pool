import { Table } from "../../ui-kit/Table";
import { useGetUsers, useUserMurationDelete } from "./api";
import LinkButton from "../../ui-kit/LinkButton";
import { Loader } from "../../ui-kit/Loader";
import { useMutation } from "@tanstack/react-query";

export function List() {
  const head = ["id", "Имя", "Фамилия", "login", "Роль", "Действия:"];
  const { data: users, error, isLoading, isStale } = useGetUsers();

  const mutationDelete = useUserMurationDelete();
  const handlerDeleteUser = (id: string) => {
    mutationDelete.mutate(id);
  };

  return (
    <div>
      {(isLoading || mutationDelete.isPending) && <Loader />}
      <h1 className="p-1 font-semibold text-cyan-600 text-center">
        Пользователи
      </h1>
      {!error ? (
        <div className="flex flex-col justify-start">
          <LinkButton
            to="/admin/users/add"
            typeClass="flexRight"
            disabled={isLoading}
          >
            Добавить пользователя
          </LinkButton>
          <Table
            typeClass="users"
            head={head}
            body={users}
            editById="/admin/users/edit/"
            handlerDeleteById={handlerDeleteUser}
          />
        </div>
      ) : (
        <div>Ошибка загрузки пользователей</div>
      )}
    </div>
  );
}
