import clsx from "clsx";
import { Button } from "./Button";
import { ReactNode } from "react";
import LinkButton from "./LinkButton";

interface Ihead {
  label: string;
  field: string;
  sort: number;
}

export function Table<T extends { id: string }>({
  typeClass,
  disabled,
  head,
  body,
  editById,
  handlerDeleteById,
}: {
  typeClass: string;
  disabled?: boolean;
  head?: Ihead[];
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

  const fieldsHead = head?.sort((a, b) => a.sort - b.sort);
  let headRender = null;
  if (head) {
    headRender = fieldsHead!.map((item) => (
      <th key={item.field} scope="col" className="px-4 py-3 bg-gray-50">
        {item.label}
      </th>
    ));
    headRender.push(<th key="key"></th>);
  }

  // const fieldsT = Object.keys(body[0]) as Array<keyof T>;
  console.log(body);
  let bodyRender = null;
  if (body) {
    bodyRender = body.map((row) => (
      <tr key={row.id} className="bg-white border-b hover:bg-gray-50  ">
        {fieldsHead!.map((fieldname) => (
          <td className="px-4 py-2 " key={String(fieldname.field)}>
            {row[fieldname.field as keyof T] as ReactNode}
          </td>
        ))}
        {(editById || handlerDeleteById) && (
          <td
            className="px-2 py-1 flex flex-wrap flex-row gap-1 justify-center items-center  "
            key={" "}
          >
            {editById && (
              <LinkButton to={`${editById}${row.id}`} typeClass="main">
                Изменить
              </LinkButton>
            )}
            {handlerDeleteById && (
              <Button
                typeClass="delete"
                onClick={() => handlerDeleteById(row.id!)}
                value="Удалить"
              />
            )}
          </td>
        )}
      </tr>
    ));
  }
  return (
    <div className="mt-3 relative overflow-x-auto shadow-md sm:rounded-md box-border ">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
          <tr>{headRender}</tr>
        </thead>
        <tbody className={clsx(selectClass[typeClass], disabledStyle)}>
          {bodyRender as ReactNode}
        </tbody>
      </table>
    </div>
  );
}
