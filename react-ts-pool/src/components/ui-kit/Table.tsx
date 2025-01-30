import clsx from "clsx";
import { Link } from "react-router-dom";
import { Button } from "./Button";
import { ReactNode } from "react";
import { IUser } from "../../shared";
import LinkButton from "./LinkButton";

export function Table<T extends IUser>({
  typeClass,
  disabled,
  onDelete,
  head,
  body,
  editById,
  handlerDeleteById,
}: {
  typeClass: string;
  disabled?: boolean;
  onDelete?: () => void;
  head?: string[];
  body?: T[];
  editById?: string;
  handlerDeleteById?: (id: string) => void;
}) {
  const selectClass: { [index: string]: string } = {
    users: `text-cyan-900`,
  };
  const disabledStyle = disabled ? "cursor-wait" : "";

  if (!body || body.length === 0) {
    return <div>No data available</div>;
  }

  let headRender = null;
  if (head) {
    headRender = head.map((item) => (
      <th key={item} scope="col" className="px-4 py-3 bg-gray-50">
        {item}
      </th>
    ));
  }

  const fieldsT = Object.keys(body[0]) as Array<keyof T>;

  let bodyRender = null;
  if (body) {
    bodyRender = body.map((row) => (
      <tr key={row.id} className="bg-white border-b hover:bg-gray-50  ">
        {fieldsT.map((field) => (
          <td className="px-4 py-2 " key={String(field)}>
            {String(row[field])}
          </td>
        ))}
        {(editById || handlerDeleteById) && (
          <td className="px-2 py-1 flex flex-wrap flex-row gap-1  justify-center items-center ">
            {editById && (
              <LinkButton to={`${editById}${row.id}`} typeClass="flexRight">
                Изменить
              </LinkButton>
            )}
            {handlerDeleteById && (
              <Button
                typeClass="delete"
                onClick={() => handlerDeleteById(row.id)}
                value="Удалить"
              />
            )}
          </td>
        )}
      </tr>
    ));
  }
  return (
    <div className="mt-3 relative overflow-x-auto shadow-md sm:rounded-lg box-border ">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
          <tr>
            {headRender}
            {/* <th scope="col" className="px-4 py-3">
              <span className="sr-only">Edit</span>
            </th> */}
          </tr>
        </thead>
        <tbody className={clsx(selectClass[typeClass], disabledStyle)}>
          {bodyRender as ReactNode}
        </tbody>
      </table>
    </div>
  );
}
