import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { userActions, useAppSelector, useAppDispatch } from "../../store";
import { Button } from "../ui-kit/Button";
import { Table } from "../ui-kit/Table";

export { List };

function List() {
  const users = useAppSelector((x) => x.users.list);
  const dispatch = useAppDispatch();

  // useEffect(() => {
  //     dispatch(userActions.getAll());
  // }, []);
  const head = ["id", "firstName", "lastName", "login", "role"];
  const users1 = [
    {
      id: 1,
      firstName: "Роман",
      lastName: "Каримов",
      userName: "krr",
      role: "Admin",
    },
    {
      id: 2,
      firstName: "Roman222",
      lastName: "Каримов222",
      userName: "krr222",
      role: "ouner",
    },
  ];
  return (
    <div>
      <h1>Users</h1>
      <Link to="/user/add" className="">
        Add User
      </Link>

      <Table typeClass="users" head={head} body={users1} />
    </div>
  );
}
