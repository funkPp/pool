import { useAppSelector } from "../../shared/store";
import { LinkButton } from "../ui-kit";

export function Home() {
  const auth = useAppSelector((x) => x.auth.value);
  return (
    <div className="p-2 m-2">
      <h3 className="text-cyan-900 p-2 m-2">
        Добрый день, {auth?.firstName + " " + auth?.lastName + "!"}
      </h3>

      {/* <LinkButton typeClass="main" to="/admin/users">
        Управление пользователями
      </LinkButton> */}
    </div>
  );
}
