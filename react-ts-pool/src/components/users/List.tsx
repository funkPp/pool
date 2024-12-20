import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { userActions, useAppSelector, useAppDispatch } from "../../store";
import { Button } from "../ui-kit/Button";
import { Table } from "../ui-kit/Table";
import { useGetUsers } from "./api";
import LinkButton from "../ui-kit/LinkButton";

export function List() {
  // const users = useAppSelector((x) => x.users.list);
  // const dispatch = useAppDispatch();

  // useEffect(() => {
  //     dispatch(userActions.getAll());
  // }, []);

  const head = ["id", "Имя", "Фамилия", "login", "роль"];
  const { data: users, error, isLoading } = useGetUsers();
  // console.log({ error });
  return (
    <div>
      <h1 className="p-2 m-2 font-semibold text-cyan-600 text-center">
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
          />
        </div>
      ) : (
        <div>Ошибка загрузки пользователей</div>
      )}
    </div>
  );
}
