import { FaPlus, FaWindowClose } from "react-icons/fa";
import { FaXmark } from "react-icons/fa6";

import { IGroup } from "../../../shared";
import { Button, Card, LinkButton } from "../../ui-kit";
import {
  useGetGroups,
  useGroupMutationDelete,
  useGroupMutationСreate,
} from "./api";
import { useState } from "react";
import { StudentsByGroupList } from "./StudentsByGroupList ";
import clsx from "clsx";

export function GroupList({
  handleDragStart,
}: {
  handleDragStart: React.DragEventHandler<HTMLLIElement>;
}) {
  const { data: groups, error, isLoading } = useGetGroups();
  const [nameNewGroup, setNameNewGroup] = useState("");

  const [hidden, setHidden] = useState("hidden");
  // const [currentGroup, setCurrentGroup] = useState<string | undefined>(undefined,  );
  // console.log(currentGroup);
  const mutateCreate = useGroupMutationСreate();
  const mutateDelete = useGroupMutationDelete();

  const deleteGroup = (id: string) => {
    mutateDelete.mutate(id);
  };

  let groupsRender = null;

  if (groups) {
    groupsRender = groups.map((group: IGroup) => {
      return (
        <li
          key={group.id}
          className="mx-2"
          draggable="true"
          onDragStart={handleDragStart}
          data-group-id={group.id}
          // onClick={(v) => setCurrentGroup(v.currentTarget?.dataset?.groupId)}
          onKeyDown={(e) => {
            if (e.code === "Delete") deleteGroup(group.id);
          }}
          onDoubleClick={() => setHidden("")}
        >
          <Button typeClass="group" value={group.name} />
        </li>
      );
    });
  }
  return (
    <div className="">
      <h1 className="p-1 font-semibold text-cyan-600 text-center">Группы</h1>
      <div className="flex flex-row justify-start mx-3 my-1 text-cyan-600">
        <input
          type="text"
          value={nameNewGroup}
          className="px-1 bg-gray-50 border border-gray-300 text-sm rounded-lg 
  hover:border-cyan-600 focus:outline-cyan-700 block w-full p-2"
          onChange={(value) => setNameNewGroup(value.target.value)}
        />
        <Button
          typeClass="group"
          disabled={isLoading}
          value={<FaPlus />}
          onClick={() => {
            if (nameNewGroup) mutateCreate.mutate({ name: nameNewGroup });
          }}
        />
      </div>
      <div>
        <ul>{groupsRender}</ul>
      </div>
      <div
        className={clsx(
          "bg-slate-300 fixed top-0 left-0 w-full h-full bg-opacity-50 z-40 ",
          hidden,
        )}
      >
        <div className="fixed top-12 left-1/4 z-50">
          <Card typeClass="main">
            <div className="flex flex-col">
              <Button
                typeClass="close"
                value={<FaXmark />}
                onClick={() => setHidden("hidden")}
              />
              <StudentsByGroupList id="" />
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
