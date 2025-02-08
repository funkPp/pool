import { IGroup } from "../../../shared";
import { Button } from "../../ui-kit";
import { useGetGroups } from "./api";

export function GroupList() {
  const { data: groups, error, isLoading } = useGetGroups();

  let groupsRender = null;
  if (groups) {
    groupsRender = groups.map((group: IGroup) => {
      return (
        <li key={group.id} className="mx-2">
          <Button typeClass="group" value={group.name} />
        </li>
      );
    });
  }
  return (
    <div className="">
      <h1 className="p-1 font-semibold text-cyan-600 text-center">Группы</h1>
      <div>
        <ul>{groupsRender}</ul>
      </div>
    </div>
  );
}
