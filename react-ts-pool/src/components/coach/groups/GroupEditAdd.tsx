import moment from "moment";
import { IStudent, IGroup } from "../../../shared/types";
// import { useGetStudentByGroup } from "../../parent/students/api";
import { Table } from "../../ui-kit";
import {
  useGetGroupById,
  useGroupMutationEdit,
  useGetStudentByGroup,
} from "./api";
import { number, object } from "yup";
import { StudentsByGroupList } from "./StudentsByGroupList ";
import { useMutation } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";
import { StudentsByNameList } from "./StudentsSeachByName";

export function GroupEditAdd({ id }: { id: string }) {
  const { data: groupById } = useGetGroupById(id);
  const [nameGroup, setNameGroup] = useState("");
  const [searchStudent, setSearchStudent] = useState("");
  const [searchStudentDebounce, setSearchStudentDebounce] = useState("");

  // console.log({ groupById });
  const timerDebounceRef = useRef<undefined | NodeJS.Timeout>();
  const searchStudentRef = useRef<string>();

  useEffect(() => {
    if (typeof groupById === "object" && "name" in groupById) {
      setNameGroup(groupById.name);
    }
  }, [id]);

  const handleDebounceSearch = (e: React.SyntheticEvent<HTMLInputElement>) => {
    if (e.target instanceof HTMLInputElement) {
      console.log("e.t.v:", e.target.value);
      setSearchStudent(e.target.value);

      if (timerDebounceRef.current) {
        clearTimeout(timerDebounceRef.current);
      }
      timerDebounceRef.current = setTimeout(() => {
        if (e.target instanceof HTMLInputElement) {
          searchStudentRef.current = e.target.value;
          setSearchStudentDebounce(e.target.value);
        }
      }, 500);
    }
  };

  const handleChange = (e: React.SyntheticEvent<HTMLInputElement>) => {
    if (e.target instanceof HTMLInputElement) {
      console.log(e.target);
      setNameGroup(e.target.value);
    }
  };

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
          onChange={(e) => setNameGroup(e.target.value)}
        />
        <button
          className="border rounded-sm p-1"
          onClick={(e) => mutateGroup.mutate({ name: nameGroup })}
        >
          Ok
        </button>{" "}
      </label>
      <StudentsByGroupList id={id} />
      <label className="m-1 py-3 ">
        Поиск:
        <input
          className="text-black m-1 p-1 border  focus:ring-3 focus:ring-gray-300 w-full"
          type="text"
          value={searchStudent}
          onChange={handleDebounceSearch}
        />
      </label>
      <StudentsByNameList
        name={searchStudentRef.current as string}
        groupId={id}
      />
    </div>
  );
}

// function trottle<R, A extends any[]>(
//   fn: (...args: A) => R,
//   delay: number,
// ): (...args: A) => R | undefined {
//   let timer: undefined | NodeJS.Timeout = undefined;
//   return (...args: A) => {
//     if (timer) return undefined;
//     timer = setTimeout(() => {
//       timer = undefined;
//       console.log(...args);
//       return fn(...args);
//     }, delay);
//   };
// }
