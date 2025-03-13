import moment from "moment";
import { IStudent, IGroup } from "../../../shared/types";
import { useGetStudentByGroup } from "../../parent/students/api";
import { Table } from "../../ui-kit";
import { useGetGroupById, useGroupMutationEdit } from "./api";
import { number, object } from "yup";
import { StudentsByGroupList } from "./StudentsByGroupList ";
import { useMutation } from "@tanstack/react-query";
import { useEffect, useState } from "react";

export function GroupEditAdd({ id }: { id: string }) {
  const { data: groupById } = useGetGroupById(id);
  const [nameGroup, setNameGroup] = useState("");

  console.log({ groupById });

  useEffect(() => {
    if (typeof groupById === "object" && "name" in groupById) {
      setNameGroup(groupById.name);
    }
  }, [id]);

  const handleChange = trottle<undefined>(
    (e: React.SyntheticEvent<HTMLInputElement>) =>
      setNameGroup(e.currentTarget.value),
    500,
  );

  const mutateGroup = useGroupMutationEdit(id);
  return (
    <div>
      <div className="text-center m-2">Редактирование группы</div>
      <label className="m-1">
        Наименование:
        <input
          className="text-black m-1 p-1 border  focus:ring-3 focus:ring-gray-300 "
          type="text"
          value={nameGroup}
          // onChange={(e) => setNameGroup(e.target.value)}
          onChange={handleChange}
        />
        <button
          className="border rounded-sm p-1"
          onClick={(e) => mutateGroup.mutate({ name: nameGroup })}
        >
          Ok
        </button>{" "}
      </label>
      <StudentsByGroupList id={id} />
    </div>
  );
}

function trottle<R, A extends any[]>(
  fn: (...args: A) => R,
  delay: number,
): (...args: A) => R | undefined {
  let timer: undefined | NodeJS.Timeout = undefined;
  return (...args: A) => {
    if (timer) return undefined;
    timer = setTimeout(() => {
      return fn(...args);
      timer = undefined;
    }, delay);
  };
}
